# FL-05 Explainer: Workflows, AI Agents, and Model Context Protocol (MCP)

> **General AI Fluency — Week 4 Assignment (Code: FL-05)**  
> **Student**: Pabitra Sahoo  
> **Word Count**: ~750 words  

---

## 1. Defining Workflows vs. AI Agents

The distinction between an **AI Workflow** and an **AI Agent** lies in **control flow and autonomy**.

* **AI Workflows**: Workflows follow a predefined, deterministic sequence of steps (e.g., Step A $\rightarrow$ Step B $\rightarrow$ Step C). The LLM is used as an intelligent processing node within a human-designed pipeline. In our FL-04 build, data is gathered, synthesized, and formatted in fixed linear order. The prompt sequence is fixed, and the system cannot decide to skip a step or call an unscripted external API based on intermediate results.

* **AI Agents**: Agents operate within a dynamic control loop (Reason $\rightarrow$ Act $\rightarrow$ Observe $\rightarrow$ Repeat). An agent is given a high-level goal (e.g., *"Audit user budget and automatically move surplus funds into high-yield savings"*), access to tools, and an environment. The agent autonomously decides which tools to invoke, evaluates the output of those tool calls, handles errors dynamically, and continues until the goal is achieved.

### Classification of FL-04 Build:
Our FL-04 pipeline is strictly a **Workflow**. It executes 4 defined steps sequentially. It lacks autonomous tool choice and dynamic loop branching.

---

## 2. Understanding Model Context Protocol (MCP)

The **Model Context Protocol (MCP)**, developed by Anthropic, acts as an open standard ("USB-C port") connecting AI models to external tools, data sources, and services securely.

MCP introduces three fundamental primitives:
1. **Tools**: Functions exposed by the server that the AI can execute (e.g., `read_file`, `execute_query`, `send_email`).
2. **Resources**: Data sources that the AI can read into context (e.g., local files, database schemas, system logs).
3. **Prompts**: Reusable prompt templates provided by the server to guide interaction.

By standardizing how models discover and execute capabilities, MCP decouples model logic from custom integration code.

---

## 3. Evidence of Working MCP / Connector Setup

During our development workspace setup, we connected local file inspection tools (`view_file`, `list_dir`) and terminal execution tools (`run_command`) to our AI environment.

### 3 Non-Chat Tasks Performed via External Tools:
1. **Local Codebase File Inspection**:
   - *Task*: Read and inspect local `package.json` and TypeScript source files (`/src/app/api/chat/route.ts`) directly from the filesystem to verify Next.js dependencies.
   - *Proof*: Verified file content programmatically without requiring manual user copy-paste.

2. **Automated Production Build Verification**:
   - *Task*: Executed `npm run build` directly via terminal tool integration (`run_command`).
   - *Proof*: Programmatically verified static page generation (`14/14` static/dynamic pages compiled cleanly).

3. **Subsystem Log Diagnostics**:
   - *Task*: Checked background task execution logs to verify build completion and dependency status.
   - *Proof*: Extracted exact compiler output and error traces directly from local log files.

---

## 4. Upgrading FL-04 Workflow into a Full AI Agent

To transform our FL-04 financial workflow into an autonomous **Vitta Financial AI Agent**, the following upgrades are required:

1. **Equip MCP Financial Tools**: Connect MCP tools for `fetch_live_bank_transactions`, `reconcile_ledger`, and `trigger_sla_alert`.
2. **Dynamic Decision Loop**: Instead of running a fixed 4-step chain, allow the agent to inspect current expenses, determine if anomaly detection is required, and autonomously decide whether to request user approval or trigger an emergency budget warning.
3. **Memory & Reflection**: Store past spending patterns in a vector database resource so the agent can compare current financial behavior against 6-month historical baselines.
