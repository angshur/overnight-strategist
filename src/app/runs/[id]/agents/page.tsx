import Link from "next/link";

type Agent = {
  name: string;
  category: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  runMode: "parallel" | "sequential";
};

const AGENTS: Agent[] = [
  // Growth + demand
  {
    name: "Intent & Demand Capture Agent",
    category: "Growth",
    purpose: "Capture high-intent demand (near me, emergency, implants) without waste.",
    inputs: ["Service lines", "Geo radius", "Competitor pressure", "Constraints"],
    outputs: ["Channel plan", "Targeting posture", "Budget guardrails"],
    runMode: "parallel",
  },
  {
    name: "Messaging & Positioning Agent",
    category: "Growth",
    purpose: "Generate 3 differentiated positioning angles + objection handling.",
    inputs: ["Services", "Reviews themes", "Insurance posture"],
    outputs: ["3 messaging angles", "Proof points", "Claims guardrails"],
    runMode: "parallel",
  },
  {
    name: "Landing Experience Agent",
    category: "Growth",
    purpose: "Design the conversion path from click → booking with minimal friction.",
    inputs: ["Offer", "Trust signals", "Scheduling constraints"],
    outputs: ["Landing outline", "CTA strategy", "Form/call routing recommendations"],
    runMode: "parallel",
  },
  {
    name: "Experiment Designer Agent",
    category: "Growth",
    purpose: "Create a 2-week experiment plan with hypotheses and success metrics.",
    inputs: ["Goal", "Constraints", "Channel mix"],
    outputs: ["3 experiments", "Impact/effort", "Stop conditions"],
    runMode: "parallel",
  },

  // Measurement + truth
  {
    name: "Measurement Integrity Agent",
    category: "Measurement",
    purpose: "Assess tracking gaps; define lead quality rubric and attribution rules.",
    inputs: ["Call tracking reality", "Forms", "CRM usage"],
    outputs: ["Tracking fixes", "Lead quality rubric", "Confidence level"],
    runMode: "parallel",
  },
  {
    name: "Anomalies & Baseline Agent",
    category: "Measurement",
    purpose: "Detect what changed vs baseline; separate signal from noise.",
    inputs: ["Historical performance", "Seasonality", "Ops constraints"],
    outputs: ["Anomalies list", "Likely causes", "Data requests"],
    runMode: "parallel",
  },
  {
    name: "Incrementality Options Agent",
    category: "Measurement",
    purpose: "Suggest feasible incrementality tests for local businesses.",
    inputs: ["Geo layout", "Budget limits", "Channel set"],
    outputs: ["Holdout options", "Geo split plan", "Minimum sample guidance"],
    runMode: "parallel",
  },

  // Operations + service delivery
  {
    name: "Front Desk Workflow Agent",
    category: "Operations",
    purpose: "Reduce missed calls and improve booking conversion without extra headcount.",
    inputs: ["Office hours", "Staffing", "After-hours volume"],
    outputs: ["Missed-call recovery SOP", "Scripts", "SLAs"],
    runMode: "parallel",
  },
  {
    name: "Capacity & Scheduling Agent",
    category: "Operations",
    purpose: "Align marketing with chair-time constraints and provider availability.",
    inputs: ["Capacity", "Service-line priorities", "No-show rates"],
    outputs: ["Service-line routing", "Scheduling rules", "Demand shaping ideas"],
    runMode: "parallel",
  },
  {
    name: "Patient Experience Agent",
    category: "Operations",
    purpose: "Identify friction points (wait time, intake) that destroy reviews and referrals.",
    inputs: ["Review themes", "Check-in process", "Wait-time constraints"],
    outputs: ["Experience fixes", "Service recovery loop", "Messaging alignment"],
    runMode: "parallel",
  },

  // Finance + unit economics
  {
    name: "Unit Economics Agent",
    category: "Finance",
    purpose: "Tie spend to margin and prioritize high-LTV services.",
    inputs: ["Service margins (approx)", "Conversion rates", "Capacity"],
    outputs: ["LTV prioritization", "Spend guardrails", "ROI assumptions"],
    runMode: "parallel",
  },
  {
    name: "Pricing & Insurance Agent",
    category: "Finance",
    purpose: "Navigate in/out-of-network messaging and minimize billing surprises.",
    inputs: ["Insurance posture", "Common objections", "Service pricing ranges"],
    outputs: ["Messaging constraints", "FAQ outline", "Front desk scripts guidance"],
    runMode: "parallel",
  },

  // Reputation + retention
  {
    name: "Reputation & Reviews Agent",
    category: "Reputation",
    purpose: "Increase review velocity and handle negatives without escalation.",
    inputs: ["Review history", "Platforms", "Service issues themes"],
    outputs: ["Review capture plan", "Response templates", "Recovery loop"],
    runMode: "parallel",
  },
  {
    name: "Retention & Re-activation Agent",
    category: "Retention",
    purpose: "Turn existing patient base into recurring revenue + referrals.",
    inputs: ["Recall cadence", "High-value cohorts", "Communication channels"],
    outputs: ["Recall plan", "Reactivation messaging", "Referral prompts"],
    runMode: "parallel",
  },

  // Synthesis
  {
    name: "Synthesis & Packaging Agent",
    category: "Synthesis",
    purpose: "Resolve conflicts, rank actions, and package the morning deliverables.",
    inputs: ["Outputs from all agents"],
    outputs: ["Executive brief", "Strategy", "Experiment plan", "Ops SOPs", "Confidence"],
    runMode: "sequential",
  },
];

const CATS = ["Growth", "Measurement", "Operations", "Finance", "Reputation", "Retention", "Synthesis"];

function Pill({ label }: { label: string }) {
  return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{label}</span>;
}

export default function AgentsPage({ params }: { params: { id: string } }) {
  const runId = params.id;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <header className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href={`/runs/${runId}`} className="text-sm text-gray-600 underline">
              ← Back to run
            </Link>
            <Link href={`/runs/${runId}/morning`} className="text-sm bg-black text-white rounded-xl px-3 py-2">
              View morning deliverables
            </Link>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">Agent Orchestration Map</h1>
          <p className="text-gray-600">
            Vision: a small-business operating system that runs overnight. Agents work in parallel with clean context,
            then synthesize into deliverables.
          </p>

          <div className="flex flex-wrap gap-2">
            <Pill label="Clean context per agent" />
            <Pill label="Parallel work" />
            <Pill label="Conflict resolution" />
            <Pill label="Packaged deliverables" />
            <Pill label="System owns structure + tools" />
          </div>
        </header>

        {/* Category nav */}
        <section className="bg-white border rounded-2xl shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <a key={c} href={`#${c}`} className="text-sm border bg-white rounded-xl px-3 py-2 hover:bg-gray-50">
                {c}
              </a>
            ))}
          </div>
        </section>

        {/* Agent lists */}
        {CATS.map((cat) => {
          const list = AGENTS.filter((a) => a.category === cat);
          if (!list.length) return null;

          return (
            <section key={cat} id={cat} className="space-y-3">
              <h2 className="text-xl font-semibold">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.map((a) => (
                  <div key={a.name} className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold">{a.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{a.purpose}</div>
                      </div>
                      <Pill label={a.runMode === "parallel" ? "Parallel" : "Sequential"} />
                    </div>

                    <details className="border rounded-xl p-3 bg-gray-50">
                      <summary className="cursor-pointer text-sm font-medium">Inputs & outputs</summary>
                      <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <div className="text-xs font-semibold text-gray-500">Inputs</div>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700">
                            {a.inputs.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500">Outputs</div>
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700">
                            {a.outputs.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold">How this impresses (without backend)</h2>
          <p className="text-sm text-gray-700 mt-2">
            You’re showing a product thesis: orchestration + clean context → predictable deliverables. This is the
            “agentic operating system” framing, not a chat UI.
          </p>
        </section>
      </div>
    </main>
  );
}

