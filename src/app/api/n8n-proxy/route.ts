import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('N8N Proxy: Received data:', body);
    
    // Forward to n8n webhook
    const response = await fetch('https://n8n-n8n.gbuazv.easypanel.host/webhook-test/3c838fa7-171c-472c-a4f9-842f3575cb8e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const result = await response.text();
    
    console.log('N8N Proxy: Response status:', response.status);
    console.log('N8N Proxy: Response body:', result);
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: result
    });
    
  } catch (error) {
    console.error('N8N proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to forward to n8n' },
      { status: 500 }
    );
  }
}