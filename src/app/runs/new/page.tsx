import Link from "next/link";
import { supabaseService } from "@/lib/supabase";

const ACME_PRESET = `Goal: Increase qualified new-patient leads for Acme Dental without lowering lead quality.

Context:
- Location: suburban, 8-mile radius
- Services: implants, Invisalign, emergency dentistry, family dentistry
- Current mix: Google Search + Maps + some Meta
- Lead sources: calls + forms, but call tracking is inconsistent

Constraints / complications:
- New competitors bidding aggressively on “emergency dentist near me”
- Hygiene schedule is near capacity (we need high-LTV cases, not low-value cleanings)
- Many calls are missed after-hours; staff is limited
- Reviews are good overall, but a few recent 1-star reviews mention wait times
- Insurance mix is complex; some plans are out-of-network
- Seasonal dip expected in March/April

Deliverables for tomorrow morning:
1) 1-page strategy (positioning + channel plan + targeting)
2) 2-week experiment plan (3 tests, expected impact, effort)
3) Messaging angles (3 variants) and landing page outline
4) Measurement plan (tracking fixes, lead quality rubric)
5) Risks, assumptions, and confidence level`;

export default async function NewRunPage() {
  const { data: clients, error } = await supabaseService
    .from("clients")
    .select("id,name,industry,preset_key")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <Link href="/" className="text-sm text-gray-600 underline">
            Home
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Create an Overnight Run</h1>
          <p className="text-gray-600">
            Define a goal and constraints tonight. Tomorrow morning you’ll get a structured brief and collateral.
          </p>
        </header>

        {/* Card */}
        <section className="bg-white border rounded-2xl shadow-sm p-6 md:p-8">
          <form className="space-y-6" action="/api/runs" method="post">
            {/* Client row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Client</label>
                <select
                  name="client_id"
                  className="w-full border rounded-xl p-3 bg-white"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a client…
                  </option>
                  {clients?.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                      {c.industry ? ` — ${c.industry}` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  V1 uses 3 preset clients. We’ll add “create client” later.
                </p>
              </div>

              {/* Quick presets */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1">Quick start</label>
                <button
                  type="button"
                  className="w-full border rounded-xl p-3 text-sm hover:bg-gray-50"
                  onClick={() => {
                    const el = document.getElementById("goal") as HTMLTextAreaElement | null;
                    if (el) el.value = ACME_PRESET;
                  }}
                >
                  Load “Acme Dental — More Leads” prompt
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Fills a strong goal + constraints + deliverables.
                </p>
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium mb-1">Goal + context</label>
              <textarea
                id="goal"
                name="goal"
                className="w-full border rounded-xl p-3 min-h-[180px]"
                placeholder='Example: "Grow qualified leads by 25% in 90 days without increasing budget. Focus on higher-LTV services."'
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: include deliverables for tomorrow morning (strategy, experiments, messaging, measurement).
              </p>
            </div>

            {/* Progressive disclosure: Advanced inputs */}
            <details className="border rounded-2xl p-4 bg-gray-50">
              <summary className="cursor-pointer text-sm font-medium text-gray-800">
                Advanced options (constraints + expert voice)
              </summary>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary KPI</label>
                  <input
                    name="kpi"
                    className="w-full border rounded-xl p-3 bg-white"
                    placeholder="Qualified leads / booked consults"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timeframe</label>
                  <input name="timeframe" className="w-full border rounded-xl p-3 bg-white" placeholder="90 days" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Budget constraint</label>
                  <input name="budget" className="w-full border rounded-xl p-3 bg-white" placeholder="Keep flat / +10%" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Channels</label>
                  <input
                    name="channels"
                    className="w-full border rounded-xl p-3 bg-white"
                    placeholder="Google Ads, Maps, Meta, Email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Expert voice (optional)</label>
                  <select name="expert_voice" className="w-full border rounded-xl p-3 bg-white" defaultValue="neutral">
                    <option value="neutral">Neutral, executive-ready</option>
                    <option value="bold">Bold, growth-oriented</option>
                    <option value="risk_aware">Risk-aware, compliance-first</option>
                    <option value="creative">Creative strategist</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    This will shape tone and tradeoffs. (Backend wiring later.)
                  </p>
                </div>
              </div>
            </details>

            {/* CTA */}
            <div className="flex items-center gap-3 pt-2">
              <button className="bg-black text-white rounded-xl px-5 py-3 text-sm font-medium" type="submit">
                Create run
              </button>
              <Link className="rounded-xl px-5 py-3 text-sm border bg-white" href="/">
                Cancel
              </Link>
            </div>
          </form>
        </section>

        {/* Footer helper */}
        <section className="text-sm text-gray-600">
          <p>
            This app is built around a simple rule: <b>the system owns structure + tools; the LLM is an executor inside it.</b>
          </p>
        </section>
      </div>
    </main>
  );
}

