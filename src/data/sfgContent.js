export const SFG_METADATA = {
  title: "IBM Sterling File Gateway (SFG) Mastery",
  subtitle: "Enterprise Managed File Transfer (MFT) & B2Bi Engine",
  version: "2.0.0"
};

export const SFG_CONCEPT_DOCS = [
  {
    id: "sfg-doc-01",
    title: "01. Sterling File Gateway (SFG) Architecture & B2Bi Foundation",
    category: "Architecture",
    readTime: "9 min read",
    content: `# 🌐 Guide 01: Sterling File Gateway Architecture & B2Bi Foundation

IBM **Sterling File Gateway (SFG)** is an enterprise Managed File Transfer (MFT) solution operating on top of the **Sterling B2B Integrator (B2Bi)** engine. It handles high-volume, secure file exchanges between internal systems and external trading partners.

---

## 1. High-Level Architecture

\`\`\`
+-------------------------------------------------------------------------+
|                  STERLING FILE GATEWAY (SFG) LAYER                      |
|   [ MyFile Gateway ]    [ Admin Console ]    [ Routing Engine ]        |
+-------------------------------------------------------------------------+
|                STERLING B2B INTEGRATOR (B2Bi) CORE ENGINE               |
|   [ BPML Execution Engine ]    [ Mailbox Subsystem ]    [ Perimeter ]   |
+-------------------------------------------------------------------------+
|                   COMMUNICATION PROTOCOLS / ADAPTERS                    |
|   [ SFTP Server/Client ]  [ FTPS ]  [ AS2 ]  [ HTTPS ]  [ Connect:Direct]|
+-------------------------------------------------------------------------+
|                 DATABASE & PERSISTENT FILE REPOSITORY                  |
|   [ DB2 / Oracle / Postgres ]        [ SAN / NAS / Object Storage ]     |
+-------------------------------------------------------------------------+
\`\`\`

---

## 2. Core Concepts & Terminology

| Component | Description |
| :--- | :--- |
| **Producer** | The trading partner or internal system sending files into SFG. |
| **Consumer** | The trading partner or internal system receiving files from SFG. |
| **Community** | A grouping of partners sharing common security protocols, routing rules, and file structures. |
| **Mailbox** | Hierarchical virtual directory structure where files land before and after routing. |
| **Routing Channel Template (RCT)** | Blueprint defining *how* files matching pattern X from Producer Y are transformed and routed to Consumer Z. |
| **Routing Channel (RC)** | A specific instance linking a Producer, Consumer, and Routing Channel Template. |
| **Business Process (BPML)** | Automated workflow script written in XML (BPML) executed by the engine. |
`
  },
  {
    id: "sfg-doc-02",
    title: "02. Partners, Communities, Groups & Mailbox Hierarchy",
    category: "Administration",
    readTime: "8 min read",
    content: `# 👥 Guide 02: Partners, Communities, Groups & Mailbox Hierarchy

Managing multi-tenant file transfers requires a structured organization of Communities, Partners, and Mailboxes.

---

## 1. Mailbox Structure Principles

Mailboxes in SFG act like a virtual file system decoupled from host OS paths:

\`\`\`
/ (Root Mailbox)
├── /ProducerPartnerA
│   ├── /Inbox
│   └── /Outbox
├── /ConsumerPartnerB
│   ├── /Inbox
│   └── /Outbox
└── /InternalERP
    ├── /Extracts
    └── /Reports
\`\`\`

- **Virtual Roots**: Each trading partner account is restricted to its own Virtual Root directory.
- **Permissions**:
  - \`Extract\`: Permission to download/read files.
  - \`Deposit\`: Permission to upload/write files.
`
  },
  {
    id: "sfg-doc-03",
    title: "03. Routing Channel Templates (RCT) & Routing Channels",
    category: "Routing Engine",
    readTime: "10 min read",
    content: `# 🔀 Guide 03: Routing Channel Templates (RCT) & Routing Channels

Routing Channel Templates (RCTs) form the brain of SFG routing logic.

---

## 1. Static vs. Dynamic Routing

- **Static Routing**: One Producer routes to a fixed single Consumer.
- **Dynamic Routing**: Single template dynamically determines destination Consumer based on filename metadata or XML header lookup.

---

## 2. Dynamic Variables in RCTs

| Variable | Output Example |
| :--- | :--- |
| \`\${ProducerName}\` | \`AcmeCorp\` |
| \`\${ConsumerName}\` | \`LogisticsInc\` |
| \`\${FileName}\` | \`orders.xml\` |
| \`\${Timestamp}\` | \`20260913_143000\` |
| \`\${Group1}\` | Regex capture group 1 matching value |
`
  },
  {
    id: "sfg-doc-04",
    title: "04. File Naming Conventions, Regex & Transformations",
    category: "File Processing",
    readTime: "8 min read",
    content: `# 📝 Guide 04: File Naming Conventions, Regex & Transformations

Precise filename matching using Regular Expressions prevents invalid files from triggering downstream workflows.

---

## 1. Regular Expressions (Regex) in SFG

| Pattern | Matches | Example |
| :--- | :--- | :--- |
| \`REGEXP:^EDI_850_.*\\.txt$\` | Starts with \`EDI_850_\` and ends with \`.txt\` | \`EDI_850_20260913.txt\` |
| \`REGEXP:^PAY_([0-9]{4})_([A-Z]+)\\.csv$\` | Captures Year (Group 1) and Region (Group 2) | \`PAY_2026_US.csv\` |
`
  },
  {
    id: "sfg-doc-05",
    title: "05. Protocols: SFTP, FTPS, AS2, HTTPS & Connect:Direct",
    category: "Protocols",
    readTime: "9 min read",
    content: `# 🔒 Guide 05: Protocols: SFTP, FTPS, AS2, HTTPS & Connect:Direct

Sterling File Gateway acts as a universal protocol gateway, translating inbound protocol payloads to outbound target protocols.
`
  },
  {
    id: "sfg-doc-06",
    title: "06. Business Processes (BP), BPML & Engine Flow",
    category: "Workflow Engine",
    readTime: "10 min read",
    content: `# ⚡ Guide 06: Business Processes (BP), BPML & Engine Flow

Every action inside Sterling File Gateway is executed as a **Business Process (BP)** written in **Business Process Modeling Language (BPML)** — an XML dialect parsed by B2Bi.
`
  },
  {
    id: "sfg-doc-07",
    title: "07. Event Notifications, Error Handling, Replay & Re-route",
    category: "Operations",
    readTime: "8 min read",
    content: `# 🚨 Guide 07: Event Notifications, Error Handling, Replay & Re-route

Handling file transfer failures gracefully is critical for MFT operations.
`
  },
  {
    id: "sfg-doc-08",
    title: "08. SFG Administration, DB Tables & SQL Diagnostic Cheatsheet",
    category: "Database & SQL",
    readTime: "9 min read",
    content: `# 🔍 Guide 08: SFG Database Tables & SQL Diagnostic Cheatsheet

When investigating stuck transfers or auditing partner metrics, querying the B2Bi/SFG database directly provides instant diagnostics.
`
  },
  {
    id: "sfg-doc-09",
    title: "09. In-Depth Infrastructure: DMZ, SSP, SEAS & B2Bi Architecture",
    category: "Infrastructure",
    readTime: "12 min read",
    content: `# 🛡️ Guide 09: Enterprise Infrastructure: DMZ, SSP, SEAS & B2Bi Architecture

To manage a secure, production-grade IBM Sterling MFT environment, you must master the 4 core components that form the enterprise topology:

---

## 1. Enterprise MFT Component Breakdown

### A. Sterling Secure Proxy (SSP / SSPS)
- **Role**: DMZ Reverse Proxy Boundary Protection.
- **Function**: Placed directly in the DMZ. It terminates incoming client protocol connections (SFTP, FTPS, HTTPS, AS2) from external partners.
- **Security Guarantee**: **Zero files and zero partner credentials are stored in the DMZ**. SSP forwards authentication requests to SEAS and routes data payloads to internal B2Bi via multiplexed Perimeter Server channels.

### B. Sterling External Authentication Server (SEAS)
- **Role**: Centralized Authentication & Authorization Gateway.
- **Function**: Placed in the internal network or secure DMZ boundary. Validates partner credentials against external enterprise identity providers (LDAP, Active Directory, Single Sign-On / SAML, RSA SecurID, PKI X.509 Certificates).
- **Attribute Extraction**: Extracts partner attributes (e.g. Virtual Root, Group membership) and passes them to SSP/B2Bi.

### C. Perimeter Server (PS)
- **Role**: Secure Multi-Layer Network Firewall Proxy.
- **Function**: Breaks the TCP connection at the DMZ boundary. Rather than opening inbound ports from DMZ to Internal network, the internal B2Bi engine opens an **outbound control channel** to the Perimeter Server in the DMZ.

### D. IBM Sterling B2B Integrator (B2Bi) Engine
- **Role**: Core Application Engine & Data Repository.
- **Function**: Executes BPML workflows, manages mailboxes, performs PGP encryption, database persistence (DB2/Oracle), and handles outbound partner deliveries.

---

## 2. Data Path Flow (External Partner Upload)

\`\`\`
[ Partner ] --(1. SFTP Login)--> [ SSP (DMZ) ] --(2. Auth Request)--> [ SEAS (Internal) ]
                                       |                                   | (LDAP Check)
                                       v                                   v
                               (3. Pass Token) <----------------- (Auth Success)
                                       |
                                       v (4. Forward Data via Control Channel)
                               [ Perimeter Server ]
                                       |
                                       v
                          [ B2Bi / SFG Engine Node ] --(5. Store File)--> [ NAS / Shared DB ]
\`\`\`
`
  },
  {
    id: "sfg-doc-10",
    title: "10. End-to-End Client & Partner Onboarding Masterclass",
    category: "Client Onboarding",
    readTime: "11 min read",
    content: `# 🤝 Guide 10: End-to-End Client & Partner Onboarding Masterclass

Onboarding a trading partner to SFG involves configuring security, protocol endpoints, routing rules, and automated notifications.

---

## 1. Partner Onboarding Lifecycle Steps

\`\`\`
[ 1. Discovery ] ──> [ 2. Auth Setup ] ──> [ 3. Mailbox Provisioning ] ──> [ 4. RCT & Routing ] ──> [ 5. UAT Test ]
\`\`\`

### Step 1: Partner Discovery & Requirements Gathering
- Gather: Transfer protocol (SFTP, FTPS, AS2), auth method (Password vs SSH Key), file naming convention, delivery schedule, notification email contacts.

### Step 2: Authentication & Credentials Setup
- For **SFTP Inbound**: Import partner SSH Public Key into B2Bi/SSP Authorized User Keys.
- For **AS2**: Import partner AS2 SSL Certificate and define partner AS2 Identifier (AS2 ID).

### Step 3: Community & Partner Account Creation
- Assign partner to Community (e.g., \`Healthcare_HIPAA_Community\`).
- SFG automatically provisions Virtual Root mailbox: \`/Healthcare_HIPAA_Community/PartnerName/\`.

### Step 4: Routing Channel Configuration
- Create Routing Channel linking Producer $\rightarrow$ Routing Channel Template (RCT) $\rightarrow$ Consumer.

### Step 5: End-to-End Validation (UAT)
- Perform test upload via SFTP client (FileZilla / WinSCP / CLI).
- Verify file tracking status in SFG Admin Console (\`Arrived and Routed\`).
`
  },
  {
    id: "sfg-doc-11",
    title: "11. IBM Sterling Control Center (SCC) Monitoring & Governance",
    category: "Monitoring & Governance",
    readTime: "10 min read",
    content: `# 👁️ Guide 11: IBM Sterling Control Center (SCC) Monitoring & Governance

**IBM Sterling Control Center (SCC)** provides enterprise visibility, monitoring, and SLA tracking across all B2Bi nodes, SFG instances, Connect:Direct servers, and SSP proxies.

---

## 1. Key Capabilities of Control Center (SCC)

- **Centralized Dashboard**: Real-time status of all active file transfers and node health across global datacenters.
- **SLA Tracking (Service Level Agreements)**: Triggers alerts if expected file arrival (e.g. \`DAILY_PAYROLL_*.csv\` by 06:00 AM) fails to arrive on time.
- **Automated Escalation Rules**: Sends email notifications, SNMP traps, or executes remediation scripts when a node goes down or a transfer fails.
- **Audit & Compliance Reporting**: Generates audit trails for SOX, HIPAA, and PCI-DSS compliance audits.

---

## 2. Configuring an Arrival SLA Rule in SCC

1. **Define Rule Criteria**: Target Server = \`B2Bi_Prod_Cluster\`, Filename = \`PAYROLL_*.csv\`.
2. **Define Schedule**: Expected between \`05:00 AM\` and \`06:00 AM\` EST.
3. **Configure Action**: If file NOT arrived by 06:01 AM $\rightarrow$ Raise High Severity Alert & email \`mft-oncall@company.com\`.
`
  },
  {
    id: "sfg-doc-12",
    title: "12. Enterprise Infrastructure Maintenance & HA Clustering",
    category: "Infrastructure",
    readTime: "10 min read",
    content: `# ⚙️ Guide 12: Enterprise Infrastructure Maintenance & HA Clustering

Production Sterling B2Bi/SFG environments run in **Active-Active High Availability (HA) Clusters** behind hardware load balancers.

---

## 1. Active-Active Cluster Topology

\`\`\`
                  [ F5 / Hardware Load Balancer ]
                                 |
         +-----------------------+-----------------------+
         |                                               |
[ B2Bi App Node 1 ]                             [ B2Bi App Node 2 ]
         |                                               |
         +-----------------------+-----------------------+
                                 |
           [ Shared DB2/Oracle Database ]  +  [ Shared NAS/SAN ]
\`\`\`

---

## 2. Maintenance Operations Procedure

### A. Taking a Cluster Node Down for Maintenance
1. Disable node in F5/Load Balancer pool (drain active sessions).
2. Stop B2Bi node cleanly:
   \`\`\`bash
   cd /install_dir/bin
   ./hardstop.sh
   \`\`\`
3. Perform OS patching / maintenance.
4. Start node:
   \`\`\`bash
   ./run.sh
   \`\`\`
5. Verify node rejoins cluster in B2Bi Ops Console $\rightarrow$ Re-enable in F5 pool.
`
  },
  {
    id: "sfg-doc-13",
    title: "13. Systematic Troubleshooting, Log Inspection & Error Codes",
    category: "Troubleshooting",
    readTime: "11 min read",
    content: `# 🛠️ Guide 13: Systematic Troubleshooting & Log Inspection

When transfers fail or connections drop, inspecting the correct log files isolates root cause in minutes.

---

## 1. Essential Sterling Log Files

| Log Name | Location | Purpose |
| :--- | :--- | :--- |
| \`perimeter.log\` | \`/install_dir/logs\` | Connection drops between DMZ Perimeter Server & B2Bi. |
| \`sftp.log\` | \`/install_dir/logs\` | SFTP authentication failures, key exchange errors, timeouts. |
| \`seas.log\` | \`/seas_install/logs\` | SEAS LDAP/AD external authentication failures. |
| \`http.log\` | \`/install_dir/logs\` | HTTPS / MyFile Gateway web portal errors. |
| \`system.log\` | \`/install_dir/logs\` | Engine level errors, DB connection pool depletion. |

---

## 2. Top 4 Common Production Failures & Solutions

1. **Perimeter Server Disconnected**:
   - Log message: \`Connection closed by remote perimeter server\`.
   - Fix: Check DMZ firewall port, restart Perimeter Server service (\`./inops.sh\`).
2. **SFTP Key Auth Failed**:
   - Log message: \`User public key not recognized\`.
   - Fix: Re-import partner SSH key into B2Bi Authorized User Keys.
3. **Database Connection Pool Exhausted**:
   - Log message: \`No available database connection in pool 'db2Pool'\`.
   - Fix: Increase \`maxConns\` in \`jdbc.properties\` and restart cluster.
4. **PGP Decryption Error**:
   - Log message: \`Secret key for decryption not found\`.
   - Fix: Verify partner used correct B2Bi public PGP key.
`
  },
  {
    id: "sfg-doc-14",
    title: "14. Upgrades, Fix Packs (iFix), DB Migration & Schema Maintenance",
    category: "Upgrades & Patches",
    readTime: "10 min read",
    content: `# 🚀 Guide 14: Upgrades, Fix Packs (iFix), DB Migration & Schema Maintenance

Keeping Sterling B2Bi/SFG updated with security Fix Packs (iFixes) prevents vulnerabilities and maintains IBM support.

---

## 1. Upgrade Types

- **Fix Pack / Interim Fix (iFix)**: Patches security vulnerabilities and bug fixes (e.g. B2Bi 6.1.2.0 $\rightarrow$ 6.1.2.4).
- **Major / Minor Version Upgrade**: Upgrade core platform (e.g. B2Bi 6.0 $\rightarrow$ 6.2).

---

## 2. Step-by-Step Fix Pack (iFix) Applying Workflow

1. **Pre-Upgrade Backup**:
   - Backup database (\`DB2 dump\` / \`Oracle RMAN\`).
   - Backup install directory (\`tar -czvf b2bi_backup.tar.gz /install_dir\`).
2. **Stop Application Cluster**:
   - Execute \`./hardstop.sh\` on all nodes.
3. **Apply Update via IBM Installation Manager**:
   \`\`\`bash
   ./Update.sh -f /tmp/b2bi_fixpack_6.1.2.4.jar
   \`\`\`
4. **Run Database Schema Update Script**:
   \`\`\`bash
   ./dbUpdate.sh
   \`\`\`
5. **Start Node 1 & Verify**:
   - Execute \`./run.sh\` on Node 1. Verify schema migration completes successfully before starting remaining cluster nodes.
`
  }
];

export const SFG_LAB_EXERCISES = [
  {
    id: "sfg-lab-01",
    title: "Lab 01: Partner Onboarding (Producer & Consumer Creation)",
    category: "Onboarding",
    estimatedTime: "20 mins",
    tasks: [
      { id: "t1", title: "Create Community 'FinanceCommunity'", command: "Log into SFG Admin Console -> Communities -> Add Community -> Name: 'FinanceCommunity'" },
      { id: "t2", title: "Create Producer Partner 'AcmePayables'", command: "Partners -> Add Partner -> Name: 'AcmePayables' -> Role: Producer -> Authentication: Password / SSH Key" },
      { id: "t3", title: "Create Consumer Partner 'GlobalBank'", command: "Partners -> Add Partner -> Name: 'GlobalBank' -> Role: Consumer -> Assign to Community 'FinanceCommunity'" },
      { id: "t4", title: "Verify Mailbox Provisioning", command: "Check Mailboxes -> Verify '/AcmePayables/Inbox' and '/GlobalBank/Outbox' are created automatically" }
    ],
    verification: "Navigate to Partners -> Filter by 'AcmePayables' -> Ensure status is Active and mailboxes exist."
  },
  {
    id: "sfg-lab-02",
    title: "Lab 02: Building Routing Channel Templates (RCT)",
    category: "Routing Rules",
    estimatedTime: "25 mins",
    tasks: [
      { id: "t1", title: "Create RCT 'Payroll_Routing_Template'", command: "Routing Channel Templates -> Add -> Name: 'Payroll_Routing_Template' -> Select Community 'FinanceCommunity'" },
      { id: "t2", title: "Define Producer Filename Pattern", command: "Producer Pattern: REGEXP:^PAYROLL_([0-9]{8})\\.csv$ (Matches PAYROLL_YYYYMMDD.csv)" },
      { id: "t3", title: "Define Destination Filename Transformation", command: "Destination Filename Format: BANK_PAY_\${Group1}_\${Timestamp}.dat" },
      { id: "t4", title: "Create Routing Channel linking AcmePayables -> GlobalBank", command: "Routing Channels -> Add -> Producer: AcmePayables -> Consumer: GlobalBank -> Template: Payroll_Routing_Template" }
    ],
    verification: "Check Routing Channels list -> Verify status is 'Active' with 0 errors."
  },
  {
    id: "sfg-lab-03",
    title: "Lab 03: Testing SFTP File Transfer & Auto-Routing",
    category: "Hands-on Routing",
    estimatedTime: "20 mins",
    tasks: [
      { id: "t1", title: "Upload Test File via SFTP to Producer Mailbox", command: "sftp -P 8022 AcmePayables@sfg.company.com\nput PAYROLL_20260913.csv /Inbox/" },
      { id: "t2", title: "Monitor File Arrival in SFG Admin Console", command: "Open File Tracking -> Arrivals -> Filter by Producer 'AcmePayables'" },
      { id: "t3", title: "Verify Transformed Delivery in Consumer Mailbox", command: "Verify file landed in '/GlobalBank/Outbox/' as 'BANK_PAY_20260913_XXXXXX.dat'" }
    ],
    verification: "File Tracking -> Arrivals -> Status MUST show 'Arrived and Routed' (Green checkmark)."
  },
  {
    id: "sfg-lab-04",
    title: "Lab 04: Exception Handling, Re-evaluation & Replaying Arrivals",
    category: "Troubleshooting",
    estimatedTime: "20 mins",
    tasks: [
      { id: "t1", title: "Upload Mismatched Filename to Trigger Failure", command: "put INVALID_FILE_NAME.txt /Inbox/ (Will fail RCT match)" },
      { id: "t2", title: "Inspect Failed Arrival Event Code", command: "Go to File Tracking -> Arrivals -> Status: 'Unrouted' (Event Code: FG_0002 No Route Found)" },
      { id: "t3", title: "Add Missing Pattern to RCT and Re-evaluate", command: "Edit RCT -> Add pattern 'INVALID_*.txt' -> Select Arrival -> Click 'Re-evaluate'" }
    ],
    verification: "Arrival status transitions from 'Unrouted' to 'Routed'."
  }
];

export const SFG_BPML_TEMPLATES = [
  {
    id: "bpml-mailbox-extract",
    name: "Mailbox Extract Service",
    description: "Extracts an incoming file from a mailbox by Message ID.",
    code: `<process name="MailboxExtractWorkflow">
  <sequence>
    <operation name="Mailbox Extract Service">
      <participant name="MailboxExtract"/>
      <output message="ExtractRequest">
        <assign to="." from="*"/>
        <assign to="MessageId" from="MessageId/text()"/>
      </output>
      <input message="ExtractResponse">
        <assign to="." from="*"/>
      </input>
    </operation>
  </sequence>
</process>`
  },
  {
    id: "bpml-sftp-client",
    name: "SFTP Outbound Client Push",
    description: "Connects to external partner SFTP server and uploads payload.",
    code: `<process name="SFTPClientPush">
  <sequence>
    <!-- Step 1: Begin SFTP Session -->
    <operation name="SFTP Client Begin Session Service">
      <participant name="SFTPClientBeginSession"/>
      <output message="BeginSessionRequest">
        <assign to="RemoteHost">sftp.partnerbank.com</assign>
        <assign to="RemotePort">22</assign>
        <assign to="RemoteUserId">bank_user</assign>
        <assign to="KnownHostsKeyId">Partner_SSH_Host_Key</assign>
      </output>
      <input message="BeginSessionResponse">
        <assign to="SessionToken" from="SessionToken/text()"/>
      </input>
    </operation>

    <!-- Step 2: PUT File -->
    <operation name="SFTP Client PUT Service">
      <participant name="SFTPClientPut"/>
      <output message="PutRequest">
        <assign to="SessionToken" from="SessionToken/text()"/>
        <assign to="RemoteFileName" from="DestinationFileName/text()"/>
      </output>
      <input message="PutResponse">
        <assign to="." from="*"/>
      </input>
    </operation>

    <!-- Step 3: End Session -->
    <operation name="SFTP Client End Session Service">
      <participant name="SFTPClientEndSession"/>
      <output message="EndSessionRequest">
        <assign to="SessionToken" from="SessionToken/text()"/>
      </output>
      <input message="EndSessionResponse">
        <assign to="." from="*"/>
      </input>
    </operation>
  </sequence>
</process>`
  },
  {
    id: "bpml-xslt-transform",
    name: "XSLT Filename & Payload Transformer",
    description: "Applies XSLT stylesheet transformation to incoming payload XML.",
    code: `<process name="XSLTTransformPayload">
  <sequence>
    <operation name="XSLT Service">
      <participant name="XSLT"/>
      <output message="XSLTRequest">
        <assign to="." from="*"/>
        <assign to="xslt_template_name">FormatInvoiceXML</assign>
      </output>
      <input message="XSLTResponse">
        <assign to="." from="*"/>
      </input>
    </operation>
  </sequence>
</process>`
  }
];
