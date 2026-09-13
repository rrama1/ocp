export const SFG_METADATA = {
  title: "IBM Sterling File Gateway (SFG) Mastery",
  subtitle: "Enterprise Managed File Transfer (MFT) & B2Bi Engine",
  version: "1.0.0"
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

---

## 3. The File Life Cycle in SFG

1. **Arrive**: File is uploaded by Producer via SFTP, FTPS, HTTPS, or picked up by adapter.
2. **Evaluate**: SFG identifies Producer mailbox, matches file pattern against active Routing Channels.
3. **Transform**: Filename is renamed, compressed/decompressed, or encrypted/decrypted.
4. **Deliver**: File is deposited into Consumer mailbox or pushed out to remote server.
5. **Complete**: Event status logged in database (\`FG_ARRIVALS\`, \`DATA_FLOW\`).
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

---

## 2. Onboarding Workflow Checklist

1. **Create Community**: Define security, user authentication policies, and extension parameters.
2. **Create Partner**: Specify partner name, code, contact details, authentication type (SSH key / Password).
3. **Assign Partner Groups**: Assign roles like \`FileGatewayProducers\` or \`FileGatewayConsumers\`.
4. **Provision Mailboxes**: Automatically generated based on Community pattern templates.
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

## 2. Anatomy of a Routing Channel Template (RCT)

An RCT specifies 4 key stages:

1. **Producer Specification**:
   - Filename Pattern (e.g. \`PAYROLL_*.csv\` or \`REGEXP:^INV_[0-9]{8}\\.xml$\`).
2. **Consumer Specification**:
   - Destination Mailbox or Remote Server path.
3. **Filename Transformation**:
   - Pattern substitution (e.g. \`\${ProducerName}_\${FileName}_\${Timestamp}.dat\`).
4. **Special Handling**:
   - Compression (Zip, Gzip), PGP Encryption/Decryption, Custom BPML subroutines.

---

## 3. Dynamic Variables in RCTs

| Variable | Output Example |
| :--- | :--- |
| \`\${ProducerName}\` | \`AcmeCorp\` |
| \`\${ConsumerName}\` | \`LogisticsInc\` |
| \`\${FileName}\` | \`orders.xml\` |
| \`\${Timestamp}\` | \`20260913_143000\` |
| \`\${Date}\` | \`20260913\` |
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

SFG supports Java Regex syntax for matching incoming files:

| Pattern | Matches | Example |
| :--- | :--- | :--- |
| \`REGEXP:^EDI_850_.*\\.txt$\` | Starts with \`EDI_850_\` and ends with \`.txt\` | \`EDI_850_20260913.txt\` |
| \`REGEXP:^PAY_([0-9]{4})_([A-Z]+)\\.csv$\` | Captures Year (Group 1) and Region (Group 2) | \`PAY_2026_US.csv\` |

---

## 2. Transformation Examples

Using capture groups in Destination Filename Format:
- Input Pattern: \`REGEXP:^PAY_([0-9]{4})_([A-Z]+)\\.csv$\`
- Output Format: \`PROCESSED_\${Group2}_\${Group1}_\${Timestamp}.dat\`
- Result: \`PROCESSED_US_2026_20260913_150000.dat\`
`
  },
  {
    id: "sfg-doc-05",
    title: "05. Protocols: SFTP, FTPS, AS2, HTTPS & Connect:Direct",
    category: "Protocols",
    readTime: "9 min read",
    content: `# 🔒 Guide 05: Protocols: SFTP, FTPS, AS2, HTTPS & Connect:Direct

Sterling File Gateway acts as a universal protocol gateway, translating inbound protocol payloads to outbound target protocols.

---

## 1. Supported Transfer Protocols

\`\`\`
[ Producer ] --( SFTP )--> [ SFG / B2Bi Gateway ] --( AS2 )--> [ External Partner ]
[ Producer ] --( HTTPS )--> [ SFG / B2Bi Gateway ] --( C:D )--> [ Mainframe ]
\`\`\`

### A. SFTP (SSH File Transfer Protocol)
- Requires SSH Host Keys, User Public Keys, or Password authentication.
- Port: Usually 22 or custom port (e.g., 8022).

### B. AS2 (Applicability Statement 2)
- Built on top of HTTP/HTTPS.
- Uses PKI digital certificates for encryption, signing, and **MDN (Message Disposition Notification)** receipts for non-repudiation.

### C. Connect:Direct (C:D)
- IBM proprietary enterprise protocol used heavily in banking and mainframes for high-performance, checkpoint-restartable transfers.
`
  },
  {
    id: "sfg-doc-06",
    title: "06. Business Processes (BP), BPML & Engine Flow",
    category: "Workflow Engine",
    readTime: "10 min read",
    content: `# ⚡ Guide 06: Business Processes (BP), BPML & Engine Flow

Every action inside Sterling File Gateway is executed as a **Business Process (BP)** written in **Business Process Modeling Language (BPML)** — an XML dialect parsed by B2Bi.

---

## 1. Key Core Business Processes in SFG

- \`FileGatewayArrival\`: Triggered automatically when a file arrives in an evaluated mailbox.
- \`FileGatewayRoute\`: Evaluates Routing Channels and determines consumer targets.
- \`FileGatewaySendMessage\`: Handles active outbound delivery (SFTP push, AS2 send, Connect:Direct copy).

---

## 2. Basic BPML Anatomy

\`\`\`xml
<process name="CustomFileRouting">
  <sequence>
    <!-- Step 1: Assign process data -->
    <assign to="Status">STARTING</assign>
    
    <!-- Step 2: Invoke Mailbox Service -->
    <operation name="Mailbox Extract Service">
      <participant name="MailboxExtract"/>
      <output message="ExtractRequest">
        <assign to="." from="*"/>
      </output>
      <input message="ExtractResponse">
        <assign to="." from="*"/>
      </input>
    </operation>
  </sequence>
</process>
\`\`\`
`
  },
  {
    id: "sfg-doc-07",
    title: "07. Event Notifications, Error Handling, Replay & Re-route",
    category: "Operations",
    readTime: "8 min read",
    content: `# 🚨 Guide 07: Event Notifications, Error Handling, Replay & Re-route

Handling file transfer failures (network timeouts, invalid file format, decryption failure) gracefully is critical for MFT operations.

---

## 1. Failure Modes & Recovery Actions

| Failure Scenario | Root Cause | Operator Action |
| :--- | :--- | :--- |
| **No Route Found** | Filename did not match any active RCT pattern. | Update RCT pattern and click **Re-evaluate Arrival**. |
| **Delivery Failed** | Target SFTP server offline or credentials expired. | Fix target connection and click **Re-deliver / Replay**. |
| **Decryption Error** | Partner encrypted file with wrong PGP key. | Contact partner & upload corrected file using **Re-add**. |

---

## 2. Event Codes to Watch

- \`FG_0001\`: File Arrival Started.
- \`FG_0004\`: Route Evaluation Successful.
- \`FG_0010\`: File Delivered to Consumer Mailbox.
- \`FG_0020\`: Delivery Failed (Alert Triggered).
`
  },
  {
    id: "sfg-doc-08",
    title: "08. SFG Administration, DB Tables & SQL Diagnostic Cheatsheet",
    category: "Database & SQL",
    readTime: "9 min read",
    content: `# 🔍 Guide 08: SFG Database Tables & SQL Diagnostic Cheatsheet

When investigating stuck transfers or auditing partner metrics, querying the B2Bi/SFG database directly provides instant diagnostics.

---

## 1. Key Database Tables

- \`FG_ARRIVALS\`: Tracks incoming file arrival events, state, producer ID.
- \`FG_ROUTE\`: Tracks individual routing channel executions.
- \`DATA_FLOW\`: Core B2Bi table tracking payload data flows across services.
- \`WORKFLOW_CONTEXT\`: Holds active Business Process execution state.

---

## 2. SQL Diagnostic Queries

\`\`\`sql
-- 1. Find Failed File Arrivals in Last 24 Hours
SELECT ARRIVAL_ID, PRODUCER_NAME, FILENAME, STATUS, CREATE_TIME
FROM FG_ARRIVALS
WHERE STATUS = 'FAILED'
  AND CREATE_TIME >= CURRENT_TIMESTAMP - INTERVAL '24' HOUR
ORDER BY CREATE_TIME DESC;

-- 2. Track Data Flow by Filename
SELECT WORKFLOW_ID, DATA_FLOW_ID, PRODUCER_NAME, CONSUMER_NAME, STATUS
FROM DATA_FLOW
WHERE FILENAME LIKE '%INVOICE%'
ORDER BY START_TIME DESC;
\`\`\`
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
    description: "Extracts a incoming file from a mailbox by Message ID.",
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
