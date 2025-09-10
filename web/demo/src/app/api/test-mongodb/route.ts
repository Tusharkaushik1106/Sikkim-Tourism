import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'MongoDB integration temporarily disabled - using in-memory storage',
      note: 'Install mongoose package and configure MONGODB_URI to enable database storage',
      status: 'Using fallback storage'
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Test endpoint error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'MongoDB integration disabled - test data creation not available',
      note: 'Using in-memory storage for demo purposes'
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}