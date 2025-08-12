import { NextRequest, NextResponse } from 'next/server';
import { updateBlofinInvestment, getLeadByPhone, Lead } from '@/lib/firebase/db';

/**
 * N8N Webhook endpoint for updating lead status
 * Expected payload: { phone: string, action: string, amount?: number, currency?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, action, amount, currency = 'USD' } = body;

    // Validate required fields
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    console.log(`N8N webhook received: phone=${phone}, action=${action}`);

    // Find lead by phone number
    const lead = await getLeadByPhone(phone);
    
    if (!lead || !lead.id) {
      return NextResponse.json(
        { 
          error: 'Lead not found', 
          phone: phone,
          message: `No lead found with phone number: ${phone}` 
        },
        { status: 404 }
      );
    }

    // Handle different actions
    switch (action) {
      case 'blofin_investment_completed':
        if (!amount || amount <= 0) {
          return NextResponse.json(
            { error: 'Valid investment amount is required for this action' },
            { status: 400 }
          );
        }

        await updateBlofinInvestment(
          lead.id,
          {
            amount: amount,
            currency: currency as 'USD' | 'PEN',
            completed: true
          },
          'n8n_webhook' // performedBy
        );

        return NextResponse.json({
          success: true,
          message: 'Blofin investment status updated successfully',
          leadId: lead.id,
          leadName: lead.name,
          phone: phone,
          action: action,
          amount: amount,
          currency: currency
        });

      case 'blofin_proof_uploaded':
        // Just mark proof as uploaded, don't complete investment yet
        await updateBlofinInvestment(
          lead.id,
          {
            amount: amount || lead.blofinInvestmentAmount || 0,
            currency: (currency as 'USD' | 'PEN') || lead.blofinInvestmentCurrency || 'USD',
            completed: false // Don't mark as completed yet
          },
          'n8n_webhook'
        );

        return NextResponse.json({
          success: true,
          message: 'Blofin proof upload status updated',
          leadId: lead.id,
          leadName: lead.name,
          phone: phone,
          action: action
        });

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('N8N webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for webhook health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'N8N webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}