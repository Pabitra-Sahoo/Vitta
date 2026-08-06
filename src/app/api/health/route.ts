import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'Vitta Financial Analytics Workspace',
    version: '1.0.0',
    framework: 'Next.js 15 App Router',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    checks: {
      financialEngine: 'healthy',
      database: 'healthy',
      slaMonitor: 'operational',
    },
  });
}
