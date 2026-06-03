import * as React from 'react';
import { Terminal, ShieldCheck, Mail, Clock } from 'lucide-react';

interface HQStatusProps {
  status?: string;
  focus?: string;
  responseTime?: string;
}

export function HQStatus({
  status = 'available',
  focus = 'Building Digital Systems',
  responseTime = 'Usually within 24 hours',
}: HQStatusProps) {
  const isAvailable = status === 'available';

  return (
    <div className="rounded-lg border border-border/40 bg-secondary/30 p-4 font-mono text-xs text-muted-foreground glass-panel max-w-sm w-full">
      <div className="flex items-center justify-between mb-3 border-b border-border/20 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span>HQ SYSTEM STATUS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
          <span className="text-foreground font-semibold">
            {isAvailable ? 'ONLINE' : 'MAINTENANCE'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Availability: </span>
          <span className="text-foreground font-medium ml-auto">
            {isAvailable ? 'Open for selected projects' : 'Fully booked'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-primary" />
          <span>Focus: </span>
          <span className="text-foreground font-medium ml-auto">
            {focus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span>Response: </span>
          <span className="text-foreground font-medium ml-auto">
            {responseTime}
          </span>
        </div>
      </div>
    </div>
  );
}
