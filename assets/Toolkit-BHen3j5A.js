import{j as t,S as n,B as i,b as s,d as r}from"./index-2r9z29LZ.js";import{P as _}from"./PageHero-DDwQMODA.js";import{s as h,d as l}from"./slug-DhJE7NcY.js";import{F as d}from"./file-down-D2Gscixe.js";import{D as c}from"./download-BpeOnjHN.js";const e=["1 · Orient & Locate","2 · Diagnose","3 · Resource & Build","4 · Validate & Expand","5 · Govern (CORE)","6 · Choose Your Starting Point","7 · Start & Sustain"],u=[{name:"The Four-Leaks Diagnostic",group:e[0],chapter:"Ch 1",useWhen:"A past AI effort under-delivered and you want to know why — or before a new one, to pre-empt the leak. A 10-minute check.",body:`For the effort in question, mark each leak PLUGGED or LEAKING:

  [ ] LEAK 1 — DATA READINESS      was the data ready, clean, usable?
  [ ] LEAK 2 — UNDEFINED SUCCESS   defined & measurable BEFORE building?
  [ ] LEAK 3 — WORKFLOW INTEGRATION redesigned — or AI bolted on the old one?
  [ ] LEAK 4 — GOVERNANCE          could you trust/deploy it where it mattered?

  Value drains at the FIRST leak. It was almost never the model.`},{name:"Locate Your Organization on the Flywheel",group:e[0],chapter:"Ch 3",useWhen:"You want a fast, big-picture read of where you stand before going deeper.",body:`  WHICH STAGES ARE LIVE?   1 Foundation 2 Generative 3 Agentic 4 Physical
  IS EACH ONE SOLID?       (a shaky lower stage caps the higher ones)
  DO WINS COMPOUND?        or reset to zero each time (the reset tax)?

  YOUR NEXT TURN = strengthen the lowest solid stage, or take the next
  one only if the floor beneath it holds.`},{name:"The AI Flywheel Maturity Model",group:e[0],chapter:"Ch 23",useWhen:"You need to place yourself precisely and chart the next move.",body:`  LEVEL          STAGES            DRIVE              CORE
  1 ABSENT       nothing live      none               none
  2 AD HOC       scattered Gen     pilots, no method  improvised
  3 EMERGING     solid floor       DRIVE on one       basics
  4 DISCIPLINED  agentic frontier  repeatable         operational
  5 COMPOUNDING  self-sustaining   a habit            a moat

  YOUR LEVEL = your LOWEST pillar.`},{name:"The AI Flywheel Self-Assessment",group:e[0],chapter:"Ch 23",useWhen:'You want your "blue dot" — your exact position and your single next move.',body:`  Score each 1 (not at all) -> 5 (fully, with evidence). Be brutally honest.

  STAGES   S1 data foundation ready, clean, owned          [1-5]
           S2 real validated value from Generative AI       [1-5]
           S3 agentic systems that ACT on valuable work     [1-5]
  DRIVE    D1 success defined BEFORE building               [1-5]
           D2 workflow redesigned (not just tech installed) [1-5]
           D3 validated honestly & measured after launch    [1-5]
           D4 wins standardized into reusable blocks        [1-5]
  CORE     C1 every agent has a named owner & is traceable  [1-5]
           C2 lawful, fair-tested &, where needed, sovereign[1-5]
           C3 guardrails, autonomy limits, kill-switch real [1-5]

  YOUR LEVEL = lowest pillar average (round down).
  YOUR NEXT MOVE = your single lowest-scoring question.`},{name:"The Opportunity Selection Matrix",group:e[1],chapter:"Ch 9",useWhen:"Picking which problem to point AI at. Resist the exciting moonshot.",body:`  Score each candidate 1-5; highest total wins.
  CANDIDATE: _______________________________
    VOLUME         how often does it happen?        [1-5] __
    MEASURABILITY  can you prove it improved?        [1-5] __
    DATA AVAILABLE does usable data already exist?   [1-5] __

  Moonshots score low on DATA and MEASURABILITY — which is why they fail first.`},{name:"The Data-Readiness Checklist (the Gate)",group:e[1],chapter:"Ch 4 / 9",useWhen:"Before any build. A hard gate — if it fails, fixing the data IS your first turn.",body:`  [ ] EXISTS      the data we need is actually captured
  [ ] CLEAN       it's accurate, consistent, not a mess
  [ ] CONNECTED   it's reachable, not trapped in silos
  [ ] RELEVANT    it actually bears on the problem
  [ ] ALLOWED     we may legally/ethically use it for this
  [ ] FRESH       it's current, and stays current

  THE GATE: any "no" = stop and fix the data first.`},{name:"The Success-Definition One-Pager",group:e[1],chapter:"Ch 9",useWhen:"Before building anything — the single highest-leverage habit in the method.",body:`  WHAT WE'RE IMPROVING: ____________________________
  BASELINE (today):  ______   ->   TARGET:  ______
  THE ONE METRIC THAT PROVES IT:  ____________________
  BY WHEN:  ______        OWNER (a name):  ____________

  If you can't fill this page, you're not ready to build — you're ready to think harder.`},{name:"The Fast-First-Value Selection Grid",group:e[1],chapter:"Ch 5",useWhen:"Choosing a Generative AI quick win without mistaking it for durable advantage.",body:`                 LOW value        HIGH value
   EASY/SAFE   |  skip / later  |  * START HERE  |
   HARD/RISKY  |  avoid         |  plan, govern  |

  Ship the high-value, high-ease/safe quick win in ~30 days — GenAI is the ante, not the edge.`},{name:"The Physical AI Candidate Screen",group:e[1],chapter:"Ch 7",useWhen:"Deciding whether a physical/industrial process is worth a Physical AI effort.",body:`  [ ] REPETITIVE & high-volume physical task
  [ ] SIMULATABLE   can we "practice in a dream" (synthetic data)?
  [ ] HIGH-VALUE    is the payoff worth the capital + time?
  [ ] BOUNDABLE     can it be made safe within hard limits?

  Mostly yes -> a candidate. Physical AI is the un-rentable moat, but capital-intensive.`},{name:"The Build-vs-Buy Decision Aid",group:e[2],chapter:"Ch 10",useWhen:"Deciding what to build in-house versus buy or partner for.",body:`  For each component, ask in order:
  1. ROAD or CAR?  road (your data, differentiating workflow) -> BUILD/OWN
                   car (model, commodity) -> BUY/RENT
  2. CAN WE BUILD TO PRODUCTION grade on time?  no -> PARTNER
  3. LOCK-IN COST?  high -> change it, or demand neutrality + transfer
  4. TIME-TO-VALUE?  building delays the turn -> buy/partner now

  RULE: Build & own the road. Rent the car. Partner for delivery.`},{name:"The Architecture-Neutrality Checklist",group:e[2],chapter:"Ch 10",useWhen:"Assessing lock-in exposure before (or after) you build.",body:`  [ ] MODEL-SWAPPABLE   could we swap our main model in weeks?
  [ ] OPEN STANDARDS    components connect on neutral standards?
  [ ] DATA-PORTABLE     is our data ours, in a portable form?
  [ ] NO CHOKE-POINT    could we route around any one vendor?
  [ ] KNOWLEDGE KEPT    do WE understand it (not just a partner)?
  [ ] EXIT-COSTED       have we estimated the cost to leave each vendor?

  Any "no" = a bar of a cage.`},{name:"The Agent Operating Model",group:e[2],chapter:"Ch 6",useWhen:"Designing any agent that acts — this is the contract for its behavior.",body:`  AGENT: __________________   OWNER (a name): __________
  GOAL          what it's trying to achieve: ____________
  TOOLS         what it may use: ____________
  PERMISSIONS   what it MAY and MAY NOT do: ____________
  CHECKPOINTS   where a human reviews/approves: ____________
  ESCALATION    who it hands hard cases to: ____________
  KILL-SWITCH   how it's stopped, who's authorized: __________

  Plan for the deployment, not the demo.`},{name:"The Implementation Readiness Checklist",group:e[2],chapter:"Ch 11",useWhen:'Before calling anything "ready." Item 1 alone = just a demo.',body:`  1. [ ] TECHNICALLY WORKS    correct on a good day (the demo bar)
  2. [ ] WORKFLOW REDESIGNED  redesigned around AI (not paved cow path)
  3. [ ] RELIABLE & WATCHED   holds on messy inputs; monitored
  4. [ ] INTEGRATED           wired into the real systems people use
  5. [ ] HUMAN ROLE SET       operating model live; people repositioned
  6. [ ] CHANGE-MANAGED       the people whose work changes are brought along

  Passing only #1 = a demo, not a system.`},{name:"The Validation Scorecard",group:e[3],chapter:"Ch 12",useWhen:"Proving a deployment worked — honestly, against the success definition.",body:`  METRIC      BASELINE  TARGET  ACTUAL  VERDICT(hit/miss/partial)  AUDITED BY
  (primary)    ____      ____    ____    ____                       ____
  (metric 2)   ____      ____    ____    ____                       ____
  LEADING INDICATORS WE WATCH:  ____, ____, ____
  CONTINUOUS WATCH:  evals [ ]  tracing [ ]  guardrail tests [ ]
  HONEST HORIZON:  full financial payoff expected by: ________

  THE SKEPTIC'S TEST: would the finance manager at the back accept this as proof?`},{name:"The Honest-ROI Horizon (by stage)",group:e[3],chapter:"Ch 12",useWhen:"Setting expectations before you build, so a good program isn't killed by impatience.",body:`  Back-office automation   months (~6-18)   watch: cycle time, errors
  Generative apps          ~1-2 years       watch: adoption -> outcome
  Agentic systems          ~3-5 years       watch: task success, deflection
  Physical AI              longest; capital  watch: uptime, throughput, safety

  RULE: set the horizon before you build.`},{name:"The Pilot-to-Platform Expansion Checklist",group:e[3],chapter:"Ch 13",useWhen:"Deciding whether a proven pilot is ready to scale — write the recipe, don't scale the hero.",body:`  1. [ ] STANDARDIZED   documented as a reusable recipe (not in one head)
  2. [ ] GOVERNED       carries its guardrails with it
  3. [ ] REUSABLE       an adjacent function could adopt it cheaply
  4. [ ] COMPOSABLE     can combine with other blocks (multi-agent)
  5. [ ] TELEMETRY      capturing data to seed the next stage
  6. [ ] CHAMPION       a credible human will carry it to the next team
  7. [ ] OWNED          someone owns versioning, monitoring, improvement

  A "no" on 1, 2, or 6 = a hero's dish, not a recipe.`},{name:"The Flywheel Handoff Map",group:e[3],chapter:"Ch 8",useWhen:"Engineering compounding — making each stage feed the next on purpose.",body:`  For each stage, name what it PRODUCES that fuels the next (the baton):
    FOUNDATION -> produces ____ -> fuels GENERATIVE
    GENERATIVE -> produces ____ -> fuels AGENTIC
    AGENTIC    -> produces ____ -> fuels PHYSICAL
  The baton carries: DATA . CAPABILITY . TRUST . CAPITAL

  The race is won in the handoffs.`},{name:"The Next-Turn Worksheet",group:e[3],chapter:"Ch 2",useWhen:"Finishing any win — to make sure it feeds the next turn instead of resetting to zero.",body:`  THIS WIN: ____________________________
  What did it add to each account?
    DATA       (what new/better data?)        ____________
    CAPABILITY (what can we now do?)           ____________
    TRUST      (what are we now allowed to do?)____________
  THEREFORE, THE NEXT TURN IS: ____________________________

  A win that feeds nothing pays the reset tax.`},{name:"The Governance Maturity Quick Scan",group:e[4],chapter:"Ch 14",useWhen:"Finding why your AI is stuck on low-stakes work — and what guardrail to build next.",body:`  Rate each: x none . o ad hoc . v disciplined
  CAN YOU SEE IT?      trace what it did & why?            (Openness)
  WHO OWNS IT?         a named human, not "the AI team"?   (Responsibility)
  CAN YOU STOP IT?     tested guardrails + kill-switch?    (Responsibility)
  LAWFUL & FAIR?       aligned to regulation; bias tested? (Compliance)
  HUMAN IN THE LOOP?   at high-stakes decisions?           (Empowerment)
  LEADERSHIP OWNS IT?  or dumped on a technical team?

  Your weakest row is the guardrail holding your next deployment down.`},{name:"The Compliance & Sovereignty Readiness Checklist",group:e[4],chapter:"Ch 15",useWhen:"Before deploying — ideally while it's still a blueprint, when building to code is cheap.",body:`  [ ] RISK-CLASSIFIED   sorted into a regulatory risk tier?
  [ ] DESIGNED-FOR      built to the highest standard we'll face?
  [ ] FAIRNESS-TESTED   outcomes tested across groups, before AND after?
  [ ] RESIDENCY KNOWN   where do data, models, interactions legally live?
  [ ] SOVEREIGN WHERE   regulated/citizen data kept in-jurisdiction?
  [ ] PROVABLE          could we show all this to a regulator, with evidence?

  Answer on the blueprint, not after inspection.`},{name:"The Agent Accountability Register",group:e[4],chapter:"Ch 16",useWhen:"Running more than one agent — the antidote to the orphan automation and the shadow fleet.",body:`  One row per agent. No row, no deployment.

  AGENT &      NAMED    AUTONOMY/      TRACE-   ESCALATION  KILL-
  PURPOSE      OWNER    PERMISSIONS    ABLE?    PATH        SWITCH
  __________   _____    ___________    Y/N      _________   tested?
  __________   _____    ___________    Y/N      _________   tested?

  OWNER = a person, never a team.`},{name:"The Autonomy-Level Decision Guide",group:e[4],chapter:"Ch 17",useWhen:"Setting how much an agent may do on its own — set the dial, don't crank it to maximum.",body:`  Ask: STAKES x REVERSIBILITY x AMBIGUITY of the action, then:
    LOW . reversible . routine            -> FULL AUTO (log + spot-check)
    MED . mostly reversible . some judgment -> AUTO + NOTIFY (can undo)
    HIGH . hard to reverse . or novel     -> HUMAN-IN-THE-LOOP (approve)
    SEVERE . irreversible . rights/safety -> HUMAN DECIDES (agent assists)

  When in doubt, set it one notch LOWER.`},{name:"The Business Starting-Point Selector",group:e[5],chapter:"Ch 18",useWhen:"A company is picking its first flywheel turn.",body:`  Score each candidate workflow 1-5; highest total = start here.
    VOLUME         how often?                  __
    COST           money/time it eats?         __
    MEASURABILITY  can we prove improvement?   __
    DATA READINESS usable data exists?         __
    REVERSIBILITY  early mistakes low-stakes?  __

  Start high-volume, high-cost, measurable, data-ready, forgiving.`},{name:"The Public-Sector Use-Case Prioritizer",group:e[5],chapter:"Ch 19",useWhen:"A government is choosing a citizen service to pilot.",body:`  Score 1-5:  CITIZEN REACH . PAIN/EXCLUSION . WORKFORCE GAP .
              MEASURABILITY . DATA & SOVEREIGNTY        -> VALUE TOTAL
  THEN weigh GOVERNANCE BURDEN:
    HIGH-stakes (benefits, justice, health) -> human-in-the-loop; not first
    LOWER-stakes (info, forms, status)      -> ideal first turn

  Reach is the return — and the road must be sovereign.`},{name:"The Mission-Impact Use-Case Selector",group:e[5],chapter:"Ch 20",useWhen:"A university, hospital, or nonprofit is choosing where to start.",body:`  Score 1-5:  MISSION LEVERAGE . CAPACITY FREED . MEASURABILITY .
              DATA & ETHICS READINESS              -> MISSION TOTAL
  THEN weigh TRUST AT STAKE:
    HIGH (care, assessment, welfare) -> human-in-the-loop, ethics first
    LOWER (admin, documentation)     -> ideal first turn — free the talent

  Turn overhead into mission. Ethics leads.`},{name:"The Economic Flywheel Design Template",group:e[5],chapter:"Ch 21",useWhen:"A policymaker is designing a national or regional AI engine.",body:`  Design the cycle, then turn it:
    1 CAPABILITY   train how many practitioners, in what, by when? ____
    2 COMPUTE      what sovereign compute + data to build?         ____
    3 DEPLOYMENT   which sector first (your existing fuel)?        ____
    4 VALUE        what GDP/jobs/productivity to capture & keep?   ____
    5 REINVESTMENT how does value fund the next, bigger turn?      ____

  An economy runs on implementers, not intelligence. Start where your fuel is.`},{name:"The 90-Day Flywheel Start Plan",group:e[6],chapter:"Ch 22",useWhen:"You're ready to take the first turn — the whole book on one page.",body:`  MY SCALE: [ ] team  [ ] enterprise  [ ] government/institution

  DAYS 1-30 . DIAGNOSE
    THE ONE OPPORTUNITY: ____________________________
    DATA-READINESS GATE passed? [ ]   if no, the fix is: ______
    SUCCESS DEFINITION: baseline ___ -> target ___ . metric ___ . by ___
    OWNER: ______

  DAYS 31-60 . RESOURCE + IMPLEMENT
    TEAM (small + right): ______   ARCHITECTURE neutral/data owned? [ ]
    PARTNER for: ______   WORKFLOW REDESIGNED? [ ]   PRODUCTION-GRADE? [ ]

  DAYS 61-90 . VALIDATE + EXPAND
    RESULT vs SUCCESS DEFINITION: ____________________
    DAY-90 DECISION: [ ] proved -> standardize + next turn: ______
                     [ ] didn't -> the honest lesson is: ______

  THE COMMITMENT:  Day 1 is (date): __________   Owner: __________`},{name:"The Quarterly Refresh Cadence",group:e[6],chapter:"Ch 24",useWhen:"Every quarter, forever — to stay current without chasing every release.",body:`  HOLD CONSTANT (the compass)        REFRESH QUARTERLY (the map)
  - the four-stage flywheel          - which model leads / its price
  - DRIVE discipline                 - what's newly possible
  - CORE governance                  - your tools & assumptions
  - own the road, rent the car       - the evidence behind your bets

  THE HABIT (one hour, 4x/year): "What changed on the map — and does any
  of it change which turn we take next?" Update the fuel, never the engine.`}],E=u.map((a,o)=>({...a,n:o+1,slug:h(a.name)}));function p(a){return`THE AI FLYWHEEL — TOOLKIT
${a.name}
${"=".repeat(a.name.length)}
Use when: ${a.useWhen}
From: ${a.chapter}

${a.body}

— The AI Flywheel · "Add 1. Become the one." · It is almost never the model.
`}function I(){return t.jsxs(t.Fragment,{children:[t.jsx(n,{title:"The Toolkit — 28 free tools",path:"/toolkit",description:"Every template, checklist, and diagnostic in the book — free to download and ready to use."}),t.jsx(_,{eyebrow:"The toolkit · 28 free tools",title:t.jsxs(t.Fragment,{children:["The field manual, ",t.jsx("span",{className:"text-shimmer",children:"free to use"}),"."]}),sub:"Every template, checklist, and diagnostic in the book — stripped to its working form. Download any one, or take the whole kit. Honest scoring only: a flattering score is a wasted tool.",accent:"#E6B968",children:t.jsxs(i,{href:"/downloads/AI-Flywheel-Toolkit.md",className:"",children:[t.jsx(d,{className:"h-4 w-4"})," Download the full toolkit"]})}),t.jsxs(s,{children:[e.map(a=>t.jsxs("div",{className:"mb-12",children:[t.jsxs("div",{className:"mb-5 flex items-center gap-4",children:[t.jsx("h2",{className:"font-display text-xl font-bold text-cloud",children:a}),t.jsx("span",{className:"h-px flex-1 bg-hairline/40"})]}),t.jsx("div",{className:"grid gap-4 md:grid-cols-2",children:E.filter(o=>o.group===a).map(o=>t.jsxs("div",{className:"group flex h-full flex-col rounded-2xl border border-hairline/60 bg-panel/40 p-6 transition hover:border-gold/30",children:[t.jsxs("div",{className:"flex items-start justify-between gap-3",children:[t.jsxs("h3",{className:"font-display text-[15px] font-semibold text-cloud",children:[t.jsx("span",{className:"font-mono text-gold",children:String(o.n).padStart(2,"0")})," · ",o.name]}),t.jsx("span",{className:"chip border-hairline text-faint",children:o.chapter})]}),t.jsxs("p",{className:"mt-2 flex-1 text-[13px] leading-relaxed text-muted",children:[t.jsx("span",{className:"text-mist",children:"Use when:"})," ",o.useWhen]}),t.jsxs("button",{onClick:()=>l(`${o.slug}.txt`,p(o),"text/plain"),className:"mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-hairline px-3.5 py-1.5 text-[12px] font-semibold text-mist transition hover:border-gold/50 hover:text-gold",children:[t.jsx(c,{className:"h-3.5 w-3.5"})," Download template"]})]},o.slug))})]},a)),t.jsx("p",{className:"rounded-xl border border-hairline/50 bg-[rgb(var(--tint)/0.03)] p-4 text-[13px] text-muted",children:"Every tool serves one truth: it is almost never the model. It is data readiness, implementation discipline, workflow redesign, and governance."})]}),t.jsx(r,{})]})}export{I as default};
