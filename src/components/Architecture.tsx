import { PageIntro } from "./PageIntro";

export function Architecture() {
  return (
    <div>
      <PageIntro index="/ 05" title="Architecture" eyebrow="Data flow">
        OT-safe ingest, cloud optimization, and audited policies feeding this dashboard —
        supplemental to racks you already own.
      </PageIntro>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-10 sm:p-12">
        <svg
          viewBox="0 0 820 420"
          className="mx-auto w-full max-w-4xl"
          role="img"
          aria-label="Vayu system architecture from sensors to operator UI"
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#71717a" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="40" y="40" width="160" height="100" rx="12" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
          <text x="120" y="76" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            Field sensors
          </text>
          <text x="120" y="96" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="Outfit, sans-serif">
            Temp · humidity · pressure
          </text>
          <text x="120" y="118" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
            BACnet / Modbus / SNMP
          </text>

          <rect x="40" y="200" width="160" height="100" rx="12" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
          <text x="120" y="236" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            BMS / EPMS
          </text>
          <text x="120" y="256" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="Outfit, sans-serif">
            CRAC setpoints · alarms
          </text>
          <text x="120" y="278" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
            Read-mostly integration
          </text>

          <rect x="280" y="110" width="200" height="120" rx="12" fill="rgba(20,184,166,0.08)" stroke="#2dd4bf" strokeWidth="1.5" filter="url(#glow)" />
          <text x="380" y="148" textAnchor="middle" fill="#5eead4" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            Vayu edge collector
          </text>
          <text x="380" y="170" textAnchor="middle" fill="#99f6e4" fontSize="11" fontFamily="Outfit, sans-serif">
            Secure ingest · buffering · QoS
          </text>
          <text x="380" y="192" textAnchor="middle" fill="#5eead4" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.85">
            OT-safe outbound only
          </text>

          <rect x="540" y="40" width="240" height="120" rx="12" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
          <text x="660" y="76" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            Optimization core
          </text>
          <text x="660" y="96" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="Outfit, sans-serif">
            Digital twin · MILP / RL policies
          </text>
          <text x="660" y="118" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
            Tariff + weather aware
          </text>

          <rect x="540" y="200" width="240" height="100" rx="12" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
          <text x="660" y="236" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            Policy &amp; audit API
          </text>
          <text x="660" y="258" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="Outfit, sans-serif">
            Approvals · versioning · logs
          </text>

          <rect x="540" y="330" width="240" height="70" rx="12" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <text x="660" y="362" textAnchor="middle" fill="#fafafa" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
            Operator UI (MVP)
          </text>
          <text x="660" y="382" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="Outfit, sans-serif">
            Web dashboard · exports
          </text>

          <line x1="200" y1="90" x2="268" y2="138" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <line x1="200" y1="250" x2="268" y2="198" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <line x1="480" y1="150" x2="528" y2="112" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <line x1="660" y1="160" x2="660" y2="188" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <line x1="660" y1="300" x2="660" y2="318" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <line x1="660" y1="250" x2="660" y2="286" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />

          <rect x="280" y="320" width="200" height="60" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="380" y="348" textAnchor="middle" fill="#e4e4e7" fontSize="12" fontFamily="Outfit, sans-serif" fontWeight="600">
            Write-back path (optional)
          </text>
          <text x="380" y="366" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="Outfit, sans-serif">
            Supervised setpoint commits
          </text>

          <line x1="380" y1="230" x2="380" y2="308" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#arrow)" />
          <path d="M380 320 L260 350 L200 350 L200 260" fill="none" stroke="#71717a" strokeWidth="1.25" markerEnd="url(#arrow)" />
        </svg>
      </div>
    </div>
  );
}
