import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for staff calls (in production, use a database)
const staffCalls: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, tableNumber } = body;

    // Validate input
    if (!customerName || !tableNumber) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Create staff call object
    const staffCall = {
      id: `CALL-${Date.now()}`,
      customerName,
      tableNumber,
      status: 'notified',
      createdAt: new Date().toISOString(),
    };

    // Store staff call in memory
    staffCalls.push(staffCall);

    // Log staff call (in production, this would trigger notification to staff)
    console.log('[Staff Called]', staffCall);

    // Simulate notifying staff (in production, send real notification)
    console.log(`📞 Staff notified for table ${tableNumber} (${customerName})`);

    return NextResponse.json(
      {
        success: true,
        callId: staffCall.id,
        message: 'Đã thông báo cho nhân viên',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Staff call error:', error);
    return NextResponse.json(
      { error: 'Failed to call staff' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve staff calls (for debugging/admin)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    totalCalls: staffCalls.length,
    calls: staffCalls.map((call) => ({
      id: call.id,
      customer: call.customerName,
      table: call.tableNumber,
      createdAt: call.createdAt,
    })),
  });
}
