// src/lib/firebase/db.ts - UPDATED for CriptoUniversity model
import { 
  collection, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  Timestamp,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Updated Lead interface for CriptoUniversity
export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: 'student_pending' | 'student_active' | 'student_inactive' | 'rejected';
  registrationDate?: string;
  source?: string;
  blofinAccountCreated?: boolean;
  blofinInvestmentCompleted?: boolean;
  blofinInvestmentAmount?: number;
  blofinInvestmentCurrency?: 'USD' | 'PEN';
  blofinProofUploaded?: boolean;
  blofinProofUrl?: string;
  accessGranted?: boolean;
  accessStartDate?: Timestamp;
  accessEndDate?: Timestamp;
  communityAccess?: {
    discord?: boolean;
    telegram?: boolean;
    whatsapp?: boolean;
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  notes?: string;
  assignedTo?: string;
  statusHistory?: StudentStatusHistory[];
}

export interface StudentStatusHistory {
  id: string;
  previousStatus: Lead['status'];
  newStatus: Lead['status'];
  details: string;
  performedBy: string;
  performedAt: Timestamp;
}

// Collection references
const LEADS_COLLECTION = 'students'; // Renamed from 'leads' to 'students'

/**
 * Add a new student registration to Firestore
 */
export const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
      ...leadData,
      status: leadData.status || 'student_pending',
      blofinAccountCreated: false,
      blofinInvestmentCompleted: false,
      blofinProofUploaded: false,
      accessGranted: false,
      communityAccess: {
        discord: false,
        telegram: false,
        whatsapp: false,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

/**
 * Update a student's status or data
 */
export const updateLead = async (leadId: string, data: Partial<Lead>, performedBy?: string): Promise<void> => {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, leadId);
    
    // If status is being updated, add to history
    if (data.status && performedBy) {
      const currentLead = await getDoc(leadRef);
      if (currentLead.exists()) {
        const currentData = currentLead.data() as Lead;
        const historyEntry: StudentStatusHistory = {
          id: `history_${Date.now()}`,
          previousStatus: currentData.status,
          newStatus: data.status,
          details: `Status updated from ${currentData.status} to ${data.status}`,
          performedBy,
          performedAt: Timestamp.fromDate(new Date())
        };
        
        data.statusHistory = [...(currentData.statusHistory || []), historyEntry];
      }
    }
    
    await updateDoc(leadRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

/**
 * Update Blofin investment status
 */
export const updateBlofinInvestment = async (
  studentId: string, 
  investmentData: {
    amount: number;
    currency: 'USD' | 'PEN';
    proofUrl?: string;
    completed: boolean;
  },
  performedBy: string
): Promise<void> => {
  try {
    const studentRef = doc(db, LEADS_COLLECTION, studentId);
    const currentStudent = await getDoc(studentRef);
    
    if (!currentStudent.exists()) {
      throw new Error('Student not found');
    }

    const currentData = currentStudent.data() as Lead;
    
    const historyEntry: StudentStatusHistory = {
      id: `history_${Date.now()}`,
      previousStatus: currentData.status,
      newStatus: investmentData.completed ? 'student_active' : currentData.status,
      details: `Blofin investment ${investmentData.completed ? 'completed' : 'updated'}: ${investmentData.amount} ${investmentData.currency}`,
      performedBy,
      performedAt: Timestamp.fromDate(new Date())
    };

    const updateData: Partial<Lead> = {
      blofinInvestmentCompleted: investmentData.completed,
      blofinInvestmentAmount: investmentData.amount,
      blofinInvestmentCurrency: investmentData.currency,
      blofinProofUploaded: !!investmentData.proofUrl,
      blofinProofUrl: investmentData.proofUrl,
      statusHistory: [...(currentData.statusHistory || []), historyEntry],
    };

    // If investment is completed and meets minimum requirements, grant access
    const minAmount = investmentData.currency === 'USD' ? 30 : 100;
    if (investmentData.completed && investmentData.amount >= minAmount) {
      updateData.status = 'student_active';
      updateData.accessGranted = true;
      updateData.accessStartDate = Timestamp.fromDate(new Date());
      // Grant access for 1 year
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      updateData.accessEndDate = Timestamp.fromDate(endDate);
    }
    
    await updateDoc(studentRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating Blofin investment:', error);
    throw error;
  }
};

/**
 * Grant community access
 */
export const updateCommunityAccess = async (
  studentId: string,
  communityType: 'discord' | 'telegram' | 'whatsapp',
  granted: boolean,
  performedBy: string
): Promise<void> => {
  try {
    const studentRef = doc(db, LEADS_COLLECTION, studentId);
    const currentStudent = await getDoc(studentRef);
    
    if (!currentStudent.exists()) {
      throw new Error('Student not found');
    }

    const currentData = currentStudent.data() as Lead;
    
    const historyEntry: StudentStatusHistory = {
      id: `history_${Date.now()}`,
      previousStatus: currentData.status,
      newStatus: currentData.status,
      details: `${communityType} access ${granted ? 'granted' : 'revoked'}`,
      performedBy,
      performedAt: Timestamp.fromDate(new Date())
    };

    await updateDoc(studentRef, {
      [`communityAccess.${communityType}`]: granted,
      statusHistory: [...(currentData.statusHistory || []), historyEntry],
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating community access:', error);
    throw error;
  }
};

/**
 * Get a single student by ID
 */
export const getLead = async (leadId: string): Promise<Lead | null> => {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, leadId);
    const leadSnap = await getDoc(leadRef);
    
    if (leadSnap.exists()) {
      return { id: leadSnap.id, ...leadSnap.data() } as Lead;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting student:', error);
    throw error;
  }
};

/**
 * Get all students, optionally filtered by status
 */
export const getLeads = async (status?: Lead['status']): Promise<Lead[]> => {
  try {
    let q = status
      ? query(
          collection(db, LEADS_COLLECTION), 
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        )
      : query(
          collection(db, LEADS_COLLECTION),
          orderBy('createdAt', 'desc')
        );
    
    const querySnapshot = await getDocs(q);
    const leads: Lead[] = [];
    
    querySnapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() } as Lead);
    });
    
    return leads;
  } catch (error) {
    console.error('Error getting students:', error);
    throw error;
  }
};

/**
 * Get active students (those who completed Blofin investment)
 */
export const getActiveStudents = async (): Promise<Lead[]> => {
  try {
    const q = query(
      collection(db, LEADS_COLLECTION),
      where('status', '==', 'student_active'),
      where('blofinInvestmentCompleted', '==', true),
      orderBy('accessStartDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const students: Lead[] = [];
    
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() } as Lead);
    });
    
    return students;
  } catch (error) {
    console.error('Error getting active students:', error);
    throw error;
  }
};

/**
 * Get pending students (those who registered but haven't completed investment)
 */
export const getPendingStudents = async (): Promise<Lead[]> => {
  try {
    const q = query(
      collection(db, LEADS_COLLECTION),
      where('status', '==', 'student_pending'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const students: Lead[] = [];
    
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() } as Lead);
    });
    
    return students;
  } catch (error) {
    console.error('Error getting pending students:', error);
    throw error;
  }
};

/**
 * Search students by name or email
 */
export const searchLeads = async (searchTerm: string): Promise<Lead[]> => {
  try {
    const allLeads = await getLeads();
    const searchTermLower = searchTerm.toLowerCase();
    
    return allLeads.filter(lead => 
      lead.name.toLowerCase().includes(searchTermLower) ||
      lead.email.toLowerCase().includes(searchTermLower) ||
      lead.country.toLowerCase().includes(searchTermLower)
    );
  } catch (error) {
    console.error('Error searching students:', error);
    throw error;
  }
};

/**
 * Find a student by phone number
 */
export const getLeadByPhone = async (phone: string): Promise<Lead | null> => {
  try {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Try exact match first
    let q = query(
      collection(db, LEADS_COLLECTION),
      where('phone', '==', phone)
    );
    
    let querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty && cleanPhone !== phone) {
      // Try with cleaned phone number if exact match fails
      q = query(
        collection(db, LEADS_COLLECTION),
        where('phone', '==', cleanPhone)
      );
      
      querySnapshot = await getDocs(q);
    }
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Lead;
  } catch (error) {
    console.error('Error finding student by phone:', error);
    throw error;
  }
};

/**
 * Get students by country
 */
export const getStudentsByCountry = async (country: string): Promise<Lead[]> => {
  try {
    const q = query(
      collection(db, LEADS_COLLECTION),
      where('country', '==', country),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const students: Lead[] = [];
    
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() } as Lead);
    });
    
    return students;
  } catch (error) {
    console.error('Error getting students by country:', error);
    throw error;
  }
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const allStudents = await getLeads();
    
    const stats = {
      total: allStudents.length,
      pending: allStudents.filter(s => s.status === 'student_pending').length,
      active: allStudents.filter(s => s.status === 'student_active').length,
      inactive: allStudents.filter(s => s.status === 'student_inactive').length,
      blofinAccountsCreated: allStudents.filter(s => s.blofinAccountCreated).length,
      investmentsCompleted: allStudents.filter(s => s.blofinInvestmentCompleted).length,
      totalInvestmentUSD: allStudents
        .filter(s => s.blofinInvestmentCompleted && s.blofinInvestmentCurrency === 'USD')
        .reduce((sum, s) => sum + (s.blofinInvestmentAmount || 0), 0),
      totalInvestmentPEN: allStudents
        .filter(s => s.blofinInvestmentCompleted && s.blofinInvestmentCurrency === 'PEN')
        .reduce((sum, s) => sum + (s.blofinInvestmentAmount || 0), 0),
      countriesRepresented: [...new Set(allStudents.map(s => s.country))].length,
      recentRegistrations: allStudents
        .filter(s => {
          if (!s.createdAt) return false;
          const dayAgo = new Date();
          dayAgo.setDate(dayAgo.getDate() - 1);
          return s.createdAt.toDate() > dayAgo;
        }).length
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// CMS functions remain the same
export interface ContentItem {
  id?: string;
  type: 'text' | 'image' | 'video';
  section: string;
  key: string;
  value: string;
  label: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const CONTENT_COLLECTION = 'content';

export const getAllContent = async (): Promise<ContentItem[]> => {
  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      orderBy('section'),
      orderBy('key')
    );
    
    const querySnapshot = await getDocs(q);
    const content: ContentItem[] = [];
    
    querySnapshot.forEach((doc) => {
      content.push({ id: doc.id, ...doc.data() } as ContentItem);
    });
    
    return content;
  } catch (error) {
    console.error('Error getting content:', error);
    throw error;
  }
};

export const getContentBySection = async (section: string): Promise<ContentItem[]> => {
  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where('section', '==', section),
      orderBy('key')
    );
    
    const querySnapshot = await getDocs(q);
    const content: ContentItem[] = [];
    
    querySnapshot.forEach((doc) => {
      content.push({ id: doc.id, ...doc.data() } as ContentItem);
    });
    
    return content;
  } catch (error) {
    console.error('Error getting section content:', error);
    throw error;
  }
};

export const updateContent = async (contentId: string, value: string): Promise<void> => {
  try {
    const contentRef = doc(db, CONTENT_COLLECTION, contentId);
    await updateDoc(contentRef, {
      value,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};