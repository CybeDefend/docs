# CybeDefend Functional Specifications

**Version 2.0 - Production Release**

---

## Table of Contents

### [1. Introduction](#1-introduction)

- [1.1 Project Context](#11-project-context)
- [1.2 Objectives of the Document](#12-objectives-of-the-document)
- [1.3 Project Scope](#13-project-scope)

### [2. System Overview](#2-system-overview)

- [2.1 General Description](#21-general-description)
- [2.2 Target Users](#22-target-users)
- [2.3 Key Features](#23-key-features)

### [3. Detailed Functional Specifications](#3-detailed-functional-specifications)

- [3.1 User and Role Management](#31-user-and-role-management)
- [3.2 Authentication and Access Control](#32-authentication-and-access-control)
- [3.3 Scan Configuration and Execution](#33-scan-configuration-and-execution)
- [3.4 Integration of Analysis Tools](#34-integration-of-analysis-tools)
- [3.5 AI Agent Integration](#35-ai-agent-integration)
- [3.6 Vulnerability Management](#36-vulnerability-management)
- [3.7 External Integrations](#37-external-integrations)
- [3.8 Data Privacy and Sovereignty](#38-data-privacy-and-sovereignty)

### [4. User Interfaces](#4-user-interfaces)

- [4.1 Global Project Management Dashboard](#41-global-project-management-dashboard)
- [4.2 Project Vulnerability List](#42-project-vulnerability-list)
- [4.3 Organization and Team Management](#43-organization-and-team-management)
- [4.4 Project Overview and Statistics](#44-project-overview-and-statistics)

### [5. Workflow and Processes](#5-workflow-and-processes)

- [5.1 Account Creation and Onboarding](#51-account-creation-and-onboarding)
- [5.2 Project Lifecycle](#52-project-lifecycle)
- [5.3 Scan Lifecycle](#53-scan-lifecycle)
- [5.4 Vulnerability Management Process](#54-vulnerability-management-process)

### [6. Billing and Subscription](#6-billing-and-subscription)

- [6.1 Pricing Model](#61-pricing-model)
- [6.2 AI Usage Tracking](#62-ai-usage-tracking)
- [6.3 Subscription Management](#63-subscription-management)

### [7. Technical Architecture](#7-technical-architecture)

- [7.1 Platform Infrastructure](#71-platform-infrastructure)
- [7.2 Security and Compliance](#72-security-and-compliance)
- [7.3 Data Storage](#73-data-storage)

### [8. Appendices](#8-appendices)

- [8.1 Glossary](#81-glossary)
- [8.2 Supported Technologies](#82-supported-technologies)
- [8.3 Integration Matrix](#83-integration-matrix)

---


# 1. Introduction

## 1.1 Project Context

CybeDefend is an innovative SaaS platform specializing in Application Security Testing (AST), designed to revolutionize cybersecurity by embedding security from the very beginning of the development lifecycle. Our journey began with firsthand experiences of cyberattacks and the costly rework that follows when vulnerabilities are detected too late.

The platform addresses the growing security needs in application development by offering a unified, transparent, and AI-powered approach to security testing. By consolidating multiple security analysis tools (SAST, SCA, IaC, Container Security) into a single platform with advanced AI capabilities, CybeDefend reduces costs, simplifies security management, and ensures compliance with strict security standards like GDPR, PCI-DSS, and OWASP.

**Key Differentiators:**

- **Security by Design**: Vulnerabilities are detected and fixed early in the development cycle, preventing costly rework
- **AI-Powered Analysis**: Proprietary knowledge graph technology and AI agents eliminate up to 90% of false positives
- **Unified Platform**: All security tools integrated into a single dashboard with consistent workflows
- **Sovereign Cloud**: Choice between European (GDPR-compliant, SecNumCloud certified) and US infrastructure
- **Innovation Leader**: Introduction of BLSA (Business Logic Security Analysis) - a revolutionary AI-driven scanner

## 1.2 Objectives of the Document

This document serves as the comprehensive functional specification for the CybeDefend platform in its production state. The primary objectives are:

**1. Define Complete System Features**

Clearly define all features that the CybeDefend platform supports in its current production version, including:

- User-visible features (user interface, scan results, AI agent interactions)
- Backend features (role management, security, scan processing, knowledge graph construction)
- Integration capabilities (CI/CD, IDE, container registries, version control systems)

**2. Document Current State vs. Roadmap**

Distinguish between:

- **Production Features**: Fully operational capabilities available to all users
- **In Development**: Features currently being built (e.g., BLSA full release)
- **Planned Features**: Items on the public roadmap for future releases

**3. Establish Evaluation Criteria**

Define clear criteria for:

- Feature completeness and quality
- Performance benchmarks
- Security and compliance standards
- User experience expectations

**4. Ensure User-Centric Design**

Document features based on validated user needs, ensuring:

- Developer-friendly workflows
- Security team collaboration capabilities
- Management visibility and reporting
- Seamless integration with existing tools

**5. Maintain Requirement Traceability**

Ensure that all specified features correspond to clearly identified functional needs and that these needs are tracked throughout the development process, maintaining full stakeholder awareness of what is included in the production platform.

## 1.3 Project Scope

The scope of CybeDefend encompasses a comprehensive SaaS solution capable of:

**Core Security Analysis:**

- **Static Application Security Testing (SAST)**: Detecting vulnerabilities in source code across 10+ programming languages
- **Software Composition Analysis (SCA)**: Identifying vulnerabilities in open-source dependencies and libraries
- **Infrastructure as Code (IaC) Security**: Auditing cloud and container configurations
- **Container Security**: Scanning container images and Dockerfiles for vulnerabilities
- **Business Logic Security Analysis (BLSA)**: AI-driven detection of design flaws (in development)

**AI-Powered Capabilities:**

- **Cybe Analysis**: Autonomous AI agent that eliminates false positives and provides expert-level security insights
- **Cybe AutoFix**: Context-aware automatic vulnerability remediation with pull request generation
- **Cybe Security Champion**: 24/7 AI security expert providing instant guidance through interactive chat

**Platform Features:**

- Multi-region deployment (Europe and United States) with sovereign cloud compliance
- Role-based and relationship-based access control (RBAC/ReBAC)
- Organization and team management with granular permissions
- Comprehensive API for automation and integration
- Real-time vulnerability tracking and management
- Historical trend analysis and reporting

**Integration Ecosystem:**

- Version control systems (GitHub, GitLab)
- CI/CD platforms (Jenkins, GitLab CI, GitHub Actions, CircleCI, Azure DevOps, and more)
- IDEs (VS Code, JetBrains suite)
- Container registries (Docker Hub, ECR, ACR, GCR, Quay, GitLab Registry, GitHub Registry)
- Model Context Protocol (MCP) for AI coding assistants

The platform is designed to be scalable, modular, and highly integrated, supporting organizations from individual developers to large enterprises with unlimited projects and flexible usage-based pricing.

---


# 2. System Overview

## 2.1 General Description

CybeDefend is a comprehensive application security platform delivered as a SaaS solution, providing advanced analysis tools to detect, remediate, and manage vulnerabilities across applications, APIs, containers, and infrastructure as code. The platform is built on a scalable microservices architecture deployed across sovereign cloud infrastructure in two regions: Europe and the United States.

**Core Architecture:**

The platform leverages a modular microservices architecture orchestrated through Kubernetes, ensuring:

- **Scalability**: Dynamic resource allocation based on scanning workload
- **Isolation**: Each scan runs in isolated containers for security
- **Resilience**: Distributed services with failover capabilities
- **Performance**: Optimized for concurrent multi-project scanning

**Unified Security Engine:**

The CybeDefend Engine aggregates and cross-references results from multiple open-source and proprietary scanners, including:

- Semgrep and custom rules for SAST
- Opengrep for multi-language support
- Trivy, Checkov, and KICS for IaC and container analysis
- GitHub Advisories for SCA vulnerability data

This unified approach minimizes duplicate findings, reduces noise, and provides a single, coherent view of security posture.

**AI-Powered Intelligence:**

Proprietary knowledge graph technology parses codebases to create deep contextual understanding, enabling:

- **Zero-Hallucination Analysis**: AI operates on actual code stored in sovereign cloud
- **Context-Aware Remediation**: Fixes consider entire application architecture
- **Intelligent Triage**: Automatic priority assignment based on exploitability and impact
- **Expert-Level Insights**: 24/7 access to senior security expertise through AI agents

**Data Sovereignty:**

- **European Cloud**: SecNumCloud certified, GDPR compliant, data never leaves EU
- **US Cloud**: SOC 2, HIPAA, PCI-DSS compliant, optimized for North American latency
- **No Training on User Data**: Strict zero-training policy ensures complete confidentiality

## 2.2 Target Users

The CybeDefend platform is designed for multiple user personas across the software development lifecycle:

**1. Developers**

- **Primary Goal**: Write secure code without slowing down development velocity
- **Platform Benefits**:
  - Real-time security feedback in IDE (VS Code, JetBrains)
  - AI-powered fix suggestions with one-click remediation
  - Security Champion chatbot for instant guidance
  - Automated scanning in CI/CD pipelines
- **Key Features Used**: SAST, SCA, Cybe AutoFix, Cybe Security Champion, IDE integrations

**2. DevOps Teams**

- **Primary Goal**: Secure infrastructure and automate security in deployment pipelines
- **Platform Benefits**:
  - IaC security scanning for Terraform, Kubernetes, Docker
  - Container image vulnerability detection
  - CI/CD integration for automated security gates
  - Infrastructure-wide visibility across multiple projects
- **Key Features Used**: IaC scanning, Container Security, CI/CD integrations, CLI tool

**3. Security Teams / Analysts**

- **Primary Goal**: Identify, prioritize, and coordinate remediation of vulnerabilities
- **Platform Benefits**:
  - Unified dashboard for all security findings
  - AI-powered false positive elimination (up to 90% reduction)
  - Advanced filtering and prioritization
  - Collaboration tools and vulnerability status tracking
- **Key Features Used**: Cybe Analysis, vulnerability management, reporting, team collaboration

**4. Chief Information Security Officers (CISO) / Security Managers**

- **Primary Goal**: Maintain organizational security posture and compliance
- **Platform Benefits**:
  - Executive dashboard with trend analysis
  - Compliance reporting (OWASP Top 10, GDPR, PCI-DSS)
  - Organization-wide visibility across teams and projects
  - Historical tracking and improvement metrics
- **Key Features Used**: Global project management, analytics, reporting, role management

**5. Engineering Managers / Team Leads**

- **Primary Goal**: Balance security requirements with development velocity
- **Platform Benefits**:
  - Team-level visibility into security debt
  - Sprint planning integration with vulnerability priorities
  - Developer productivity insights
  - Security trend tracking per team
- **Key Features Used**: Team management, project oversight, priority assignment

## 2.3 Key Features

**Security Analysis Capabilities**

**1. Static Application Security Testing (SAST)**

- Detection of vulnerabilities in source code before runtime
- Supported languages: Python, Java, JavaScript/TypeScript, Go, PHP, Ruby, C/C++, C#, Rust, and more
- AI-assisted remediation via pull/merge requests
- Proprietary knowledge graph for dataflow analysis
- Integration of multiple scanning engines (CybeDefend Engine + Opengrep)

**2. Software Composition Analysis (SCA)**

- Identification of vulnerabilities in open-source libraries and dependencies
- Coverage of major package managers:
  - Node.js: npm, yarn, pnpm, bun, deno
  - Java/Kotlin/Scala: Maven, Gradle
  - Python: pip, poetry, pipenv
  - PHP: Composer
  - Ruby: Bundler
  - Go: go modules
  - .NET: NuGet
  - Rust: Cargo
  - And many more...
- GitHub Advisories integration for vulnerability intelligence
- Lockfile-based scanning for accurate dependency resolution

**3. Infrastructure as Code (IaC) Security**

- Auditing of cloud and container configurations
- Supported technologies:
  - Terraform, CloudFormation, AWS CDK, Azure RM
  - Kubernetes, Helm charts
  - Dockerfiles, Docker Compose
  - OpenAPI/Swagger specifications
  - Serverless (AWS Lambda, Azure Functions)
- Multiple scanning engines (Checkov, KICS, Trivy)
- Configuration best practice enforcement

**4. Container Security**

- **Container Image Scanning**:
  - Layer-by-layer vulnerability analysis
  - Base image security assessment
  - Package vulnerability detection
  - Integration with major registries (Docker Hub, ECR, ACR, GCR, Quay, GitHub, GitLab)
- **Dockerfile Security Scanning**:
  - Automatic detection during code scans
  - Best practice validation
  - Privilege escalation detection
  - Secrets exposure identification

**5. Business Logic Security Analysis (BLSA)** *(In Development)*

- AI-driven detection of design flaws and business logic vulnerabilities
- Holistic application architecture analysis
- Insecure-by-design pattern identification
- Contextual understanding of application flows
- Complements traditional scanning methodologies

**AI-Powered Agent Features**

**1. Cybe Analysis**

- Autonomous AI agent with senior-level security expertise
- Proprietary knowledge graph for complete codebase understanding
- Up to 90% false positive reduction
- Intelligent vulnerability prioritization
- Detailed contextual analysis for each finding
- Exploitability assessment based on actual code usage

**2. Cybe AutoFix**

- Context-aware automatic vulnerability remediation
- Multi-file coherent fixes across entire codebase
- Production-ready code generation following project patterns
- Automatic pull/merge request creation (GitHub, GitLab)
- Regression prevention through knowledge graph analysis
- Developer-friendly explanations and documentation

**3. Cybe Security Champion**

- 24/7 AI security expert accessible via chat
- Interactive consultation on vulnerabilities and codebase
- Project-specific security guidance
- Proactive security education for developers
- Natural language queries about security posture
- Zero hallucinations through stored code context

**Platform Capabilities**

**1. Access Control & Organization Management**

- OAuth2 authentication (Google, Microsoft, GitHub, GitLab)
- Hierarchical organization and team structure
- Role-Based Access Control (RBAC) with 4 organization roles
- Relationship-Based Access Control (ReBAC) with 4 team roles
- Granular permissions for projects and features
- Open-source ReBAC library (react-rebac)

**2. Integration Ecosystem**

- **Version Control**: GitHub, GitLab (SaaS and self-managed)
- **CI/CD**: Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure DevOps, Bamboo, TeamCity, Bitbucket Pipelines
- **IDEs**: VS Code, JetBrains suite (IntelliJ, PyCharm, WebStorm, etc.)
- **Container Registries**: Docker Hub, Amazon ECR, Azure ACR, Google GCR, Red Hat Quay, GitHub Container Registry, GitLab Container Registry
- **MCP Server**: Integration with AI coding assistants (Cursor, Claude, Windsurf, Copilot Chat)
- **CLI Tool**: Cross-platform command-line interface for local and CI scanning

**3. Vulnerability Management**

- Unified dashboard for all security findings
- Multiple status tracking (To Verify, Confirmed, Not Exploitable, Resolved, etc.)
- Risk level assignment (Critical, High, Medium, Low)
- Priority management (Critical Urgent, Urgent, Normal, Low, Very Low)
- Comment system for team collaboration
- Complete vulnerability history and re-detection tracking
- Filtering by scanner type, severity, status, priority

**4. Project & Scan Management**

- Unlimited projects per organization
- Multiple scanning methods:
  - Repository connection (GitHub, GitLab)
  - ZIP file upload
  - CLI-based scanning
  - IDE-triggered scans
- Configurable scan parameters:
  - Scanner type selection (SAST, SCA, IaC, Container)
  - Severity level filtering
  - AI feature toggle (Analysis, AutoFix, Security Champion)
- Scan status tracking and progress monitoring

**5. Reporting & Analytics**

- Global organization dashboard with high-risk project identification
- Project-specific vulnerability lists with advanced filtering
- Historical trend analysis and improvement tracking
- Vulnerability breakdown by severity, scanner type, and status
- OWASP Top 10 compliance reporting
- Export capabilities (JSON, HTML, SARIF formats)

**6. Billing & Subscription**

- Flexible usage-based pricing model
- Organization-level credit pooling for AI features
- Per-seat subscription with unlimited projects
- Add-on credit packs for extended AI usage
- Monthly and yearly billing cycles
- Real-time usage tracking and quota monitoring
- Automatic credit reset on billing cycle

**7. Data Privacy & Compliance**

- Sovereign cloud deployment (Europe / United States)
- Zero code storage for standard scanning (temporary container-based)
- Sovereign code storage for AI features (EU or US based on region)
- Zero-training policy on user data
- GDPR, SecNumCloud, SOC 2, HIPAA, PCI-DSS compliance
- Complete data transparency and deletion capabilities

**8. Model Context Protocol (MCP) Integration**

- Open-source MCP server for AI coding assistants
- Direct vulnerability access from IDE through LLM
- Project-specific security context for AI assistants
- Automatic tool provisioning for supported clients
- Real-time scan status and result retrieval

---


# 3. Detailed Functional Specifications

## 3.1 User and Role Management

CybeDefend implements a sophisticated hierarchical access control system combining Role-Based Access Control (RBAC) and Relationship-Based Access Control (ReBAC) to provide granular permissions across organizations and teams.

**Organizational Hierarchy**

The platform is structured around three levels:

1. **Organization**: The top-level entity grouping all activities, teams, and projects
2. **Teams**: Organizational units within an organization that group projects and users
3. **Projects**: Individual codebases or applications being secured

**Organization Roles**

Each organization member is assigned one of four roles:

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Administrator** | Top-level authority with full control over the organization | <ul><li>Manage organization settings</li><li>Add/remove users</li><li>Update user roles (except other Admins)</li><li>Create/delete teams</li><li>Access all projects without team membership</li><li>View logs and audit trails</li><li>Full billing access</li></ul> |
| **Manager** | High-level authority for team and user management | <ul><li>Manage integrations (GitHub, GitLab, etc.)</li><li>Add/remove organization users</li><li>Create teams</li><li>View organization logs</li><li>Limited billing visibility</li></ul> |
| **Billing Manager** | Financial and subscription management focus | <ul><li>Access billing settings and invoices</li><li>Manage subscription and add-ons</li><li>View AI usage tracking</li><li>Read organization information</li><li>No access to projects or security data</li></ul> |
| **Member** | Standard organization member with basic access | <ul><li>View organization information</li><li>Access assigned teams and projects</li><li>Use granted tools and features</li></ul> |

**Team Roles**

Within teams, users can be assigned one of four roles that define their capabilities across all team projects:

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Team Manager** | Team leader with full project and member control | <ul><li>Manage team settings</li><li>Add/remove team members</li><li>Update member roles (except other Team Managers)</li><li>Create projects</li><li>Configure project settings</li><li>Start scans</li><li>View logs</li><li>Full access to scan results</li></ul> |
| **Analyst Developer** | Security-focused developer with analysis capabilities | <ul><li>Create and view reports</li><li>Change vulnerability states and priorities</li><li>Add comments to vulnerabilities</li><li>Start scans</li><li>Full read access to scan results</li><li>Use Cybe Security Champion</li></ul> |
| **Developer** | Standard developer with code scanning access | <ul><li>View scan results</li><li>Change vulnerability states</li><li>Start scans</li><li>Use IDE integrations</li><li>Limited reporting capabilities</li></ul> |
| **Read Only** | View-only access for auditors or stakeholders | <ul><li>View team details</li><li>View project information</li><li>View scan results (read-only)</li><li>No modification rights</li></ul> |

**Key Role Management Rules**

1. **Administrator Constraints**:
   - Cannot modify their own role
   - Cannot modify another Administrator's role
   - At least one Administrator must exist per organization

2. **Team Manager Constraints**:
   - Cannot modify their own role
   - Cannot modify another Team Manager's role
   - At least one Team Manager must exist per team

3. **Role Inheritance**:
   - Organization roles provide base permissions
   - Team roles add specific capabilities within team context
   - Users can have different roles in different teams

4. **Access Model**:
   - Roles apply to ALL projects within a team (no per-project segmentation)
   - For granular project access, create separate teams
   - Administrators have implicit access to all projects organization-wide

**Relationship-Based Access Control (ReBAC)**

CybeDefend leverages ReBAC to manage complex relationships:

- Users can belong to multiple organizations with different roles
- Users can be members of multiple teams within an organization
- Permissions are evaluated based on user-entity relationships
- Dynamic access rules adapt to organizational changes

The platform includes an open-source library (`react-rebac`) for implementing relationship-based access control in React applications, demonstrating CybeDefend's commitment to community and transparency.

## 3.2 Authentication and Access Control

**OAuth2 Authentication**

CybeDefend implements modern OAuth2-based authentication supporting multiple identity providers:

**Supported Providers:**

- **Google**: OAuth2 integration with Google accounts
- **Microsoft**: Azure AD and Microsoft account support
- **GitHub**: Direct GitHub OAuth for seamless developer experience
- **GitLab**: GitLab OAuth for integrated workflows

**Authentication Flow:**

1. User initiates login via preferred OAuth provider
2. Secure redirection to provider's authorization server
3. User grants permissions
4. Provider returns authorization code
5. CybeDefend exchanges code for access token
6. User session established with organization context

**Security Features:**

- No password storage - delegated to trusted providers
- Token-based session management
- Automatic token refresh
- Secure token storage
- Session timeout and revocation capabilities

**API Authentication**

For programmatic access:

**API Keys:**

- Generated from user profile settings
- Scoped to organization level
- Used for CLI, CI/CD integrations, and API calls
- Can be revoked and regenerated
- Support for multiple API keys per user

**Usage:**

```bash
# CLI authentication
cybedefend scan --dir . --api-key YOUR_API_KEY

# API header authentication
Authorization: Bearer YOUR_API_KEY
```

**Region Selection**

During account creation, users select their cloud region:

- **Europe**: `https://api-eu.cybedefend.com` - GDPR compliant, SecNumCloud certified
- **United States**: `https://api-us.cybedefend.com` - SOC 2, HIPAA compliant

This selection binds IAM/Gateway endpoints at runtime and determines data residency for all organization activities.

## 3.3 Scan Configuration and Execution

**Scan Configuration Options**

CybeDefend provides flexible scan configuration through project settings:

**Scanner Type Selection**

Users can enable/disable specific scanner types based on project needs:

- **SAST (Static Application Security Testing)**: Source code vulnerability detection
- **SCA (Software Composition Analysis)**: Dependency and library vulnerability detection
- **IaC (Infrastructure as Code)**: Configuration and infrastructure security
- **Container**: Docker image and Dockerfile security scanning

Each scanner can be independently toggled, allowing focused analysis on relevant security aspects.

**Severity Level Filtering**

Configure which vulnerability severity levels to include in scan results:

- **Critical**: Immediate security risks requiring urgent action
- **High**: Serious vulnerabilities that should be prioritized
- **Medium**: Moderate security issues to address
- **Low**: Minor vulnerabilities or potential improvements

Unchecked severity levels are filtered from results, enabling teams to focus on their security priorities.

**AI Feature Configuration**

**1. Cybe Analysis**

When enabled:

- Parses entire codebase into proprietary knowledge graph
- Analyzes vulnerabilities with full context
- Eliminates false positives (up to 90% reduction)
- Adds expert-level comments to findings
- Assigns priority levels based on exploitability

Configuration options:

- Enable/disable per project
- Select specific SAST vulnerability groups to analyze:
  - SQL Injection
  - LDAP Injection
  - Cross-Site Scripting (XSS)
  - Path Traversal
  - Command Injection
  - XML External Entity (XXE)
  - Server-Side Request Forgery (SSRF)
  - And more...

**Requirements**: Code is stored in sovereign cloud for knowledge graph construction

**2. Cybe AutoFix**

When enabled:

- Generates context-aware fixes for confirmed vulnerabilities
- Creates pull/merge requests in connected repositories
- Maintains code quality and architectural patterns
- Handles multi-file coherent modifications

**Requirements**:

- Cybe Analysis must be enabled (for knowledge graph)
- Project must be linked to GitHub or GitLab
- Repository write permissions required

**3. Cybe Security Champion**

When enabled:

- Provides 24/7 AI security expert via chat interface
- Interactive vulnerability consultation
- Project-specific security guidance
- Codebase-aware responses with zero hallucinations

**Requirements**:

- Cybe Analysis must be enabled (for code parsing)
- Code stored in sovereign cloud for context

**Scan Execution Methods**

CybeDefend supports multiple scan triggering methods:

**1. Repository Connection (Recommended)**

- **Automatic Scanning**: Triggered on commits/pull requests
- **Scheduled Scanning**: Not available in current version (future roadmap)
- **Manual Scanning**: On-demand via dashboard
- **Supported Platforms**: GitHub, GitLab (SaaS and self-managed)

**2. ZIP File Upload**

- Manual upload through web interface
- Suitable for offline or disconnected environments
- One-time scanning without repository integration
- All scanner types supported

**3. CLI-Based Scanning**

- Cross-platform command-line tool (Windows, macOS, Linux)
- Local directory scanning
- CI/CD pipeline integration
- Supports all scanner types

**CLI Commands:**

```bash
# Start scan
cybedefend scan --dir . --project-id PROJECT_ID

# Check results
cybedefend results --project-id PROJECT_ID --output json

# CI-friendly mode
cybedefend scan --dir . --ci --break-on-severity critical
```

**4. IDE Integration**

- **VS Code Extension**: Scan from editor with one click
- **JetBrains Plugin**: IntelliJ, PyCharm, WebStorm, etc.
- Real-time results in IDE panels
- Direct navigation to vulnerable code

**5. CI/CD Integration**

Supported platforms:

- GitHub Actions (official action available)
- GitLab CI
- Jenkins
- CircleCI
- Azure DevOps
- Bamboo
- TeamCity
- Bitbucket Pipelines

Integration methods:

- Docker-based execution
- CLI installation in pipeline
- Webhook triggers
- API-based automation

**Scan Parameters**

Additional scan configuration options:

**Break Conditions** (CLI/CI):

- `--break-on-fail`: Exit with error if scan fails
- `--break-on-severity <level>`: Exit with error if vulnerabilities of specified severity found
- `--wait`: Wait for scan completion before returning

**Output Formats:**

- JSON: Machine-readable results
- SARIF: Standard format for security findings
- HTML: Human-readable reports

**Region Selection:**

```bash
# Select region via CLI
cybedefend scan --region eu  # Europe
cybedefend scan --region us  # United States

# Or specify API URL directly
cybedefend scan --api-url https://api-eu.cybedefend.com
```

**Scan Lifecycle**

1. **Initiation**: Scan triggered via one of the methods above
2. **Container Creation**: Isolated Docker container spun up in Kubernetes cluster
3. **Code Retrieval**: Source code cloned or uploaded to container
4. **Analysis Execution**: Selected scanners run in parallel
5. **Result Processing**: Findings sent to CybeDefend Gateway in batches of 50
6. **Knowledge Graph Construction** (if Cybe Analysis enabled): Code parsed and stored
7. **AI Analysis** (if enabled): Cybe Analysis reviews findings
8. **Container Cleanup**: Scan container terminated, temporary code deleted
9. **Result Availability**: Findings visible in dashboard, accessible via API

**Performance Characteristics:**

- Scan duration varies by project size and selected scanners
- Multiple projects can be scanned concurrently
- Resource allocation scales dynamically via Kubernetes
- Results stream in real-time as scanning progresses

## 3.4 Integration of Analysis Tools

**CybeDefend Engine Architecture**

CybeDefend utilizes a multi-layered security approach combining multiple open-source scanners with proprietary correlation and deduplication:

**Scanner Integration Layer:**

```
┌─────────────────────────────────────────────────────┐
│           CybeDefend Engine (Aggregation)          │
│  • Result correlation and deduplication            │
│  • Vulnerability matching and grouping             │
│  • Severity normalization                          │
│  • OWASP Top 10 mapping                            │
└─────────────────────────────────────────────────────┘
                         ▲
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼───┐      ┌────▼────┐      ┌───▼────┐
    │ SAST  │      │   IaC   │      │  SCA   │
    │ Tools │      │  Tools  │      │ Tools  │
    └───────┘      └─────────┘      └────────┘
```

**1. SAST (Static Application Security Testing)**

**Primary Scanner Integration:**

- **CybeDefend Custom Rules**: Proprietary vulnerability detection rules
- **Opengrep**: Open-source multi-language static analysis
- **Semgrep**: Pattern-based code analysis (deprecated in favor of Opengrep)

**Supported Languages:**

| Language | Scanner | Coverage |
|----------|---------|----------|
| Python | CybeDefend Engine + Opengrep | Full OWASP Top 10, framework-specific (Django, Flask) |
| Java | CybeDefend Engine + Opengrep | Spring, JEE, Android patterns |
| JavaScript/TypeScript | CybeDefend Engine + Opengrep | Node.js, React, Angular, Vue |
| Go | CybeDefend Engine + Opengrep | Standard library, web frameworks |
| PHP | CybeDefend Engine + Opengrep | Laravel, Symfony, WordPress |
| Ruby | CybeDefend Engine + Opengrep | Rails, Sinatra patterns |
| C/C++ | CybeDefend Engine + Opengrep | Memory safety, buffer overflows |
| C# | CybeDefend Engine + Opengrep | .NET Framework, .NET Core |
| Rust | CybeDefend Engine + Opengrep | Unsafe blocks, common pitfalls |
| Kotlin | CybeDefend Engine + Opengrep | Android, Spring Boot |
| Scala | CybeDefend Engine + Opengrep | Play Framework, Akka |
| Swift | CybeDefend Engine + Opengrep | iOS security patterns |

**Detection Categories:**

- Injection flaws (SQL, LDAP, OS Command, XXE)
- Authentication and session management issues
- Cross-Site Scripting (XSS)
- Insecure deserialization
- Security misconfigurations
- Sensitive data exposure
- Path traversal
- Server-Side Request Forgery (SSRF)
- Cryptographic failures
- And 100+ additional vulnerability types

**Dataflow Analysis** (with Cybe Analysis enabled):

- Variable tracking across files and functions
- Taint propagation from user input to sinks
- Control flow graph construction
- Path-sensitive analysis
- Context-aware vulnerability confirmation

**2. Infrastructure as Code (IaC) Security**

**Scanner Integration:**

- **CybeDefend Engine**: Result aggregation and intelligent matching
- **Checkov**: Policy-as-code framework
- **KICS**: Keeping Infrastructure as Code Secure
- **Trivy**: Comprehensive IaC scanner

**Supported Technologies:**

| Category | Technologies | Scanners |
|----------|-------------|----------|
| **Cloud IaC** | Terraform, CloudFormation, AWS CDK, Azure RM, Pulumi | Checkov, KICS, Trivy |
| **Container** | Dockerfiles, Docker Compose, Kubernetes manifests, Helm | KICS, Trivy |
| **Serverless** | AWS Lambda, Azure Functions, Google Cloud Functions | Checkov, KICS |
| **API Definitions** | OpenAPI/Swagger (JSON, YAML), gRPC (.proto) | KICS |

**Detection Categories:**

- Cloud resource misconfigurations
- Insecure network policies
- IAM permission issues
- Unencrypted data stores
- Public exposure risks
- Compliance violations (CIS benchmarks)
- Container security best practices
- Kubernetes security policies

**Notable Difference from SAST:**

- IaC scanning does NOT provide line-level dataflow analysis (AI Mode focus is on SAST)
- CybeDefend Engine handles intelligent vulnerability matching and deduplication
- Best practice validation rather than code-path analysis

**3. Software Composition Analysis (SCA)**

**Scanner Integration:**

- **CybeDefend Engine**: Dependency resolution and vulnerability matching
- **GitHub Advisories**: Primary vulnerability intelligence source
- **Lockfile Analysis**: Precise dependency version identification

**Supported Package Managers and Files:**

| Ecosystem | Lock Files | Manifest Files | Supported |
|-----------|-----------|----------------|-----------|
| **Node.js** | package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lock | package.json | ✅ |
| **Python** | poetry.lock, Pipfile.lock | requirements.txt, pyproject.toml, Pipfile | ✅ |
| **Java** | gradle.lockfile | pom.xml, build.gradle | ✅ |
| **PHP** | composer.lock | composer.json | ✅ |
| **Ruby** | Gemfile.lock | Gemfile | ✅ |
| **Go** | go.sum | go.mod | ✅ |
| **.NET** | packages.lock.json | *.csproj, *.nuspec, packages.config | ✅ |
| **Rust** | Cargo.lock | Cargo.toml | ✅ |
| **Swift** | Package.resolved, Podfile.lock | Package.swift, Podfile | ✅ |
| **Elixir** | mix.lock | mix.exs | ✅ |
| **Erlang** | rebar.lock | rebar.config | ✅ |
| **Dart** | pubspec.lock | pubspec.yaml | ✅ |
| **C/C++** | conan.lock | conanfile.py, CMakeLists.txt | ✅ |
| **Scala** | .sbt.lock | build.sbt | ✅ |

**Lockfile Importance:**

Lockfiles provide exact dependency versions, enabling:

- Accurate CVE matching
- Transitive dependency analysis
- Reproducible scan results
- Version-specific remediation guidance

**Detection Process:**

1. Parse manifest and lockfiles
2. Build complete dependency tree
3. Match versions against GitHub Advisories database
4. Identify direct and transitive vulnerabilities
5. Provide upgrade recommendations

**4. Container Security**

**A. Container Image Scanning**

**Scanner Integration:**

- **Trivy**: Comprehensive container scanner
- **CybeDefend Engine**: Result aggregation

**Scanning Capabilities:**

- **Layer-by-Layer Analysis**: Identify which layer introduced vulnerabilities
- **OS Package Vulnerabilities**: Detect CVEs in base image packages
- **Application Dependencies**: Scan packages installed in container
- **Secret Detection**: Find exposed credentials and API keys
- **Configuration Analysis**: Validate container security settings

**Registry Integrations:**

| Registry | Authentication | Features |
|----------|---------------|----------|
| **Docker Hub** | Public access / Docker credentials | Pull and scan any public image |
| **Amazon ECR** | AWS IAM credentials | Private repository access, cross-region |
| **Azure ACR** | Service Principal | Managed identity support, geo-replication |
| **Google GCR** | Service Account JSON | Multi-region, Artifact Registry support |
| **GitHub GHCR** | Personal Access Token | Organization package support |
| **GitLab Registry** | Personal Access Token | SaaS and self-managed |
| **Red Hat Quay** | Robot Account / OAuth2 | Public and private repositories |

**Image Sources:**

- Pull from public registries (no authentication)
- Connect private registries with credentials
- Scan images built in CI/CD pipelines
- Integration with container orchestration platforms

**B. Dockerfile Security Scanning**

**Automatic Integration:**

- Detected during regular code scanning
- No additional configuration required
- Results appear alongside SAST/IaC findings

**Detection Categories:**

- **Vulnerable Base Images**: Outdated or CVE-affected base images
- **Secrets Exposure**: Hard-coded passwords, API keys
- **Privilege Escalation**: Running as root, unnecessary privileges
- **Network Security**: Exposed ports, insecure configurations
- **Best Practice Violations**: Missing health checks, inefficient layers
- **Configuration Issues**: Insecure defaults, missing security headers

**5. Business Logic Security Analysis (BLSA)** *(In Development)*

**Innovative AI-Driven Approach:**

BLSA represents CybeDefend's next-generation security analysis, using AI agents to detect design flaws that traditional scanners miss.

**Key Capabilities** (Planned):

- **Holistic Architecture Analysis**: Understanding application design patterns
- **Business Flow Comprehension**: Identifying insecure-by-design implementations
- **Contextual Vulnerability Detection**: Finding logic flaws in payment, authentication, authorization flows
- **AI Agent Collaboration**: Multiple specialized agents analyzing different aspects
- **Split Prompting**: Handling large codebases through intelligent chunking

**Current Status:**

- Under active development
- Early preview releases planned for select users
- Public roadmap available at https://cybedefend.featurebase.app/roadmap

**Unified Result Processing**

**CybeDefend Engine Responsibilities:**

1. **Result Collection**: Receive findings from all scanners
2. **Normalization**: Standardize severity, categories, descriptions
3. **Deduplication**: Eliminate duplicate findings across scanners
4. **Correlation**: Group related vulnerabilities
5. **OWASP Mapping**: Categorize findings to OWASP Top 10
6. **Enrichment**: Add remediation guidance, CWE references, CVSS scores

**Batch Processing:**

- Results sent to Gateway in batches of 50
- Real-time streaming to dashboard
- Efficient database insertion
- Parallel processing for performance

**Knowledge Graph Construction** (Cybe Analysis):

When AI features enabled:

1. Parse source code into Abstract Syntax Tree (AST)
2. Extract symbols, functions, classes, variables
3. Map relationships and dependencies
4. Identify dataflows from sources to sinks
5. Store in proprietary knowledge graph format
6. Enable AI agent tools for querying and analysis

This knowledge graph enables zero-hallucination AI analysis with complete code context.

## 3.5 AI Agent Integration

CybeDefend's AI agents represent a revolutionary approach to application security, leveraging proprietary knowledge graph technology to provide context-aware, expert-level security analysis and remediation.

**Proprietary Knowledge Graph Technology**

**Foundation of AI Capabilities:**

When AI features are enabled, CybeDefend parses the entire codebase into a sophisticated knowledge graph that captures:

- **Code Structure**: Classes, functions, methods, variables
- **Relationships**: Dependencies, inheritance, composition
- **Dataflows**: Path from user inputs (sources) to sensitive operations (sinks)
- **Business Logic**: Application-specific patterns and workflows
- **Security Context**: Vulnerability locations and impact scope

**Key Benefits:**

- **Zero Hallucinations**: AI operates on actual parsed code, not assumptions
- **Complete Context**: Understanding spans entire application, not isolated files
- **Accurate Analysis**: Precise dataflow tracking enables exploitability assessment
- **Intelligent Fixes**: Remediation considers full application architecture

**Data Storage:**

- Code stored in selected sovereign cloud (EU or US)
- Encrypted at rest and in transit
- Never used for model training
- Can be deleted by disabling AI features

**1. Cybe Analysis - AI-Powered Vulnerability Analysis**

**Core Capabilities:**

**A. False Positive Elimination**

- **Achievement**: Up to 90% reduction in false positives
- **Methodology**:
  - Dataflow analysis to verify exploitability
  - Context evaluation of vulnerability impact
  - Business logic understanding
  - Sanitization and validation detection
  
**Example Process:**

```
Traditional Scanner: "SQL Injection detected at line 45"
↓
Cybe Analysis Evaluation:
1. Trace dataflow from user input to database query
2. Check for sanitization/validation along path
3. Verify if SQL query is actually user-influenced
4. Assess real exploitability in application context
↓
Result: "False Positive - Input properly validated before query"
```

**B. Expert-Level Commentary**

For each confirmed vulnerability, Cybe Analysis provides:

- **Detailed Explanation**: What the vulnerability is and why it exists
- **Exploitability Assessment**: How it could be exploited in this specific codebase
- **Business Impact**: Potential consequences if exploited
- **Contextual Factors**: Why traditional scanners flagged it
- **Remediation Guidance**: Specific steps to fix in this context

**C. Intelligent Priority Assignment**

When vulnerability triage enabled:

**Priority Levels:**

- **Critical Urgent**: Combination of high risk and easy exploitability, requires immediate action
- **Urgent**: High risk with notable exploitability, should be prioritized
- **Normal**: Moderate risk/exploitability, can be addressed in regular cycles
- **Low**: Lower risk or difficult exploitability
- **Very Low**: Theoretical vulnerabilities with minimal real-world risk

**Prioritization Factors:**

- CVSS score and severity
- Dataflow analysis results
- Exposure to external inputs
- Sensitivity of affected data
- Existing security controls
- Business logic context

**D. Selective Vulnerability Group Analysis**

For SAST scanning, users can select specific vulnerability groups:

- SQL Injection
- LDAP Injection  
- Cross-Site Scripting (XSS)
- Path Traversal
- Command Injection
- XML External Entity (XXE)
- Server-Side Request Forgery (SSRF)
- Insecure Deserialization
- Authentication/Authorization issues
- Cryptographic failures
- And more...

**Why Selective?**

- Focus on vulnerabilities relevant to application
- Optimize AI usage credits
- Reduce analysis time for large codebases

**Configuration Requirements:**

- Must be enabled in project settings
- Requires code parsing (automatic when enabled)
- Uses Cybe Analysis credits from subscription
- Code stored in sovereign cloud for knowledge graph

**2. Cybe AutoFix - Context-Aware Automatic Remediation**

**Revolutionary Approach:**

Unlike traditional autofix tools that apply generic patches, Cybe AutoFix understands the full context of your application through the knowledge graph.

**Core Capabilities:**

**A. Context-Aware Code Generation**

**Analysis Before Fixing:**

1. **Root Cause Identification**: Understand why vulnerability exists
2. **Architecture Comprehension**: Know how fix impacts system
3. **Pattern Recognition**: Follow project's coding standards
4. **Dependency Analysis**: Consider impact on other components

**Generated Fixes:**

- Production-ready code
- Maintains code quality
- Follows existing patterns
- Preserves business logic
- Handles edge cases

**B. Multi-File Coherent Modifications**

When vulnerabilities span multiple files:

- Orchestrate synchronized changes across codebase
- Ensure all related components updated consistently
- Maintain API contracts and interfaces
- Update tests if applicable

**Example:**

```
Vulnerability: SQL Injection in user authentication
Files requiring changes:
1. auth_controller.py - Update query construction
2. user_model.py - Add input validation
3. database_utils.py - Implement prepared statements
↓
Cybe AutoFix generates coherent changes across all three files
maintaining consistency and architectural patterns
```

**C. Automated Pull/Merge Request Generation**

**Supported Platforms:**

- GitHub (public and private repositories)
- GitLab (SaaS and self-managed instances)

**Pull Request Contents:**

- **Title**: Clear description of vulnerability fixed
- **Description**: 
  - Vulnerability explanation
  - Exploitation scenario
  - Fix approach and reasoning
  - Testing recommendations
- **Code Changes**: All necessary file modifications
- **Labels**: Automatic tagging (security, high-priority, etc.)

**D. Regression Prevention**

Through knowledge graph analysis:

- Verify fix doesn't introduce new vulnerabilities
- Check for unintended side effects
- Validate business logic preservation
- Ensure tests remain passing

**Workflow:**

1. User navigates to confirmed vulnerability
2. Clicks "Generate Fix" button
3. Cybe AutoFix analyzes using knowledge graph
4. Generates context-aware remediation
5. Creates pull/merge request in repository
6. Development team reviews and merges
7. Vulnerability marked as resolved

**Configuration Requirements:**

- Cybe Analysis must be enabled (for knowledge graph)
- Project must be linked to GitHub or GitLab
- Repository write permissions required
- Uses Cybe AutoFix credits from subscription

**3. Cybe Security Champion - 24/7 AI Security Expert**

**Reimagining the Security Champion Role:**

Traditional Security Champions face limitations:

- **Limited Availability**: One expert serving multiple teams
- **Knowledge Bottlenecks**: Development blocked when unavailable
- **Scaling Challenges**: Can't maintain recommended ratios
- **Timezone Gaps**: Not available 24/7

**Cybe Security Champion Solution:**

Every developer gets their own AI security expert with:

- **24/7 Availability**: Always ready to help
- **Instant Responses**: No waiting in queue
- **Unlimited Capacity**: Serves all developers simultaneously
- **Consistent Expertise**: Same quality guidance for everyone

**Core Capabilities:**

**A. Interactive Vulnerability Consultation**

**Chat with Vulnerabilities:**

Click chat icon on any vulnerability to:

- **Understand Exploitation**: "How can this XSS be exploited in our application?"
- **Assess Impact**: "What's the business impact if this is exploited?"
- **Explore Dataflow**: "Show me the path from user input to this vulnerability"
- **Learn Prevention**: "How do I prevent this type of issue in future code?"

**Contextual Understanding:**

- Knows exact code where vulnerability exists
- Understands surrounding business logic
- Aware of existing security controls
- Provides project-specific guidance

**B. General Codebase Consultation**

**Chat with Your Codebase:**

Open general Cybe Security Champion chat to:

- **Security Posture Questions**: "Where do we validate user input in the auth flow?"
- **Pattern Discovery**: "Show me all database queries using user-supplied data"
- **Best Practice Guidance**: "What security best practices for our payment module?"
- **Architecture Review**: "Are there any security concerns with our current API design?"

**C. Proactive Security Education**

Every interaction teaches:

- **Root Cause Understanding**: Why vulnerabilities occur
- **Prevention Techniques**: How to avoid them
- **Security Principles**: Building security knowledge
- **Project-Specific Wisdom**: Learning from your codebase

**D. Project-Specific Intelligence**

Unlike generic security advice:

- **Architecture-Aware**: Understands your system design
- **Stack-Specific**: Knows your technologies and frameworks
- **Dependency-Conscious**: Aware of your third-party libraries
- **Business Logic-Informed**: Comprehends your application domain

**Privacy and Security:**

**Read-Only Access:**

Cybe Security Champion can:

- Read and analyze code through knowledge graph
- Query vulnerability data
- Access scan results and history

Cybe Security Champion CANNOT:

- Modify your code
- Execute commands
- Access external systems
- Share data outside your region

**Data Handling:**

- Code stored in sovereign cloud (EU or US based on region selection)
- Remains within geographical boundary
- Complies with regional data regulations
- Never used for model training
- Can be deleted by disabling feature

**Configuration Requirements:**

- Cybe Analysis must be enabled (for code parsing)
- Project must be scanned at least once
- Code stored in sovereign cloud region
- Uses Cybe Security Champion credits from subscription

**LLM Usage and Privacy**

**Zero-Training Policy:**

CybeDefend has a strict policy: Your code, vulnerabilities, and AI interactions are NEVER used for:

- Training AI models
- Fine-tuning existing models
- Improving general model capabilities

**Sovereign LLM Infrastructure:**

All LLMs used by CybeDefend are:

- Deployed on sovereign cloud infrastructure
- Within your chosen region (EU or US)
- Never accessed from outside your geographical boundary

**Data Processing:**

When using AI features:

1. Code parsed into knowledge graph (stored in sovereign cloud)
2. Queries sent to regional LLMs
3. Responses generated using your specific codebase context
4. All data remains within your regional boundary
5. No data persisted beyond request/response cycle (except knowledge graph)

**Compliance:**

| Region | LLM Location | Compliance |
|--------|-------------|------------|
| **Europe** | EU sovereign cloud | GDPR, ANSSI SecNumCloud, BSI C5 |
| **United States** | US cloud infrastructure | SOC 2, HIPAA, PCI-DSS |

**User Control:**

AI features can be toggled at project level:

- **Cybe Analysis**: Can be enabled/disabled
- **Cybe AutoFix**: Requires explicit activation and Git integration
- **Cybe Security Champion**: Requires Cybe Analysis to be enabled

When disabled, no code is sent to LLMs, and stored knowledge graphs can be deleted.

## 3.6 Vulnerability Management

**Unified Vulnerability Dashboard**

CybeDefend provides a comprehensive dashboard for managing security findings across all scanner types (SAST, SCA, IaC, Container) with consistent workflows.

**Vulnerability Attributes**

**1. Status Tracking**

Each vulnerability progresses through states reflecting team actions:

| Status | Description | Use Case |
|--------|-------------|----------|
| **To Verify** | Newly detected, awaiting validation | Default state for new findings |
| **Confirmed** | Validated as real vulnerability requiring fix | After manual or AI verification |
| **Not Exploitable** | Determined not exploitable in current context | After analysis shows false positive |
| **Proposed Not Exploitable** | Suggested as non-exploitable, pending approval | Team member proposal needing lead confirmation |
| **Resolved** | Fixed and no longer detected in scans | Automatic when vulnerability absent in new scan |
| **In Progress** | Actively being worked on | During remediation |
| **Ignored** | Accepted risk, will not fix | Business decision to accept vulnerability |

**Automatic Status Updates:**

- New vulnerabilities default to "To Verify"
- Resolved automatically if absent in subsequent scans
- Re-detection updates status and preserves history

**2. Risk Levels**

Assessment of potential impact:

| Risk Level | Description | Characteristics |
|-----------|-------------|-----------------|
| **Critical** | Extremely high security risk | Immediate remediation required, potential for severe data breach or system compromise |
| **High** | Significant security risk | Should be addressed urgently, serious security implications |
| **Medium** | Moderate security risk | Address within reasonable timeframe, potential security impact |
| **Low** | Minor security risk | Can be addressed in regular development cycles |

Risk levels assigned by:

- Scanner engines (based on CVE scores, vulnerability types)
- Cybe Analysis (contextual risk assessment)
- Manual override by users

**3. Priority Assignment**

Organizational prioritization for remediation:

| Priority | Description | Assignment Factors |
|----------|-------------|-------------------|
| **Critical Urgent** | Fix immediately | High/Critical risk + Easy exploitability + High business impact |
| **Urgent** | Prioritize highly | High risk + Notable exploitability |
| **Normal** | Regular development cycle | Moderate risk/exploitability (default) |
| **Low** | Can be deferred | Low risk or difficult exploitability |
| **Very Low** | Long-term backlog | Theoretical vulnerabilities, minimal real-world risk |

Priority can be set by:

- Cybe Analysis (if vulnerability triage enabled)
- Manual assignment by team members
- Organizational security policies

**4. Scanner Type Segregation**

Vulnerabilities organized by detection method:

- **SAST Tab**: Source code vulnerabilities
- **IaC Tab**: Infrastructure misconfigurations
- **SCA Tab**: Dependency vulnerabilities
- **Container Tab**: Container and Dockerfile issues

**Filtering and Sorting**

**Available Filters:**

- **Scanner Type**: SAST, IaC, SCA, Container
- **Severity**: Critical, High, Medium, Low (multi-select)
- **Status**: To Verify, Confirmed, Resolved, etc. (multi-select)
- **Priority**: Critical Urgent through Very Low (multi-select)
- **Language**: For code-specific filtering

**Sort Options:**

- **By Severity**: Ascending or descending
- **By CVSS Score**: Numeric score for SCA vulnerabilities
- **By Detection Date**: Newest or oldest first
- **By Priority**: Most urgent first

**Collaboration Features**

**1. Comment System**

- Add comments to any vulnerability
- Facilitate team discussion
- Document investigation findings
- Justify status/priority changes
- Tag team members
- Maintain conversation history

**2. Team Workflows**

**Weekly Triage Sessions** (Recommended):

1. Filter new "To Verify" vulnerabilities
2. Review Cybe Analysis comments
3. Assign priorities collaboratively
4. Distribute work across team
5. Update statuses
6. Plan remediation sprints

**3. Vulnerability History**

Complete tracking of:

- All status changes with timestamps
- Priority modifications
- Risk level updates
- Comment additions
- User who made each change
- Re-detection across scans

**Re-Detection Handling:**

When previously resolved vulnerability reappears:

- Preserves original vulnerability ID
- Updates status from "Resolved" to "To Verify"
- Maintains complete history
- Allows comparison with previous occurrence
- Enables tracking of fix effectiveness

**AI-Assisted Management**

**When Cybe Analysis Enabled:**

**Automatic Actions:**

1. **False Positive Detection**: Update status to "Not Exploitable" with justification
2. **Priority Assignment**: Set priority based on contextual analysis
3. **Expert Comments**: Add detailed analysis to each finding
4. **Grouping**: Identify related vulnerabilities

**Manual Triggers:**

- **Request Analysis**: Click button to run Cybe Analysis on specific vulnerability
- **Generate Fix**: Trigger Cybe AutoFix for confirmed vulnerabilities
- **Chat**: Open Cybe Security Champion for consultation

**Bulk Actions**

For efficiency with large vulnerability sets:

- Select multiple vulnerabilities
- Apply status change to all
- Assign priority in bulk
- Add comment to selection
- Export filtered results

**Integration with Development Workflow**

**IDE Integration:**

- View vulnerabilities in VS Code or JetBrains IDEs
- Navigate directly to vulnerable code line
- See full context without leaving IDE
- Trigger scans from editor

**CI/CD Integration:**

- Block builds based on severity thresholds
- Automated status updates via API
- Webhook notifications for new vulnerabilities
- Integration with pull request reviews

**Issue Tracking** (Future Roadmap):

- Automatic Jira ticket creation (planned)
- GitLab Issues integration (planned)
- Slack notifications (planned)
- Bidirectional sync of status changes (planned)

**Vulnerability Detail View**

Clicking any vulnerability reveals:

**Information Sections:**

1. **Overview**: Type, severity, risk, priority, status
2. **Vulnerable Code**: Exact code snippet with highlighting
3. **Dataflow** (SAST with Cybe Analysis): Path from source to sink
4. **Description**: What the vulnerability is and why it exists
5. **Exploitation**: How it could be exploited
6. **Impact**: Potential consequences
7. **Remediation**: How to fix it
8. **CWE/CVE References**: Industry-standard identifiers
9. **OWASP Mapping**: Relevant OWASP Top 10 category
10. **History**: All changes and comments
11. **Cybe Analysis Comments** (if enabled): AI expert insights

**Available Actions:**

- Update status
- Change priority
- Add comment
- Request Cybe Analysis
- Generate AutoFix (if eligible)
- Chat with Cybe Security Champion
- Export details
- Share with team

**Reporting from Vulnerabilities**

From vulnerability management interface, users can generate:

- Filtered vulnerability lists (CSV, JSON)
- Severity distribution charts
- Trend reports
- OWASP Top 10 compliance reports
- Executive summaries

See section 4.4 for detailed reporting capabilities.

## 3.7 External Integrations

CybeDefend integrates seamlessly with the modern development ecosystem, supporting a wide range of platforms across version control, CI/CD, IDE, and container registry categories.

**1. Version Control and Source Code Hosting**

**GitHub Integration**

**Features:**

- **OAuth Authentication**: Secure account linking
- **Repository Connection**: Select repos for automatic scanning
- **GitHub App**: Official app for seamless integration
- **Automatic Scanning**: Trigger on commits and pull requests (future roadmap)
- **Pull Request Generation**: Cybe AutoFix creates PRs with fixes
- **Organization Support**: Access to organization repositories

**Setup Process:**

1. Navigate to Organization Settings → Integrations
2. Click "Install & Authorize" on GitHub card
3. Authorize CybeDefend GitHub App
4. Select repositories to grant access
5. Confirm permissions (read required, write optional for AutoFix)

**Permissions:**

- **Read**: Required for code scanning
- **Write**: Optional, enables Cybe AutoFix pull requests

**GitLab Integration**

**Features:**

- **OAuth Authentication**: Secure account linking  
- **Repository Connection**: SaaS and self-managed GitLab support
- **Automatic Scanning**: Trigger on commits and merge requests (future roadmap)
- **Merge Request Generation**: Cybe AutoFix creates MRs with fixes
- **Group Support**: Access to group repositories
- **On-Premises Support**: Works with self-hosted GitLab instances

**Setup Process:**

1. Navigate to Organization Settings → Integrations
2. Click "Install & Authorize" on GitLab card
3. Authorize CybeDefend integration
4. Select repositories to grant access
5. Confirm permissions

**Permissions:**

- **Read**: Required for code scanning
- **Write**: Optional, enables Cybe AutoFix merge requests

**2. CI/CD Platform Integrations**

CybeDefend supports comprehensive CI/CD integration through multiple methods:

**Supported Platforms:**

| Platform | Integration Method | Official Support |
|----------|-------------------|------------------|
| **GitHub Actions** | Official Action | ✅ Native Action |
| **GitLab CI** | CLI in pipeline | ✅ Documented |
| **Jenkins** | CLI in pipeline | ✅ Documented |
| **CircleCI** | Docker or CLI | ✅ Documented |
| **Azure DevOps** | CLI in pipeline | ✅ Documented |
| **Bamboo** | CLI/Docker | ✅ Documented |
| **TeamCity** | Docker image | ✅ Documented |
| **Bitbucket Pipelines** | CLI in pipeline | ✅ Documented |

**Integration Methods:**

**A. Official GitHub Action**

```yaml
- name: CybeDefend Security Scan
  uses: CybeDefend/cybedefend-action@v1
  with:
    api_key: ${{ secrets.CYBEDEFEND_API_KEY }}
    project_id: ${{ secrets.CYBEDEFEND_PROJECT_ID }}
```

**B. CLI-Based Integration**

```yaml
# Example GitLab CI
security_scan:
  image: ubuntu:latest
  script:
    - curl -L https://github.com/CybeDefend/cybedefend-cli/releases/latest/download/cybedefend-linux-amd64 -o cybedefend
    - chmod +x cybedefend
    - ./cybedefend scan --dir . --ci --api-key $CYBEDEFEND_API_KEY --project-id $CYBEDEFEND_PROJECT_ID --break-on-severity high
```

**C. Docker-Based Integration**

```yaml
# Example CircleCI
jobs:
  security-scan:
    docker:
      - image: ghcr.io/cybedefend/cybedefend-cli:latest
    steps:
      - checkout
      - run: cybedefend scan --dir . --ci --break-on-fail
```

**CI/CD Features:**

- **Break on Severity**: Fail builds if vulnerabilities found
- **Break on Fail**: Fail builds if scan errors
- **CI-Friendly Output**: Minimal logging for clean pipeline logs
- **SARIF Export**: Standard format for security findings
- **Wait for Results**: Block until scan completes
- **Custom Intervals**: Configure polling frequency

**3. Integrated Development Environments (IDEs)**

**VS Code Extension**

**Features:**

- **In-Editor Scanning**: Launch scans without leaving IDE
- **Results Panel**: View vulnerabilities in dedicated panel
- **Code Navigation**: Jump directly to vulnerable code line
- **Summary View**: Quick overview of project security posture
- **MCP Auto-Configuration**: One-click setup for AI assistants (Cursor, Copilot Chat)

**Installation:**

- Search "CybeDefend" in VS Code Extensions Marketplace
- Install with one click
- Configure API key via Command Palette
- Select organization and project

**MCP Integration:**

- Automatic configuration for Model Context Protocol
- Enables AI assistants to access CybeDefend data
- Query vulnerabilities through natural language
- Get security guidance from Cursor, Claude, Windsurf, Copilot Chat

**JetBrains Plugin**

**Supported IDEs:**

- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- GoLand
- Rider
- CLion
- RubyMine
- All JetBrains IDEs

**Features:**

- **In-Editor Scanning**: Launch scans from IDE
- **Tool Window**: Dedicated panel for scan results
- **Code Navigation**: Jump to vulnerability locations
- **Project Configuration**: Select organization and project

**Installation:**

- Settings/Preferences → Plugins → Marketplace
- Search "CybeDefend"
- Install and configure API key

**4. Container Registries**

CybeDefend integrates with major container registries for image scanning:

**Supported Registries:**

| Registry | Authentication | Features |
|----------|---------------|----------|
| **Docker Hub** | Public / Docker credentials | Pull and scan public/private images |
| **Amazon ECR** | AWS IAM credentials | Cross-region support, IAM roles |
| **Azure ACR** | Service Principal | Managed identity, geo-replication |
| **Google GCR** | Service Account | Multi-region, Artifact Registry |
| **GitHub Container Registry** | Personal Access Token | Organization package support |
| **GitLab Container Registry** | Personal Access Token | SaaS and self-managed |
| **Red Hat Quay** | Robot Account / OAuth2 | Public and private repos |

**Integration Features:**

- **Public Image Scanning**: No authentication needed for public images
- **Private Repository Access**: Secure credential management
- **Multi-Registry Support**: Connect multiple registries simultaneously
- **Webhook Integration** (Future): Automatic scanning on image push
- **Vulnerability Detection**: Layer-by-layer analysis
- **Base Image Recommendations**: Suggest secure alternatives

**Setup Process** (Private Registries):

1. Navigate to Integration Settings
2. Select registry type
3. Provide authentication credentials:
   - ECR: AWS Access Key + Secret
   - ACR: Service Principal credentials
   - GCR: Service Account JSON
   - GHCR: Personal Access Token
   - GitLab: Personal Access Token
   - Quay: Robot Account credentials
4. Test connection
5. Browse and select images to scan

**5. Model Context Protocol (MCP) Server**

**Open-Source Integration:**

CybeDefend provides an open-source MCP server enabling AI coding assistants to access security data directly.

**GitHub Repository**: https://github.com/CybeDefend/cybedefend-mcp-server

**Supported AI Clients:**

- Cursor
- Claude Desktop
- VS Code with MCP extension
- Windsurf
- Any MCP-compatible client

**Features:**

- **Direct Vulnerability Access**: Fetch SAST, IaC, SCA findings via project ID
- **In-IDE Remediation**: Jump to exact file/line with code snippets
- **Real-Time Data**: Access latest scan results
- **Zero Setup**: One command installation, pure STDIO protocol
- **No Local Storage**: Thin wrapper around CybeDefend REST API

**Available Tools:**

```typescript
// MCP tools provided
- get_scan: Current scan state and progress
- get_project_overview: Vulnerability counts per scanner
- list_vulnerabilities_sast: Get SAST findings
- get_vulnerability_sast: Details of specific SAST issue
- list_vulnerabilities_iac: Get IaC findings
- get_vulnerability_iac: Details of specific IaC issue
- list_vulnerabilities_sca: Get SCA findings
- get_vulnerability_sca: Details of specific SCA issue
- list_sca_packages: All packages with vulnerabilities
```

**Installation:**

```bash
# Global install
npm i -g @cybedefend/mcp-server

# Or use npx
npx @cybedefend/mcp-server
```

**Configuration Example** (Claude Desktop):

```json
{
  "mcpServers": {
    "cybedefend": {
      "command": "npx",
      "args": ["-y", "@cybedefend/mcp-server"],
      "env": {
        "CYBEDEFEND_API_KEY": "your-api-key",
        "CYBEDEFEND_PROJECT_ID": "your-project-id",
        "CYBEDEFEND_REGION": "eu"
      }
    }
  }
}
```

**Usage in AI Assistants:**

Natural language queries like:

- "Show critical SAST bugs in Java"
- "How far along is the current scan?"
- "Details of vulnerability with ID abc123"
- "List all SCA vulnerabilities in Python packages"

AI assistant automatically calls appropriate MCP tools and formats results.

**6. CLI Tool - Universal Integration**

**Cross-Platform Support:**

- **Linux**: AMD64, 386 architectures
- **macOS**: Intel and Apple Silicon (ARM64)
- **Windows**: AMD64, 386 architectures

**Distribution:**

- **Direct Binary**: Download from GitHub Releases
- **Docker Image**: `ghcr.io/cybedefend/cybedefend-cli:latest`
- **npm Package**: `@cybedefend/cli` (future)

**Core Commands:**

```bash
# Scan command
cybedefend scan [flags]
  --dir, -d: Directory to scan
  --file, -f: Pre-zipped file
  --project-id: Target project
  --api-key: Authentication
  --region: eu or us
  --wait: Wait for completion
  --break-on-severity: Fail on severity level
  --break-on-fail: Fail on scan error
  --ci: CI-friendly output

# Results command
cybedefend results [flags]
  --project-id: Target project
  --type: sast, iac, sca
  --output: json, html, sarif
  --all: Fetch all pages
  --page: Specific page number

# Version command
cybedefend version

# Completion command
cybedefend completion [bash|zsh|fish|powershell]
```

**Configuration:**

**Environment Variables:**

```bash
export CYBEDEFEND_API_KEY="your-key"
export CYBEDEFEND_PROJECT_ID="project-id"
export CYBEDEFEND_REGION="eu"  # or "us"
```

**Config File** (`~/.cybedefend/config.yaml`):

```yaml
api_url: "https://api-eu.cybedefend.com"
api_key: "your-api-key"
project_id: "your-project-id"
region: "eu"
```

**Use Cases:**

- Local development scanning
- CI/CD pipeline integration
- Automated security testing
- Offline environment scanning
- Batch scanning multiple projects

## 3.8 Data Privacy and Sovereignty

CybeDefend provides comprehensive data privacy controls and sovereign cloud deployment options to meet stringent regulatory and compliance requirements.

**Sovereign Cloud Deployment**

**Two-Region Architecture:**

**European Cloud:**

- **Location**: Data stored exclusively in Europe
- **Certifications**: 
  - CISPE (Cloud Infrastructure Services Providers in Europe)
  - ANSSI SecNumCloud (French cybersecurity certification)
  - G-Cloud UK
  - ACN (Italy)
  - ENS (Spain)
  - GDPR
  - BSI KRITIS (German critical infrastructure)
  - BSI C5 (German cloud security)
  - ISO 27001/27017/27018
  - ISO 27701
- **Sovereignty**: Data never leaves European territory
- **API Endpoint**: `https://api-eu.cybedefend.com`
- **Use Case**: GDPR compliance, European data protection laws

**United States Cloud:**

- **Location**: Data stored in the United States
- **Certifications**:
  - SOC 2
  - ISO 27001/27017/27018
  - ISO 27701
  - HIPAA
  - PCI-DSS
- **Performance**: Optimized for low latency in North America
- **API Endpoint**: `https://api-us.cybedefend.com`
- **Use Case**: US regulatory standards, North American operations

**Region Selection:**

- Chosen during account creation
- Binds IAM/Gateway endpoints at runtime
- Determines data residency for all organization activities
- Can be switched by creating new organization

**Code Storage Policy**

**Standard Scanning (No AI Features):**

When AI features are disabled:

1. **Temporary Container Approach**:
   - Fresh container created for each scan
   - Code cloned into isolated container
   - Security analysis performed
   - Results extracted
   - Container terminated immediately
   - All code copies destroyed

2. **Zero Persistent Storage**:
   - Code is NEVER stored after scan completion
   - Only vulnerability metadata retained
   - Complete code deletion guaranteed
   - No remnants in any system

**AI-Enhanced Scanning:**

When Cybe Analysis, AutoFix, or Security Champion enabled:

1. **Knowledge Graph Storage**:
   - Code parsed into proprietary knowledge graph
   - Stored in selected sovereign cloud (EU or US)
   - Encrypted at rest and in transit
   - Geographically bound to region
   - Enables zero-hallucination AI analysis

2. **Data Retention**:
   - Stored as long as AI features remain enabled
   - Can be deleted by disabling AI features
   - Automatic deletion when project deleted
   - User control over data lifecycle

3. **No Cross-Region Transfer**:
   - EU code stays in EU infrastructure
   - US code stays in US infrastructure
   - No data replication across regions
   - Regional isolation guaranteed

**LLM Usage and Training Policy**

**Zero-Training Guarantee:**

CybeDefend has a strict, contractual commitment:

**NEVER Used For:**

- Training AI models
- Fine-tuning existing models
- Improving general model capabilities
- Model performance optimization
- Transfer learning
- Any form of machine learning on user data

**Regional LLM Deployment:**

| Region | LLM Infrastructure | Data Flow |
|--------|-------------------|-----------|
| **Europe** | EU sovereign cloud LLMs | Code → EU Knowledge Graph → EU LLMs → EU Results |
| **United States** | US cloud LLMs | Code → US Knowledge Graph → US LLMs → US Results |

**Key Guarantees:**

- LLMs deployed within selected region
- Inference happens in real-time only
- No data persisted beyond request/response (except knowledge graph)
- No model updates based on user interactions
- Complete data isolation between customers

**Privacy Controls**

**User Control Over Data:**

1. **AI Feature Toggle**:
   - Enable/disable per project
   - Immediate effect on new scans
   - Clear indication of data implications

2. **Code Deletion**:
   - Disable AI features → code deleted from knowledge graph
   - Delete project → all associated data deleted
   - Organization deletion → complete data purge

3. **Transparency**:
   - Clear messaging when AI features require code storage
   - Warnings before enabling features
   - Visibility into what data is stored where

**Access Control:**

- Code accessible only to:
  - Organization members with appropriate roles
  - CybeDefend AI agents (read-only)
  - Authorized API calls with valid authentication
- No third-party access
- No cross-organization data sharing
- Strict role-based permissions

**Compliance and Auditing**

**GDPR Compliance (Europe):**

- Data subject rights (access, deletion, portability)
- Lawful basis for processing
- Data minimization
- Privacy by design
- Data protection impact assessments
- DPO (Data Protection Officer) oversight

**Other Compliance:**

- SOC 2 Type II (US)
- HIPAA (Healthcare data in US)
- PCI-DSS (Payment card data)
- ISO 27001 (Information security)
- ISO 27701 (Privacy management)
- SecNumCloud (French cybersecurity)

**Audit Capabilities:**

- Activity logs for all data access
- Scan history and results retention
- User action tracking
- API call logging
- Compliance reporting

**Data Encryption**

**At Rest:**

- AES-256 encryption for all stored data
- Encrypted database storage
- Encrypted knowledge graph storage
- Encrypted file systems

**In Transit:**

- TLS 1.3 for all API communications
- HTTPS-only endpoints
- Certificate pinning
- Encrypted container-to-gateway communication

**Key Management:**

- Regional key storage
- Automatic key rotation
- HSM (Hardware Security Module) backed (where available)
- No cross-region key sharing

**Transparency and User Rights**

**Data Transparency:**

Users can access:

- What data is stored (vulnerability metadata, knowledge graphs)
- Where data is stored (EU or US region)
- How long data is retained (until project/feature disabled)
- Who can access data (role-based permissions)

**User Rights:**

- **Right to Access**: View all stored data
- **Right to Deletion**: Delete projects and associated data
- **Right to Portability**: Export scan results and vulnerabilities
- **Right to Rectification**: Modify vulnerability states and priorities
- **Right to Restriction**: Disable AI features to stop code storage

**Data Breach Response:**

- 72-hour notification (GDPR)
- Incident response procedures
- Root cause analysis
- Remediation actions
- Transparent communication

# 4. User Interfaces

The CybeDefend user interface is designed to provide an intuitive, comprehensive experience for managing application security across the entire development lifecycle. The platform offers multiple interface layers tailored to different user needs and workflows, ensuring that each stakeholder—from developers to security leads to executives—has access to the information they need in a format that facilitates decision-making and action.

## 4.1 Dashboard - Security Overview

**Primary Landing Page:**

The dashboard serves as the central command center, providing instant visibility into the organization's security posture. It aggregates data from all projects, teams, and scans to present a holistic view of security status, trends, and urgent action items.

**Key Sections:**

**1. Organization-Level Overview**

When accessing from organization context:

**Security Metrics Summary:**

- **Total Vulnerabilities**: Aggregate count across all projects
- **By Severity**: Visual breakdown (Critical, High, Medium, Low)
  - Color-coded indicators (Red for Critical, Orange for High, Yellow for Medium, Green for Low)
  - Percentage distribution
  - Trend indicators (↑ increased, ↓ decreased, → stable compared to previous period)
- **By Status**: Distribution across To Verify, Confirmed, Resolved, Not Exploitable, Ignored
- **By Priority**: Critical Urgent, Urgent, Normal, Low, Very Low distribution
- **By Scanner Type**: SAST, SCA, IaC, Container counts with visual segmentation

**Active Projects Widget:**

- Total number of projects in organization
- Projects scanned in last 7 days
- Projects with critical/high vulnerabilities
- Projects pending initial scan
- Quick filters: All, Active, Inactive, Recently Updated

**Recent Scan Activity:**

- Timeline of recent scans across all projects
- Status indicators: Success, In Progress, Failed, Pending
- Scan duration and completion timestamps
- Quick access to scan results
- Filter by team, project, or time range

**Top Vulnerable Projects:**

- Ranked list of projects by vulnerability count/severity
- Risk score calculation per project
- Direct navigation to project details
- Visual indicators of severity concentration
- Comparison with organization baseline

**Security Trends Chart:**

- Time-series visualization of vulnerability trends
- Configurable time ranges: 7 days, 30 days, 90 days, 1 year
- Overlay of different metrics:
  - New vulnerabilities detected
  - Vulnerabilities resolved
  - Net change in security posture
  - Scan frequency
- Exportable for reporting purposes

**AI Usage Metrics** (When AI features enabled):

- Cybe Analysis requests consumed
- Cybe AutoFix generations used
- Cybe Security Champion interactions
- Remaining credits/quota
- Trend of AI feature adoption
- ROI indicators (time saved, false positives eliminated)

**2. Project-Level Dashboard**

When viewing a specific project:

**Project Health Score:**

- Overall security rating (A+ to F scale)
- Factors: Vulnerability count, severity distribution, remediation velocity
- Historical trend of health score
- Comparison with organizational average
- Recommendations for improvement

**Vulnerability Overview Panel:**

**Scanner-Specific Tabs:**

- **SAST Tab**: Source code vulnerabilities
  - Language breakdown
  - CWE categories
  - Dataflow visualization availability
  - Most common vulnerability types
  
- **IaC Tab**: Infrastructure misconfigurations
  - Resource types affected
  - Cloud provider breakdown (AWS, Azure, GCP)
  - Compliance benchmark violations
  - Critical misconfigurations highlighted
  
- **SCA Tab**: Dependency vulnerabilities
  - Ecosystem breakdown (npm, pip, Maven, etc.)
  - CVE severity distribution
  - Outdated dependencies count
  - Available updates summary
  - Transitive vs. direct dependency vulnerabilities
  
- **Container Tab**: Container security issues
  - Base image vulnerabilities
  - Layer-by-layer analysis summary
  - Secret detection results
  - Configuration issues

**Quick Actions Panel:**

- **Start New Scan**: Button to trigger immediate scan
- **Configure Scan Settings**: Quick access to scan configuration
- **Generate Report**: Export vulnerabilities in various formats
- **View Scan History**: Timeline of all project scans
- **Manage Team Access**: Add/remove team members
- **Integration Status**: Health check of connected integrations (GitHub, GitLab, etc.)

**Recent Activity Feed:**

- Scan completions
- Status changes on vulnerabilities
- Comments added by team members
- AI analysis completions
- AutoFix pull requests created
- Team member activities
- Integration events (commits scanned, images analyzed)

**3. Team Management Dashboard**

Accessible to Team Managers and Organization Administrators:

**Team Overview:**

- Team member count and roles
- Projects under team management
- Aggregate vulnerability metrics for team's projects
- Team activity summary

**Member Management Panel:**

- List of team members with roles
- Pending invitations
- Add new members interface
- Role assignment controls
- Activity tracking per member

**Project Portfolio:**

- Grid or list view of all team projects
- Status indicators per project
- Quick navigation to project details
- Bulk actions (archive, transfer, delete)

## 4.2 Project Management Interface

**Comprehensive Project Configuration:**

The project management interface provides granular control over how security scans are executed, how results are processed, and how teams collaborate on remediation.

**1. Project Settings**

**General Information:**

- **Project Name**: Editable display name
- **Description**: Optional detailed description of project purpose
- **Project ID**: Unique identifier (auto-generated, read-only)
- **Creation Date**: Timestamp of project creation
- **Last Scan**: Timestamp and status of most recent scan
- **Associated Team**: Team assignment (affects access permissions)
- **Tags**: Custom labels for organization (e.g., "production", "payment-module", "mobile-app")

**Repository Configuration** (for connected repositories):

- **Source Type**: GitHub, GitLab, Manual Upload
- **Repository URL**: Full path to source code repository
- **Branch Selection**: Default branch for scanning (main, develop, etc.)
- **Authentication Status**: Connection health indicator
- **Access Permissions**: Read-only vs. Write (for AutoFix)

**2. Scan Configuration**

**Scanner Selection:**

Checkbox interface to enable/disable specific scanners:

- ☑ **SAST (Static Application Security Testing)**
  - Languages detected automatically
  - Option to exclude specific file patterns
  - Custom rule configuration (advanced)
  
- ☑ **IaC (Infrastructure as Code)**
  - Auto-detect IaC files (Terraform, CloudFormation, Ansible, Kubernetes)
  - Compliance framework selection (CIS, PCI-DSS, HIPAA)
  
- ☑ **SCA (Software Composition Analysis)**
  - Lockfile scanning
  - Transitive dependency analysis toggle
  - Minimum severity threshold
  
- ☑ **Container Security**
  - Dockerfile scanning
  - Container registry integration
  - Image selection for scanning

**Scan Frequency** (for connected repositories):

Radio button selection:

- ○ **Daily**: Automatic scan every 24 hours
- ○ **Weekly**: Automatic scan every 7 days (day of week selection)
- ○ **On Commit**: Trigger on every push to default branch (future roadmap)
- ○ **On Pull Request**: Trigger on PR creation/update (future roadmap)
- ○ **Never**: Manual scans only

**Severity Filtering:**

Multi-select checkboxes to include/exclude severities:

- ☑ Critical
- ☑ High
- ☑ Medium
- ☑ Low

Filtered vulnerabilities are not shown in results, reducing noise for teams that want to focus on high-impact issues.

**3. AI Feature Configuration**

Toggle switches for AI-powered features:

**Cybe Analysis:**

- **Enable/Disable Toggle**
- **Description**: "AI-powered false positive reduction and expert vulnerability analysis"
- **Requirements**: Code will be parsed into knowledge graph and stored in sovereign cloud
- **Impact**: Reduces false positives by up to 90%, adds expert commentary to vulnerabilities
- **Credits Used**: Displays consumption rate

**Vulnerability Triage:**

- **Enable/Disable Toggle** (requires Cybe Analysis)
- **Description**: "Automatically assign priority levels based on exploitability and impact"
- **Options**: 
  - ☑ Auto-prioritize new vulnerabilities
  - ☑ Re-evaluate priorities on each scan
- **Priority Levels**: Displays the 5 priority levels used

**Selective Vulnerability Group Analysis** (SAST only):

- **Enable/Disable Toggle** (requires Cybe Analysis)
- **Vulnerability Groups**: Multi-select list
  - ☐ SQL Injection
  - ☐ LDAP Injection
  - ☐ Cross-Site Scripting (XSS)
  - ☐ Path Traversal
  - ☐ Command Injection
  - ☐ XML External Entity (XXE)
  - ☐ Server-Side Request Forgery (SSRF)
  - ☐ Insecure Deserialization
  - ☐ Authentication/Authorization Issues
  - ☐ Cryptographic Failures
  - ☐ And more... (expandable list)
- **Purpose**: Optimize AI credit usage by analyzing only relevant vulnerability types

**Cybe AutoFix:**

- **Enable/Disable Toggle** (requires Cybe Analysis and repository write access)
- **Description**: "Generate context-aware code fixes and create pull/merge requests automatically"
- **Requirements**: 
  - Repository connection (GitHub or GitLab)
  - Write permissions granted
  - Cybe Analysis enabled
- **Configuration**:
  - Default branch for PRs/MRs
  - Auto-assign reviewers
  - PR/MR labels/tags
  - Notification settings

**Cybe Security Champion:**

- **Enable/Disable Toggle** (requires Cybe Analysis)
- **Description**: "24/7 AI security expert for vulnerability consultation and codebase questions"
- **Access**: Available from vulnerability detail pages and global chat interface

**Data Privacy Notice:**

Prominent information box displaying:

- "Enabling AI features requires parsing your codebase into a knowledge graph"
- "Code will be stored in your selected sovereign cloud: [EU/US]"
- "Code is never used for model training"
- "You can delete stored code by disabling AI features"
- Link to detailed privacy policy

**4. Integration Management**

**Connected Integrations Panel:**

Visual cards for each integration type:

**Version Control:**

- **GitHub Integration**
  - Status: Connected / Not Connected
  - Repository: [Owner]/[Repo name]
  - Permissions: Read / Read+Write
  - Actions: Reconnect, Disconnect, Configure
  
- **GitLab Integration**
  - Status: Connected / Not Connected
  - Repository: [Group]/[Project name]
  - Instance: GitLab.com / Self-Managed
  - Permissions: Read / Read+Write
  - Actions: Reconnect, Disconnect, Configure

**Container Registries:**

- **Registry Type**: Docker Hub, ECR, ACR, GCR, GHCR, GitLab, Quay
- **Connection Status**: Active / Inactive / Error
- **Images Tracked**: List of images being scanned
- **Actions**: Add Image, Remove Image, Refresh Credentials

**IDE Integrations:**

- **VS Code Extension**: Installation status and version
- **JetBrains Plugin**: Installation status and version
- **MCP Server**: Configuration status for AI assistants

**CI/CD Integration Instructions:**

- Pre-configured code snippets for:
  - GitHub Actions workflow
  - GitLab CI pipeline
  - Jenkins pipeline
  - Azure DevOps pipeline
  - CircleCI config
- Copy-to-clipboard functionality
- API key and Project ID pre-filled

**5. Team and Access Management**

**Team Members List:**

Table view with columns:

- **Name**: Team member full name
- **Email**: Contact email
- **Role**: Team role badge (Team Manager, Integration Manager, Analyst Developer, Developer, Read-Only)
- **Joined**: Date added to team
- **Last Activity**: Timestamp of last action
- **Actions**: Edit role, Remove from team

**Invite New Members:**

- Email input field
- Role selection dropdown
- Custom invitation message (optional)
- Expiration time for invitation
- Send invite button

**Role Permission Matrix** (expandable reference):

Table showing what each role can do:

| Action | Team Manager | Integration Manager | Analyst Developer | Developer | Read-Only |
|--------|--------------|---------------------|-------------------|-----------|-----------|
| Create projects | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete projects | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configure integrations | ✅ | ✅ | ❌ | ❌ | ❌ |
| Run scans | ✅ | ✅ | ✅ | ✅ | ❌ |
| View vulnerabilities | ✅ | ✅ | ✅ | ✅ | ❌ |
| Generate reports | ✅ | ✅ | ✅ | ❌ | ❌ |
| Update vulnerability status | ✅ | ✅ | ✅ | ✅ | ❌ |
| Use Cybe AutoFix | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage team members | ✅ | ❌ | ❌ | ❌ | ❌ |
| View dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |

## 4.3 Vulnerability Management Interface

**Comprehensive Vulnerability List View:**

The vulnerability management interface is the primary workspace for security teams to triage, analyze, and remediate security findings.

**1. Main Vulnerability List**

**Layout:**

- Tabbed interface by scanner type: SAST | IaC | SCA | Container
- Each tab maintains independent filtering and sorting
- Table view with customizable columns

**Default Columns:**

- **Severity Badge**: Visual indicator (Critical, High, Medium, Low) with color coding
- **Vulnerability ID**: Unique identifier (clickable to detail view)
- **Type/CWE**: Vulnerability category (e.g., "SQL Injection", "CWE-89")
- **Status Badge**: Current status with color coding
- **Priority**: Priority level (Critical Urgent through Very Low)
- **File/Location**: Affected file and line number (SAST) or package (SCA)
- **Detection Date**: When first detected
- **Last Updated**: Most recent activity timestamp
- **Assigned To**: Team member assigned to remediation (future feature)

**Optional Columns** (configurable):

- Risk Level
- CVSS Score (for SCA)
- Language (for SAST)
- AI Analysis Status
- Comment Count
- History Event Count

**2. Advanced Filtering**

**Filter Panel** (collapsible sidebar):

**By Severity:**

- ☐ Critical
- ☐ High
- ☐ Medium
- ☐ Low
- Multi-select with "Select All" / "Clear All"

**By Status:**

- ☐ To Verify
- ☐ Confirmed
- ☐ Not Exploitable
- ☐ Proposed Not Exploitable
- ☐ Resolved
- ☐ In Progress
- ☐ Ignored

**By Priority:**

- ☐ Critical Urgent
- ☐ Urgent
- ☐ Normal
- ☐ Low
- ☐ Very Low

**By Scanner Type:**

- ☐ SAST
- ☐ IaC
- ☐ SCA
- ☐ Container

**By Language** (SAST tab):

- ☐ JavaScript/TypeScript
- ☐ Python
- ☐ Java
- ☐ PHP
- ☐ Go
- ☐ Ruby
- ☐ C/C++
- ☐ C#
- ☐ Rust
- ☐ Kotlin
- ☐ Scala
- ☐ Swift

**By Date Range:**

- Dropdown: Last 7 days / Last 30 days / Last 90 days / All time / Custom range
- Custom date picker for precise ranges

**By AI Analysis:**

- ☐ Analyzed by Cybe Analysis
- ☐ Not yet analyzed
- ☐ Has AutoFix available

**Search Bar:**

- Free-text search across:
  - Vulnerability descriptions
  - File names
  - CWE identifiers
  - Comments
  - Code snippets
- Real-time filtering as user types

**3. Sorting Options**

Dropdown menu or column header clicks:

- Sort by Severity (High to Low / Low to High)
- Sort by Priority (Most Urgent First / Least Urgent First)
- Sort by Detection Date (Newest First / Oldest First)
- Sort by Last Updated (Most Recent First / Least Recent First)
- Sort by CVSS Score (Highest First / Lowest First) - SCA only
- Sort by File Name (A-Z / Z-A)

**4. Bulk Actions**

Selection checkboxes on each row enable bulk operations:

**Bulk Action Menu:**

- **Change Status**: Apply status to all selected
- **Change Priority**: Apply priority to all selected
- **Assign To**: Assign all selected to team member (future)
- **Add Comment**: Add same comment to all selected
- **Export Selection**: Export filtered/selected vulnerabilities
- **Request AI Analysis**: Trigger Cybe Analysis on selected (if not already analyzed)
- **Mark as False Positive**: Batch mark as Not Exploitable

**5. Vulnerability Detail View**

Clicking any vulnerability opens a comprehensive detail panel (modal or side panel):

**Header Section:**

- **Vulnerability Title**: Clear, concise description
- **Severity Badge**: Large, prominent visual indicator
- **Status Dropdown**: Change status directly
- **Priority Dropdown**: Change priority directly
- **Risk Level Badge**: Critical/High/Medium/Low risk assessment

**Information Tabs:**

**Tab 1: Overview**

**SAST Vulnerabilities:**

- **CWE Reference**: CWE number and name with link to official documentation
- **OWASP Category**: Mapping to OWASP Top 10 (if applicable)
- **Detection Engine**: Which scanner detected it (Opengrep, CybeDefend Engine)
- **Language**: Programming language
- **File Location**: Full file path
- **Line Number**: Exact line where vulnerability exists
- **Code Snippet**: 
  - Vulnerable code displayed with syntax highlighting
  - 5-10 lines of context before and after
  - Highlighted vulnerable line
  - Copy code button

**IaC Vulnerabilities:**

- **Resource Type**: AWS::S3::Bucket, Azure storage account, etc.
- **Configuration File**: Terraform file, CloudFormation template, etc.
- **Line Number**: Location in IaC file
- **Misconfiguration Description**: What's wrong with the configuration
- **Compliance Framework Violation**: CIS benchmark reference, etc.
- **Affected Infrastructure**: Which cloud resources are impacted

**SCA Vulnerabilities:**

- **Package Name**: Vulnerable dependency
- **Current Version**: Installed version
- **Fixed Version**: Version that patches the vulnerability
- **CVE Identifier**: CVE number with link to NVD
- **CVSS Score**: Detailed score breakdown (Base, Temporal, Environmental)
- **Dependency Type**: Direct vs. Transitive
- **Dependency Path**: How the vulnerable package is included
  - Example: `myapp → express → body-parser → qs (vulnerable)`
- **Update Command**: Pre-filled command to update dependency
  - `npm update qs@2.4.1`
  - `pip install package>=1.2.3`
  - Copy button for easy execution

**Container Vulnerabilities:**

- **Image Name**: Full image tag
- **Layer**: Which layer introduced the vulnerability
- **Package**: OS package or application dependency
- **Current Version**: Installed version
- **Fixed Version**: Patched version
- **CVE Identifier**: Link to vulnerability database

**Tab 2: Cybe Analysis** (if enabled)

**AI-Generated Insights:**

- **Exploitability Assessment**:
  - Detailed analysis of whether vulnerability is exploitable
  - Dataflow visualization (SAST only)
  - Input sanitization check results
  - Business logic context
  - Likelihood rating: Very High / High / Medium / Low / Very Low
  
- **Expert Commentary**:
  - Clear explanation of the vulnerability
  - Why it exists in this specific codebase
  - How it could be exploited
  - What data or functionality is at risk
  - Real-world attack scenarios
  
- **Impact Analysis**:
  - Business impact if exploited
  - Data sensitivity assessment
  - User exposure level
  - Compliance implications (GDPR, HIPAA, etc.)
  
- **Recommended Priority**:
  - AI-suggested priority level with reasoning
  - Comparison with organizational risk tolerance
  - Factors influencing priority decision

- **False Positive Determination** (if applicable):
  - Clear explanation of why it's a false positive
  - Evidence from dataflow analysis
  - Sanitization/validation mechanisms detected
  - Recommendation to mark as "Not Exploitable"

**Regenerate Analysis Button**: Request fresh AI analysis if code changed

**Tab 3: Remediation**

**Remediation Guidance:**

- **How to Fix**: Step-by-step instructions
  - Code examples of secure implementation
  - Best practices for this vulnerability type
  - Links to security documentation
  
- **Secure Code Example**:
  - Syntax-highlighted code showing proper fix
  - Side-by-side comparison with vulnerable code
  - Explanation of why fix is secure

**Cybe AutoFix Section** (if enabled and eligible):

- **AutoFix Status**:
  - ✅ Available: "Generate Fix" button enabled
  - ⏳ Generating: Progress indicator
  - ✅ Generated: "View Pull Request" button
  - ❌ Not Available: Explanation (e.g., "Requires repository write access")

- **Generate Fix Button**: Triggers AI-powered fix generation
  - Modal confirmation: "Generate context-aware fix and create PR?"
  - Estimated time: "Usually completes in 30-60 seconds"
  
- **Generated Fix Preview** (after generation):
  - Diff view showing changes
  - Files affected (expandable list)
  - Explanation of changes made
  - "Create Pull Request" button
  - "Regenerate" option if unsatisfied

- **Pull/Merge Request Link**: Direct link to created PR/MR on GitHub/GitLab
  - Status: Open / Merged / Closed
  - CI/CD checks status
  - Reviewer assignments

**Manual Remediation Tracking:**

- **Assign To**: Dropdown to assign to team member (future)
- **Due Date**: Calendar picker for remediation deadline (future)
- **Remediation Notes**: Free-text field for tracking fix progress

**Tab 4: Dataflow** (SAST with Cybe Analysis only)

**Interactive Dataflow Visualization:**

- **Source**: Where untrusted data enters
  - User input field
  - API parameter
  - File upload
  - Environment variable
  - Database query result

- **Path**: Trace through code
  - Function calls
  - Variable assignments
  - Data transformations
  - Validation/sanitization points (highlighted)
  - Propagation across files/modules

- **Sink**: Where vulnerability manifests
  - Database query
  - System command execution
  - File system operation
  - HTML output
  - eval() or similar dangerous functions

**Visual Representation:**

- Graph or flowchart showing data journey
- Color-coded nodes:
  - Red: Source (untrusted input)
  - Orange: Dangerous sink
  - Green: Sanitization/validation point
  - Blue: Normal processing
- Clickable nodes to jump to code location
- Collapsible for complex flows

**Tab 5: History**

**Complete Audit Trail:**

- **Chronological list of all events**:
  - Detection date and scan ID
  - Status changes with user and timestamp
  - Priority modifications
  - Risk level updates
  - Comments added
  - AI analysis runs
  - AutoFix generations
  - PR/MR creations
  - Re-detections in subsequent scans
  - Resolution confirmations

- **Timeline Visualization**:
  - Visual timeline with key milestones
  - Time-to-resolve calculation
  - Reopen count (if vulnerability reappeared)

**Tab 6: Comments & Collaboration**

**Comment Thread:**

- **Add Comment Box**:
  - Rich text editor
  - Markdown support
  - Code snippet insertion
  - Mention team members (@username)
  - Attach files/screenshots
  
- **Comment List**:
  - User avatar and name
  - Timestamp (relative: "2 hours ago" and absolute)
  - Comment text with formatting
  - Edit/Delete options (for comment author)
  - Reply/Thread support (nested comments)
  - Reactions (👍 👎 ❤️ 🎉)

**Activity Notifications:**

- Team members mentioned receive notifications
- Watchers notified of status changes
- Email digest options (immediate, daily, weekly)

**Action Buttons** (bottom of detail view):

- **Chat with Cybe Security Champion**: Opens AI chat pre-contextualized with this vulnerability
- **Export Details**: Download vulnerability info as PDF or JSON
- **Share**: Generate shareable link (with access control)
- **Delete**: Remove vulnerability from system (admin only)
- **Mark as False Positive**: Quick action to set status

## 4.4 Reporting and Analytics Interface

**Comprehensive Reporting Tools:**

CybeDefend provides extensive reporting capabilities to support compliance, executive communications, and continuous improvement tracking.

**1. Report Generation Interface**

**Report Builder:**

**Step 1: Report Type Selection**

Radio button selection:

- ○ **Executive Summary**: High-level overview for non-technical stakeholders
- ○ **Detailed Vulnerability Report**: Comprehensive list with full details
- ○ **Compliance Report**: Mapping to specific compliance frameworks
- ○ **Trend Analysis Report**: Historical trends and metrics
- ○ **OWASP Top 10 Report**: Categorization by OWASP standards
- ○ **Custom Report**: Build your own with selected sections

**Step 2: Scope Selection**

- **Time Range**: 
  - Dropdown: Last 7 days / Last 30 days / Last 90 days / Last year / All time / Custom
  - Date picker for custom ranges
  
- **Projects**:
  - Multi-select dropdown
  - Options: All projects / Select specific projects / By team
  
- **Scanner Types**:
  - ☐ SAST
  - ☐ IaC
  - ☐ SCA
  - ☐ Container

**Step 3: Filters**

- **Severity**: Multi-select (Critical, High, Medium, Low)
- **Status**: Multi-select (all status types)
- **Priority**: Multi-select (all priority levels)
- **Include Resolved**: ☐ Include vulnerabilities resolved in time range
- **Include Ignored**: ☐ Include vulnerabilities marked as ignored

**Step 4: Content Selection** (for Custom Reports)

Checkboxes for sections to include:

- ☐ Executive Summary
- ☐ Security Metrics Overview
- ☐ Vulnerability Distribution Charts
- ☐ Top Vulnerable Projects
- ☐ Detailed Vulnerability List
- ☐ Remediation Recommendations
- ☐ Trend Analysis
- ☐ Compliance Mapping
- ☐ AI Analysis Insights
- ☐ Team Performance Metrics

**Step 5: Format Selection**

Radio buttons:

- ○ **PDF**: Professional format for distribution
- ○ **HTML**: Interactive web-based report
- ○ **Excel**: For data manipulation and analysis
- ○ **JSON**: For programmatic consumption or API integration
- ○ **CSV**: For simple data export
- ○ **SARIF**: Standard format for security findings

**Step 6: Branding** (optional)

- Upload company logo
- Custom color scheme
- Footer text (e.g., "Confidential - Internal Use Only")
- Report title customization

**Generate Button**: Creates report (shows progress indicator)

**2. Pre-Generated Reports Dashboard**

**Saved Reports Library:**

Table view of previously generated reports:

- **Report Name**: User-defined or auto-generated
- **Type**: Executive Summary, Detailed, etc.
- **Generated Date**: Timestamp
- **Time Range Covered**: Date range of data
- **Generated By**: User who created report
- **Actions**: Download, View, Delete, Regenerate with same parameters

**Scheduled Reports** (future feature):

- Configure automatic report generation
- Email distribution lists
- Frequency: Daily, Weekly, Monthly, Quarterly
- Customizable recipients

**3. Analytics Dashboards**

**Interactive Data Exploration:**

**Security Trends Dashboard:**

**Time-Series Charts:**

- **Vulnerability Detection Rate**:
  - Line chart showing vulnerabilities detected over time
  - Separate lines for each severity level
  - Comparison with previous period
  - Moving average overlay
  
- **Remediation Velocity**:
  - Bar chart showing vulnerabilities resolved per time period
  - Grouped by priority level
  - Comparison with detection rate
  - Net change indicator
  
- **Mean Time to Resolve (MTTR)**:
  - Line chart showing average days to resolve
  - Segmented by severity
  - Trend line showing improvement or decline
  - Industry benchmark comparison (if available)
  
- **Scan Frequency**:
  - Bar chart showing scans performed per project
  - Highlights projects with infrequent scanning
  - Overlay of scan failures

**Distribution Charts:**

- **Vulnerability by Severity** (Pie chart):
  - Visual breakdown of Critical/High/Medium/Low
  - Percentage labels
  - Clickable to filter main vulnerability list
  
- **Vulnerability by Scanner Type** (Donut chart):
  - SAST, IaC, SCA, Container segments
  - Count and percentage labels
  
- **Vulnerability by Status** (Stacked bar):
  - To Verify, Confirmed, Resolved, etc.
  - Comparison across projects or teams
  
- **Vulnerability by Priority** (Horizontal bar):
  - Critical Urgent through Very Low
  - Color-coded bars

**OWASP Top 10 Mapping:**

- **Horizontal bar chart** showing vulnerability count per OWASP category:
  - A01: Broken Access Control
  - A02: Cryptographic Failures
  - A03: Injection
  - A04: Insecure Design
  - A05: Security Misconfiguration
  - A06: Vulnerable and Outdated Components
  - A07: Identification and Authentication Failures
  - A08: Software and Data Integrity Failures
  - A09: Security Logging and Monitoring Failures
  - A10: Server-Side Request Forgery
- Clickable bars to view vulnerabilities in that category
- Compliance status indicator (improving, stable, declining)

**CWE Top 25 Mapping** (similar to OWASP):

- Visualization of most common CWEs
- Link to CWE database for each
- Trend over time

**Project Comparison Dashboard:**

- **Side-by-side comparison** of up to 5 projects
- Metrics compared:
  - Total vulnerabilities
  - Severity distribution
  - Resolution rate
  - MTTR
  - Scan frequency
  - AI usage
- Identification of outliers and best performers
- Recommendations for underperforming projects

**Team Performance Dashboard:**

- **Team-level metrics**:
  - Vulnerabilities handled per team
  - Average resolution time
  - Scan coverage (% of projects scanned regularly)
  - AI feature adoption rate
  - Collaboration metrics (comments, discussions)
- Leaderboard (gamification element, optional)
- Recommendations for improving team security practices

**AI Impact Dashboard** (when AI features enabled):

- **False Positive Reduction**:
  - Percentage reduction vs. traditional scanning
  - Time saved by eliminating false positives
  - Chart showing false positives over time
  
- **AutoFix Adoption**:
  - Number of fixes generated
  - Number of fixes merged
  - Success rate (merged / generated)
  - Time saved on remediation
  
- **Security Champion Usage**:
  - Number of chat interactions
  - Most common questions/topics
  - User satisfaction ratings (if collected)
  - Learning indicators (repeat questions declining)
  
- **ROI Calculator**:
  - Estimated time saved
  - Estimated cost savings
  - Vulnerabilities prevented from reaching production
  - Reduction in security debt

**4. Compliance and Audit Interface**

**Compliance Framework Selection:**

Dropdown to choose framework:

- OWASP Top 10
- PCI-DSS
- HIPAA
- GDPR (security requirements)
- SOC 2
- ISO 27001
- CIS Benchmarks
- NIST Cybersecurity Framework

**Compliance Dashboard:**

- **Overall Compliance Score**: Percentage or letter grade
- **Requirements Breakdown**:
  - List of framework requirements
  - Status: Compliant / Partially Compliant / Non-Compliant
  - Evidence: Link to vulnerabilities or configurations demonstrating compliance
  - Recommendations: Actions needed to achieve full compliance
  
- **Audit Trail**:
  - Timestamped log of all security-relevant activities
  - Scan results
  - Vulnerability remediations
  - Configuration changes
  - User activities
  - Exportable for external auditors

**Compliance Report Export:**

- Generate compliance-specific reports
- Include evidence and screenshots
- Auditor-friendly formatting
- Digital signature option for authenticity

## 4.5 Organization and Team Settings Interface

**Administrative Controls:**

**1. Organization Settings**

**General Information:**

- **Organization Name**: Editable
- **Organization ID**: Unique identifier (read-only)
- **Creation Date**: Timestamp
- **Owner**: Primary administrator
- **Region**: EU or US (set at creation, read-only)
- **Billing Email**: Contact for invoices
- **Support Contact**: Technical support email

**Member Management:**

- **Member List**:
  - Table with columns: Name, Email, Organization Role, Teams, Joined Date, Last Active
  - Filter by role
  - Search by name or email
  
- **Organization Roles**:
  - **Administrator**: Full access to everything
  - **Manager**: Can create teams and manage members
  - **Billing Manager**: Access to billing only
  - **Member**: No default permissions, access via team membership
  
- **Actions**:
  - Add new member (send invitation)
  - Change member role
  - Remove member (with confirmation)
  - View member activity log

**Team Management:**

- **Team List**:
  - Cards or table view
  - Team name, member count, project count
  - Quick navigation to team details
  
- **Create New Team**:
  - Team name and description
  - Initial team manager assignment
  - Create empty or import members from another team

**2. Team Settings**

**Team Information:**

- **Team Name**: Editable
- **Team Description**: Optional
- **Team ID**: Unique identifier (read-only)
- **Created By**: Original creator
- **Creation Date**: Timestamp

**Team Member Management:**

- **Member List** (specific to this team):
  - Name, Email, Team Role, Joined Date
  - Filter and search
  
- **Team Roles**:
  - **Team Manager**: Full control over team and projects
  - **Integration Manager**: Manage integrations
  - **Analyst Developer**: Run scans, view results, generate reports
  - **Developer**: Run scans, view results
  - **Read-Only**: View dashboards only
  
- **Role Assignment**:
  - Multi-role support (user can have multiple team roles)
  - Drag-and-drop role assignment interface
  - Bulk role changes

**Project Portfolio:**

- **Projects in Team**: List view
- **Create New Project**: Button to add project
- **Transfer Project**: Move project to another team
- **Archive Project**: Soft delete (can be restored)
- **Delete Project**: Permanent deletion (with confirmation and warning)

**3. Integration Configuration**

**GitHub Integration:**

- **Connection Status**: Connected / Not Connected
- **GitHub App**: Link to install CybeDefend GitHub App
- **Connected Repositories**: List view
- **Add Repository**: Select from available repos
- **Permissions**: Display current permissions (read/write)
- **Webhook Status**: Active / Inactive / Error
- **Test Connection**: Button to verify integration health

**GitLab Integration:**

- **Connection Status**: Connected / Not Connected
- **GitLab Type**: GitLab.com / Self-Managed
- **Self-Managed URL**: If applicable
- **Connected Projects**: List view
- **Add Project**: Select from available projects
- **Permissions**: Display current permissions
- **Test Connection**: Button to verify integration health

**Container Registry Integrations:**

For each supported registry (Docker Hub, ECR, ACR, GCR, GHCR, GitLab, Quay):

- **Connection Status**: Active / Inactive / Error
- **Credentials**: Masked display, edit button
- **Test Connection**: Verify credentials validity
- **Connected**: Timestamp of last successful authentication
- **Remove Integration**: Disconnect and delete credentials

**4. Billing and Subscription Interface**

**Subscription Overview:**

- **Current Plan**: Free, Team, Business, Enterprise
- **Plan Details**:
  - Features included
  - Limitations
  - Pricing (if applicable)
  
- **Upgrade/Downgrade**: Buttons to change plan
- **Billing Cycle**: Monthly / Annual
- **Next Billing Date**: Timestamp
- **Payment Method**: Masked card number or payment method type

**Usage Metrics:**

- **Projects**: Current count / Plan limit
- **Team Members**: Current count / Plan limit
- **Scans**: This month's count / Monthly limit
- **Storage**: Current usage / Plan limit

**AI Credits** (if applicable):

- **Cybe Analysis Credits**:
  - Used this month
  - Remaining in plan
  - Overage charges (if any)
  - Purchase additional credits button
  
- **Cybe AutoFix Credits**:
  - Used this month
  - Remaining in plan
  - Purchase additional credits button
  
- **Cybe Security Champion Credits**:
  - Used this month
  - Remaining in plan
  - Purchase additional credits button

**Usage Graphs:**

- Historical usage over time
- Projection of usage for current month
- Alerts if approaching limits

**Invoice History:**

- **Table**: Date, Amount, Status (Paid/Pending/Overdue), Download PDF
- Filter by date range
- Export all invoices

**Add-Ons:**

- **Available Add-Ons**:
  - Additional AI credits
  - Advanced compliance reports
  - Premium support
  - Custom integrations
- **Purchase**: Add to subscription
- **Manage**: Remove or modify add-ons

**Payment Methods:**

- **Current Method**: Display masked card/bank account
- **Update Payment Method**: Form to change
- **Add Alternative Method**: For backup
- **Remove Method**: Delete payment method (requires another active method)

## 4.6 IDE and CLI Interfaces

**Developer-Centric Tools:**

**1. VS Code Extension Interface**

**Extension Sidebar:**

- **CybeDefend Panel** in VS Code activity bar (left sidebar)
- Icon: CybeDefend logo

**Panel Sections:**

**Authentication:**

- **Sign In Button**: Opens browser for OAuth or API key input
- **Account Info**: Display logged-in user and organization
- **Sign Out**: Disconnect account

**Organization & Project Selection:**

- **Organization Dropdown**: Select active organization
- **Team Dropdown**: Select active team (filters projects)
- **Project Dropdown**: Select active project for scanning
- **Create New Project**: Quick action button

**Scan Controls:**

- **Scan Workspace Button**: Triggers scan of currently open folder
- **Scan Progress Indicator**: Progress bar and status messages
- **Cancel Scan**: Abort running scan
- **Scan History**: Dropdown showing last 5 scans with timestamps

**Vulnerability Results:**

- **Tree View** organized by:
  - Severity (Critical, High, Medium, Low)
  - Scanner Type (SAST, IaC, SCA)
  - File path
  
- **Vulnerability Items**:
  - Collapsible tree nodes
  - Badge showing count
  - Click to navigate to vulnerability in code
  
- **Filtering**:
  - Filter by severity (checkboxes)
  - Filter by status
  - Search bar for free-text search

**Vulnerability Detail Panel** (when clicking vulnerability):

- **Title and Description**
- **Code Snippet**: Shows vulnerable code in mini-editor
- **Location**: File path and line number (clickable to jump)
- **Remediation Guidance**: How to fix
- **Actions**:
  - Mark as False Positive
  - Add Comment
  - Generate AutoFix (if available)
  - Chat with Cybe Security Champion
  - Open in Web UI

**MCP Configuration:**

- **MCP Setup Wizard**: One-click configuration for Cursor, Claude, Windsurf
- **Status Indicator**: Shows if MCP server is configured
- **Test MCP**: Verify MCP integration is working
- **Configuration File**: Display generated config (for manual setup)

**Status Bar Integration:**

- **Status Bar Item**: Shows scan status and vulnerability count
- **Click**: Opens CybeDefend panel
- **Hover**: Tooltip with quick summary

**2. JetBrains Plugin Interface**

**Tool Window:**

- **CybeDefend Tool Window** (bottom or side panel)
- Similar structure to VS Code extension

**Panels:**

- **Scan Control Panel**: Trigger scans, view progress
- **Results Panel**: Tree view of vulnerabilities
- **Details Panel**: Full vulnerability information

**Integration with JetBrains Features:**

- **Code Inspections**: CybeDefend vulnerabilities shown as inspections
- **Quick Fixes**: AutoFix available as IntelliJ quick fix action
- **Notifications**: IntelliJ notification system for scan completion

**3. CLI Interface**

**Command Structure:**

```bash
cybedefend [command] [subcommand] [flags]
```

**Main Commands:**

**`cybedefend scan`** - Execute security scan

```bash
cybedefend scan --dir /path/to/code --project-id abc123 --api-key xyz789
```

**Flags:**

- `--dir, -d`: Directory to scan (default: current directory)
- `--file, -f`: Path to pre-zipped file
- `--project-id`: Target project ID
- `--api-key`: API key for authentication (or use env var)
- `--region`: eu or us (or use config file)
- `--wait`: Wait for scan completion (default: false)
- `--ci`: CI-friendly output (minimal logging)
- `--break-on-severity`: Fail if severity found (critical, high, medium, low)
- `--break-on-fail`: Fail if scan errors
- `--output`: Output format (text, json, sarif)
- `--interval`: Polling interval when waiting (default: 5s)

**`cybedefend results`** - Fetch scan results

```bash
cybedefend results --project-id abc123 --type sast --output json
```

**Flags:**

- `--project-id`: Target project
- `--type`: sast, iac, sca, container (default: all)
- `--output`: json, text, html, sarif
- `--severity`: Filter by severity
- `--status`: Filter by status
- `--page`: Page number for paginated results
- `--all`: Fetch all pages (ignores --page)

**`cybedefend projects`** - Manage projects

```bash
cybedefend projects list
cybedefend projects create --name "New Project" --team-id xyz
cybedefend projects delete --id abc123
```

**Subcommands:**

- `list`: Show all projects
- `create`: Create new project
- `get`: Get project details
- `delete`: Delete project
- `update`: Modify project settings

**`cybedefend auth`** - Authentication

```bash
cybedefend auth login
cybedefend auth logout
cybedefend auth status
```

**Subcommands:**

- `login`: Authenticate with API key or OAuth
- `logout`: Clear stored credentials
- `status`: Show current authentication state

**`cybedefend config`** - Configuration management

```bash
cybedefend config set api-key xyz789
cybedefend config get api-url
cybedefend config list
```

**Subcommands:**

- `set`: Set configuration value
- `get`: Get configuration value
- `list`: Show all configuration
- `init`: Initialize config file interactively

**`cybedefend version`** - Show version

```bash
cybedefend version
```

**`cybedefend completion`** - Generate shell completion

```bash
cybedefend completion bash
cybedefend completion zsh
cybedefend completion fish
cybedefend completion powershell
```

**Output Examples:**

**Text Output (default):**

```
CybeDefend Security Scan
========================
Project: my-app (abc123)
Status: Completed
Duration: 2m 34s

Results:
  Critical: 2
  High: 8
  Medium: 15
  Low: 23

Scan ID: scan_xyz789
View results: https://app.cybedefend.com/projects/abc123/scans/scan_xyz789
```

**JSON Output:**

```json
{
  "scan_id": "scan_xyz789",
  "project_id": "abc123",
  "status": "completed",
  "duration_seconds": 154,
  "vulnerabilities": {
    "critical": 2,
    "high": 8,
    "medium": 15,
    "low": 23
  },
  "url": "https://app.cybedefend.com/projects/abc123/scans/scan_xyz789"
}
```

**Exit Codes:**

- `0`: Success
- `1`: General error
- `2`: Authentication error
- `3`: Scan failed
- `4`: Vulnerabilities found (when using --break-on-severity)
- `5`: Configuration error

---

# 5. Workflow and Processes

This section describes the key workflows and processes that govern how CybeDefend operates, from initial account setup through ongoing security management. Understanding these workflows is critical for appreciating how the platform integrates into development lifecycles and enables continuous security improvement.

## 5.1 Account Creation and Onboarding

**User Registration Flow:**

**Step 1: Initial Signup**

- User navigates to CybeDefend signup page
- Chooses authentication method:
  - **Email/Password**: Traditional registration with email verification
  - **OAuth2 Social Login**: 
    - Google
    - Microsoft
    - GitHub
    - GitLab
- Enters basic information (name, email, company)
- Agrees to Terms of Service and Privacy Policy

**Step 2: Email Verification** (for email/password signup)

- System sends verification email
- User clicks verification link
- Account activated

**Step 3: Region Selection**

- **Critical Decision**: Choose data residency
  - **Europe**: Data stored in EU, subject to GDPR and SecNumCloud
  - **United States**: Data stored in US, subject to SOC 2 and HIPAA
- Explanation of implications displayed
- **Important**: Cannot be changed after selection without creating new organization
- Affects:
  - Data storage location
  - API endpoint (api-eu.cybedefend.com vs. api-us.cybedefend.com)
  - Compliance certifications
  - LLM infrastructure location

**Step 4: Organization Creation**

- **Organization Name**: Company or team name
- **Organization Type**: (optional) SaaS, Enterprise, Open Source, etc.
- **Industry**: (optional) Finance, Healthcare, Technology, etc.
- User automatically becomes **Organization Administrator**
- Organization ID generated automatically

**Step 5: Plan Selection**

Choose subscription tier:

- **Free Plan**:
  - 1 project
  - 5 team members
  - Basic scanning (SAST, SCA, IaC, Container)
  - Community support
  - No AI features
  
- **Team Plan**:
  - 10 projects
  - 25 team members
  - All scanning types
  - Cybe Analysis (limited credits)
  - Email support
  
- **Business Plan**:
  - Unlimited projects
  - Unlimited team members
  - All scanning types
  - Full AI features (Cybe Analysis, AutoFix, Security Champion)
  - Priority support
  - Advanced reporting
  
- **Enterprise Plan**:
  - Everything in Business
  - Custom integrations
  - Dedicated support
  - SLA guarantees
  - On-premises deployment option (future)
  - Custom compliance requirements

Payment information collected (if paid plan selected)

**Step 6: Welcome Tour**

Interactive walkthrough of platform:

- Dashboard overview
- Creating first project
- Configuring integrations
- Running first scan
- Viewing results
- Inviting team members

Optional: Skip tour and go directly to dashboard

**Step 7: Quick Start Actions**

Guided prompts to:

- Create first project
- Connect GitHub or GitLab repository
- Configure VS Code extension or JetBrains plugin
- Run initial scan
- Invite team members

**Onboarding Complete**

User has functional CybeDefend environment ready for security scanning.

## 5.2 Scan Lifecycle - Complete Process

**From Trigger to Results:**

**1. Scan Initialization**

**Trigger Sources:**

- **Manual Dashboard**: User clicks "Run Scan" button
- **Scheduled**: Automatic based on frequency configuration
- **CLI**: `cybedefend scan` command executed
- **IDE**: Scan triggered from VS Code or JetBrains
- **CI/CD Pipeline**: Scan step in pipeline
- **API**: Programmatic scan trigger
- **Webhook** (future): Repository push or PR event

**Pre-Scan Validation:**

- Verify authentication (API key or OAuth token)
- Check project permissions
- Validate project configuration
- Confirm scanner selections
- Verify AI feature eligibility
- Check subscription limits (scans per month, project count)

**Scan Creation:**

- Generate unique Scan ID
- Create scan record in database
- Status set to "Pending"
- Queue scan job for execution
- Return Scan ID to user

**2. Scan Preparation**

**Environment Provisioning:**

- **Kubernetes Pod Allocation**: Spin up isolated container for scan
- **Resource Limits**: CPU, memory, and storage constraints applied
- **Security Isolation**: Network policies prevent external access
- **Ephemeral Storage**: Temporary volume for code and scan artifacts

**Code Acquisition:**

For **Connected Repositories**:

- Clone repository from GitHub/GitLab
- Checkout specified branch
- Shallow clone (recent commits only) for efficiency
- Respect .gitignore patterns

For **Manual Uploads**:

- Download ZIP file from object storage
- Extract to scan workspace
- Validate file structure

For **Container Images**:

- Pull image from registry (Docker Hub, ECR, etc.)
- Authenticate with registry credentials
- Download image layers
- Extract filesystem for analysis

**Configuration Loading:**

- Load project scan settings
- Retrieve scanner configurations
- Load custom rules (if any)
- Prepare AI analysis configuration

**3. Scan Execution**

**Sequential Scanner Execution:**

Each enabled scanner runs in order:

**SAST (Static Application Security Testing):**

- **Language Detection**: Auto-detect languages in codebase
- **Opengrep Execution**: Run security rules against code
- **Pattern Matching**: Identify vulnerability patterns
- **CybeDefend Engine Processing**: Aggregate and normalize results
- **Output**: List of potential vulnerabilities with file locations and line numbers

**IaC (Infrastructure as Code):**

- **File Detection**: Identify IaC files (Terraform, CloudFormation, Kubernetes, Ansible)
- **Checkov Execution**: Policy-as-code checks
- **KICS Execution**: Keeping Infrastructure as Code Secure
- **Trivy Execution**: Additional IaC scanning
- **CybeDefend Engine**: Aggregate and deduplicate findings
- **Output**: Infrastructure misconfigurations and compliance violations

**SCA (Software Composition Analysis):**

- **Lockfile Detection**: Find package-lock.json, Gemfile.lock, requirements.txt, etc.
- **Dependency Parsing**: Extract all dependencies and versions
- **Vulnerability Matching**: Compare against GitHub Advisories database
- **Transitive Analysis**: Identify vulnerabilities in indirect dependencies
- **CybeDefend Engine**: Normalize CVE data and enrichment
- **Output**: List of vulnerable dependencies with CVE details and fix versions

**Container Security:**

- **Layer Analysis**: Examine each container layer
- **OS Package Scanning**: Detect vulnerabilities in base image packages
- **Application Dependency Scanning**: Analyze dependencies in container
- **Secret Detection**: Find exposed credentials, API keys
- **Configuration Analysis**: Check for insecure configurations
- **Output**: Container vulnerabilities and security issues

**Dockerfile Scanning** (if Dockerfiles present):

- **Best Practice Checks**: Validate against Docker security guidelines
- **Vulnerability Detection**: Identify risky patterns
- **Output**: Dockerfile-specific recommendations

**Result Batching:**

- Scanners send results to CybeDefend Engine in real-time
- Engine batches results (50 vulnerabilities per batch)
- Sends batches to Gateway for processing
- Enables streaming results to dashboard

**4. AI Analysis** (if enabled)

**Knowledge Graph Construction:**

- **Code Parsing**: Parse entire codebase into Abstract Syntax Tree (AST)
- **Symbol Extraction**: Identify functions, classes, variables
- **Relationship Mapping**: Build dependency graph
- **Dataflow Analysis**: Track data from sources to sinks
- **Knowledge Graph Storage**: Store in sovereign cloud (EU or US)
- **Time**: Usually 30-60 seconds for medium-sized projects

**Cybe Analysis Execution:**

For each detected SAST vulnerability (or selected vulnerability groups):

- **Retrieve Vulnerability Context**: Code location, type, description
- **Query Knowledge Graph**: Get full code context and dataflows
- **LLM Analysis**: Send context to regional LLM for analysis
- **Exploitability Assessment**: Determine if truly exploitable
- **False Positive Detection**: Identify non-exploitable issues
- **Priority Assignment** (if triage enabled): Calculate priority based on risk and exploitability
- **Commentary Generation**: Create expert-level explanation
- **Store Results**: Save analysis to database, link to vulnerability

**Selective Analysis** (if enabled):

- Only analyze vulnerabilities in selected groups (SQL Injection, XSS, etc.)
- Skip unselected groups to save AI credits
- More efficient for large codebases

**Batch Processing:**

- AI analyses multiple vulnerabilities in parallel
- Optimized for performance and cost
- Results streamed to dashboard as completed

**5. Result Processing**

**CybeDefend Gateway:**

- **Receive Batches**: Accept vulnerability batches from Engine
- **Validation**: Ensure data integrity
- **Enrichment**: Add OWASP mapping, CWE references
- **Deduplication**: Remove identical findings from multiple scanners
- **Normalization**: Standardize severity levels and descriptions

**Analysis & Reporting Service:**

- **Database Storage**: Insert vulnerabilities into database
- **History Tracking**: Check for re-detections of previous vulnerabilities
- **Status Assignment**: 
  - New vulnerabilities: "To Verify"
  - AI-confirmed false positives: "Not Exploitable"
  - Previously resolved but reappeared: "To Verify" (history preserved)
- **Notification Triggers**: Email alerts for critical findings (if enabled)
- **Dashboard Updates**: Real-time push to web interface

**6. Scan Completion**

**Finalization:**

- All scanner results processed
- All AI analyses completed (if enabled)
- Dashboard updated with complete results
- Scan status updated to "Completed"
- Scan duration calculated and logged
- Statistics generated:
  - Total vulnerabilities by severity
  - Scanner-specific counts
  - AI analysis coverage
  - Comparison with previous scans

**Resource Cleanup:**

- Scan container terminated
- Ephemeral storage deleted
- Code copy removed (unless AI enabled—then stored in knowledge graph)
- Network resources released
- Kubernetes pod deallocated

**User Notification:**

- Dashboard updated immediately (real-time)
- Email notification sent (if enabled)
- Webhook fired (future feature)
- CLI returns results (if --wait flag used)
- IDE extension shows notification

**7. Post-Scan Activities**

**Vulnerability Review:**

- Team reviews new findings
- Triages priorities
- Adds comments
- Assigns remediation tasks

**Remediation:**

- Developers fix vulnerabilities
- Cybe AutoFix generates PRs (if enabled)
- Manual code changes committed
- Next scan validates fixes

**Compliance Tracking:**

- Generate reports for auditors
- Track remediation progress
- Monitor security posture trends

**Continuous Improvement:**

- Adjust scan configuration based on findings
- Fine-tune scanner settings
- Optimize AI feature usage
- Improve integration workflows

## 5.3 Vulnerability Management Process

**From Detection to Resolution:**

**1. Vulnerability Detection**

**Initial Discovery:**

- Vulnerability identified during scan
- Assigned unique Vulnerability ID
- Default status: "To Verify"
- Metadata captured:
  - Type (SQL Injection, CVE-2023-xxxx, etc.)
  - Severity (Critical, High, Medium, Low)
  - Scanner (SAST, IaC, SCA, Container)
  - Location (file, line number, or package)
  - Detection timestamp
  - Scan ID

**AI Analysis** (if enabled):

- Cybe Analysis evaluates exploitability
- Determines if false positive
- Assigns priority (if triage enabled)
- Adds expert commentary
- Visualizes dataflow (SAST only)

**Dashboard Appearance:**

- Vulnerability appears in project vulnerability list
- Filters set to show "To Verify" by default
- Team members notified (if alerts enabled)

**2. Triage and Validation**

**Weekly Triage Session** (Recommended Best Practice):

**Participants:**

- Security Lead
- Development Team Representatives
- Product Owner (optional)

**Agenda:**

1. **Filter to "To Verify"** vulnerabilities
2. **Review AI Analysis** (if available):
   - Read Cybe Analysis commentary
   - Assess exploitability determination
   - Evaluate priority suggestions
3. **Validate Each Finding**:
   - **Confirmed**: Real, exploitable vulnerability → Change status to "Confirmed"
   - **False Positive**: Not exploitable → Change status to "Not Exploitable"
   - **Needs Investigation**: Unclear → Assign to developer for deeper analysis
4. **Assign Priorities**:
   - Manual override if disagreeing with AI priority
   - Consider business context (e.g., customer-facing vs. internal tool)
   - Balance with sprint capacity
5. **Plan Remediation**:
   - Assign to developers (future feature)
   - Set target resolution dates (future feature)
   - Trigger Cybe AutoFix for eligible vulnerabilities

**Individual Developer Review:**

- Developers can review vulnerabilities assigned to their code
- Use IDE extension to see findings in context
- Add comments with investigation notes
- Propose status changes (e.g., "Proposed Not Exploitable")

**Status Change Workflow:**

**"To Verify" → "Confirmed"**:

- Validated as real vulnerability
- Requires remediation
- Ready for fix assignment

**"To Verify" → "Not Exploitable"**:

- Determined to be false positive
- Removed from active remediation queue
- Comment explaining reasoning recommended

**"To Verify" → "Proposed Not Exploitable"**:

- Developer suggests it's false positive
- Requires security lead approval
- Comment with justification required

**"Proposed Not Exploitable" → "Not Exploitable"**:

- Security lead approves proposal
- Status finalized

**"Proposed Not Exploitable" → "Confirmed"**:

- Security lead rejects proposal
- Vulnerability requires fix

**"Confirmed" → "In Progress"**:

- Developer actively working on fix
- Optional status for tracking

**3. Remediation**

**Manual Remediation:**

**Developer Workflow:**

1. **Review Vulnerability Details**:
   - Read description and exploitation scenario
   - Study remediation guidance
   - Examine code snippet
   - Review dataflow (if SAST with Cybe Analysis)
   
2. **Implement Fix**:
   - Write secure code following best practices
   - Test fix locally
   - Verify vulnerability no longer exists
   
3. **Commit and Push**:
   - Commit changes with reference to vulnerability ID
   - Push to repository
   - Create pull request for review
   
4. **Code Review**:
   - Security-conscious review by peers
   - Verify fix effectiveness
   - Check for regression or side effects
   
5. **Merge**:
   - Merge PR to default branch
   - Trigger new scan to validate fix

**Automated Remediation (Cybe AutoFix):**

**Process:**

1. **Generate Fix**:
   - User clicks "Generate Fix" on confirmed vulnerability
   - Cybe AutoFix analyzes vulnerability using knowledge graph
   - Considers full application context
   - Generates context-aware code fix
   - Creates preview of changes
   
2. **Review Generated Fix**:
   - Diff view shows proposed changes
   - Explanation of what fix does and why
   - Developer reviews for correctness
   
3. **Create Pull/Merge Request**:
   - User approves fix generation
   - CybeDefend creates PR on GitHub or MR on GitLab
   - PR includes:
     - Clear title and description
     - Vulnerability explanation
     - Fix approach
     - Testing recommendations
     - Auto-labels (security, high-priority)
   
4. **CI/CD Checks**:
   - Automated tests run on PR
   - New scan can be triggered
   - Verify no new vulnerabilities introduced
   
5. **Code Review and Merge**:
   - Team reviews AI-generated fix
   - Approves and merges
   - Fix deployed to production

**SCA Remediation (Dependency Updates):**

**Process:**

1. **Identify Fix Version**:
   - CybeDefend shows current version and fixed version
   - Provides update command
   - Example: `npm update package@1.2.3`
   
2. **Update Dependency**:
   - Run update command locally
   - Update lockfile
   - Test application thoroughly
   
3. **Verify Compatibility**:
   - Ensure no breaking changes
   - Run test suite
   - Check for deprecation warnings
   
4. **Commit and Deploy**:
   - Commit updated lockfile
   - Push changes
   - Next scan confirms vulnerability resolved

**IaC Remediation:**

1. **Update Configuration**:
   - Modify Terraform/CloudFormation files
   - Apply secure configuration practices
   - Example: Enable encryption, restrict access
   
2. **Validate Changes**:
   - Run `terraform plan` or equivalent
   - Review infrastructure changes
   
3. **Apply and Scan**:
   - Apply infrastructure changes
   - Rescan to confirm issue resolved

**Container Remediation:**

1. **Update Base Image**:
   - Use newer, patched base image
   - Example: `FROM ubuntu:22.04` → `FROM ubuntu:22.04.1`
   
2. **Rebuild Image**:
   - Rebuild container with updated base
   - Rescan image
   
3. **Deploy New Image**:
   - Push to registry
   - Update deployment to use new tag

**4. Verification**

**Automatic Resolution Detection:**

- Next scan runs on updated code
- CybeDefend checks for previously detected vulnerabilities
- If vulnerability no longer present:
  - Status automatically updated to "Resolved"
  - Resolution timestamp recorded
  - History entry created
  - Team notified (if alerts enabled)

**Manual Verification:**

- Security lead reviews resolved vulnerabilities
- Confirms fix is appropriate
- Checks for regression in subsequent scans

**Re-Detection Handling:**

- If previously resolved vulnerability reappears:
  - Maintains original Vulnerability ID
  - Status updated from "Resolved" to "To Verify"
  - History shows complete timeline including resolution and re-detection
  - Team alerted to regression

**5. Continuous Monitoring**

**Ongoing Tracking:**

- Vulnerability history preserved indefinitely
- Trends analyzed:
  - Mean Time to Resolve (MTTR)
  - Resolution rate
  - Re-detection frequency
  - False positive patterns
  
**Metrics and Reporting:**

- Track remediation progress
- Generate compliance reports
- Executive dashboards showing security improvements
- Identify systemic issues (e.g., same vulnerability type recurring)

**Feedback Loop:**

- Learn from resolved vulnerabilities
- Improve development practices
- Update coding standards
- Enhance security training

## 5.4 Team Collaboration Workflow

**Effective Security Management Through Collaboration:**

**1. Team Formation**

- Organization Manager or Administrator creates team
- Assigns Team Manager role
- Defines team purpose (e.g., "Backend Team", "Mobile Team", "Security Team")
- Associates projects with team

**2. Member Onboarding**

- Team Manager invites members
- Assigns appropriate roles:
  - **Team Manager**: Team leads, security leads
  - **Integration Manager**: DevOps engineers
  - **Analyst Developer**: Senior developers, security champions
  - **Developer**: Regular developers
  - **Read-Only**: Product managers, executives
  
- New members receive invitation email
- Accept invitation to join team
- Gain access to team's projects

**3. Regular Security Meetings**

**Weekly Triage** (Recommended):

- Review new "To Verify" vulnerabilities
- Validate findings
- Assign priorities
- Distribute remediation tasks
- Track progress on in-flight fixes

**Monthly Security Review**:

- Review security trends
- Assess MTTR and resolution rates
- Identify recurring vulnerability patterns
- Plan security improvements
- Celebrate wins (vulnerabilities eliminated)

**4. Asynchronous Collaboration**

**Comment System:**

- Add context to vulnerabilities
- Ask questions about exploitability
- Explain why something is false positive
- Document fix approaches
- Mention team members for input

**Status Updates:**

- Change vulnerability status as investigation progresses
- Visible to all team members
- Audit trail maintained

**Cybe Security Champion Collaboration:**

- Developers consult AI expert independently
- Share insights from AI in comments
- Use AI recommendations to inform team discussions

**5. Cross-Team Collaboration**

**Shared Vulnerabilities:**

- Vulnerabilities affecting multiple teams
- Cross-team coordination for fixes
- Shared knowledge base

**Organization-Wide Initiatives:**

- Security champions from each team
- Share best practices
- Coordinate on organization-wide security goals

## 5.5 Compliance and Audit Workflow

**Maintaining Regulatory Compliance:**

**1. Continuous Compliance Monitoring**

- Regular scans ensure ongoing compliance
- Map vulnerabilities to compliance requirements (OWASP, PCI-DSS, HIPAA)
- Track compliance posture over time
- Identify compliance gaps

**2. Audit Preparation**

**Pre-Audit:**

- Generate compliance reports
- Export vulnerability history
- Document remediation activities
- Prepare evidence of security controls

**During Audit:**

- Provide auditors with read-only access (optional)
- Export detailed reports
- Show audit trail (all user activities logged)
- Demonstrate continuous security improvement

**Post-Audit:**

- Address auditor findings
- Update compliance configurations
- Implement recommended improvements

**3. Regulatory Reporting**

- Generate periodic compliance reports
- Submit to regulatory bodies as required
- Maintain documentation for compliance audits
- Track changes in compliance requirements

**4. Internal Security Audits**

- Security team reviews organization's security posture
- Identifies underperforming projects
- Recommends process improvements
- Validates that security policies are followed

---

# 6. Billing and Subscription Management

CybeDefend offers flexible pricing models designed to accommodate organizations of all sizes, from individual developers to large enterprises. The billing system is transparent, predictable, and scalable, with clear visibility into usage and costs.

## 6.1 Subscription Tiers

**Overview of Available Plans:**

**1. Free Plan**

**Target Audience**: Individual developers, open-source projects, small teams evaluating the platform

**Features:**

- **Projects**: 1 project
- **Team Members**: Up to 5 users
- **Scanning**:
  - SAST (all supported languages)
  - IaC security
  - SCA (dependency scanning)
  - Container security
- **Scan Frequency**: Manual scans only
- **Integrations**:
  - GitHub / GitLab repository connection
  - VS Code and JetBrains IDE extensions
  - CLI tool
  - CI/CD integration
- **Support**: Community forum
- **AI Features**: Not included
- **Data Storage**: Selected sovereign cloud (EU or US)
- **Reporting**: Basic reports (PDF, CSV)

**Limitations:**

- No AI-powered analysis (Cybe Analysis, AutoFix, Security Champion)
- No automated scanning
- Single project limitation
- Community support only

**Price**: **Free** (no credit card required)

**2. Team Plan**

**Target Audience**: Growing teams, startups, small-to-medium businesses

**Features:**

- **Projects**: Up to 10 projects
- **Team Members**: Up to 25 users
- **Scanning**: All scanner types (SAST, IaC, SCA, Container)
- **Scan Frequency**: Automated daily or weekly scans
- **Integrations**: Full integration suite
- **Support**: Email support (24-48 hour response)
- **AI Features**:
  - **Cybe Analysis**: 500 vulnerability analyses per month
  - **Cybe AutoFix**: 100 fix generations per month
  - **Cybe Security Champion**: 200 chat interactions per month
- **Data Storage**: Sovereign cloud with encryption
- **Reporting**: Advanced reports (PDF, Excel, JSON, SARIF)
- **Compliance**: OWASP Top 10 mapping

**Limitations:**

- Project and user limits
- Limited AI credits (can purchase add-ons)
- Standard support SLA

**Price**: **$299/month** (billed monthly) or **$2,990/year** (save 17%, billed annually)

**3. Business Plan**

**Target Audience**: Medium-to-large enterprises, security-focused organizations

**Features:**

- **Projects**: Unlimited projects
- **Team Members**: Unlimited users
- **Scanning**: All scanner types with priority execution
- **Scan Frequency**: Full automation (daily, weekly, on-commit, on-PR - future)
- **Integrations**: Full suite + custom integration support
- **Support**: Priority email + live chat support (4-hour response)
- **AI Features**:
  - **Cybe Analysis**: 5,000 vulnerability analyses per month
  - **Cybe AutoFix**: 1,000 fix generations per month
  - **Cybe Security Champion**: Unlimited chat interactions
- **Data Storage**: Sovereign cloud with advanced encryption
- **Reporting**: 
  - All report types
  - Custom branding
  - Scheduled reports
  - Compliance reports (OWASP, PCI-DSS, HIPAA, SOC 2)
- **Advanced Features**:
  - Vulnerability triage automation
  - Selective vulnerability group analysis
  - Team performance analytics
  - API access for custom integrations

**Limitations:**

- AI credit limits (can purchase add-ons)

**Price**: **$999/month** (billed monthly) or **$9,990/year** (save 17%, billed annually)

**4. Enterprise Plan**

**Target Audience**: Large enterprises, regulated industries, custom requirements

**Features:**

- **Everything in Business Plan**
- **Custom AI Credits**: Negotiable, based on volume
- **Dedicated Support**:
  - Dedicated customer success manager
  - 1-hour response SLA
  - Quarterly business reviews
  - Training and onboarding assistance
- **Custom Integrations**:
  - Bespoke integration development
  - API customization
  - Webhook configurations
- **Advanced Security**:
  - SSO (SAML, OIDC)
  - Advanced RBAC/ReBAC customization
  - IP whitelisting
  - Audit logging with extended retention
- **Compliance**:
  - Custom compliance framework support
  - Dedicated compliance reporting
  - Regulatory consultation
- **Deployment Options** (future):
  - On-premises deployment
  - Private cloud deployment
  - Hybrid deployment
- **SLA Guarantees**:
  - 99.9% uptime SLA
  - Dedicated infrastructure (optional)

**Price**: **Custom pricing** (contact sales)

## 6.2 AI Credit System

**Understanding AI Credits:**

AI features (Cybe Analysis, Cybe AutoFix, Cybe Security Champion) consume credits based on usage to ensure fair, transparent pricing aligned with computational costs.

**Credit Consumption:**

| AI Feature | Credits per Use | Description |
|------------|----------------|-------------|
| **Cybe Analysis** | 1 credit | Analyzing one vulnerability for exploitability, false positive detection, priority assignment |
| **Cybe AutoFix** | 5 credits | Generating context-aware code fix and creating pull/merge request for one vulnerability |
| **Cybe Security Champion** | 1 credit | One chat interaction (question + response) |

**Monthly Credit Allocations:**

| Plan | Cybe Analysis | Cybe AutoFix | Cybe Security Champion |
|------|---------------|--------------|------------------------|
| **Free** | 0 | 0 | 0 |
| **Team** | 500 | 100 | 200 |
| **Business** | 5,000 | 1,000 | Unlimited |
| **Enterprise** | Custom | Custom | Unlimited |

**Credit Rollover:**

- **Team and Business Plans**: Unused credits **do not** roll over to next month
- **Enterprise Plans**: Negotiable rollover terms

**Add-On Credit Packages:**

If monthly allocation exhausted:

**Cybe Analysis Add-Ons:**

- **500 credits**: $49/month
- **1,000 credits**: $89/month
- **5,000 credits**: $399/month

**Cybe AutoFix Add-Ons:**

- **100 fixes**: $99/month
- **500 fixes**: $449/month
- **1,000 fixes**: $799/month

**Cybe Security Champion Add-Ons** (Team plan only):

- **500 interactions**: $29/month
- **1,000 interactions**: $49/month
- **Unlimited**: Upgrade to Business plan

**Credit Usage Tracking:**

- Real-time visibility in dashboard
- Usage alerts at 75%, 90%, 100% of allocation
- Historical usage trends
- Per-project usage breakdown
- Recommendations for optimal plan

## 6.3 Billing Interface

**Subscription Management Dashboard:**

**1. Current Subscription Overview**

- **Plan Name**: Free, Team, Business, or Enterprise
- **Status**: Active, Trial, Suspended, Canceled
- **Renewal Date**: Next billing date
- **Billing Cycle**: Monthly or Annual
- **Total Cost**: Amount charged per cycle

**2. Usage Metrics**

**Project Usage:**

- Current: X projects
- Plan Limit: Y projects (or "Unlimited")
- Usage Percentage: Visual progress bar

**User Usage:**

- Current: X team members
- Plan Limit: Y members (or "Unlimited")
- Usage Percentage: Visual progress bar

**Scan Usage:**

- Scans this month: X
- Historical average: Y scans/month
- Trend graph

**AI Credit Usage:**

- **Cybe Analysis**:
  - Used this month: X / Y allocated
  - Remaining: Z credits
  - Usage graph
  - Projected end-of-month usage
  
- **Cybe AutoFix**:
  - Used this month: X / Y allocated
  - Remaining: Z credits
  - Usage graph
  
- **Cybe Security Champion**:
  - Used this month: X interactions (Unlimited for Business+)
  - Usage graph (Team plan only)

**3. Billing History**

**Invoice Table:**

| Invoice Date | Amount | Status | Description | Download |
|--------------|--------|--------|-------------|----------|
| 2025-10-01 | $299.00 | Paid | Team Plan (Monthly) | PDF |
| 2025-09-01 | $299.00 | Paid | Team Plan (Monthly) | PDF |
| 2025-08-01 | $299.00 | Paid | Team Plan (Monthly) | PDF |

**Filters:**

- Date range
- Status (Paid, Pending, Overdue, Refunded)
- Export all invoices (ZIP of PDFs)

**4. Payment Methods**

**Current Payment Method:**

- Card type and last 4 digits (e.g., "Visa •••• 4242")
- Expiration date
- Billing address
- Default payment method indicator

**Actions:**

- **Update Payment Method**: Change card or add bank account
- **Add Payment Method**: Add backup payment method
- **Remove Payment Method**: Delete (requires another active method)

**5. Subscription Actions**

**Upgrade Plan:**

- Button to upgrade to higher tier
- Shows additional features gained
- Prorated pricing explanation
- Instant upgrade (no waiting for renewal)

**Downgrade Plan:**

- Button to downgrade to lower tier
- Shows features that will be lost
- Effective at end of current billing cycle
- Confirmation required

**Change Billing Cycle:**

- Switch between Monthly and Annual
- Show savings with Annual (17% discount)
- Prorated adjustment

**Add-Ons Management:**

- **Purchase AI Credit Add-Ons**:
  - Select package
  - Add to subscription
  - Immediate availability
  
- **Manage Add-Ons**:
  - View active add-ons
  - Remove add-ons (effective next billing cycle)
  - Upgrade/downgrade add-on packages

**Cancel Subscription:**

- **Initiate Cancellation**: Button with confirmation warning
- **Cancellation Survey**: Optional feedback
- **Effective Date**: End of current billing period
- **Data Retention**: Explanation of what happens to data
- **Reactivation**: Option to reactivate before end of cycle

## 6.4 Enterprise Custom Pricing

**For Enterprise Plans:**

**Custom Quote Request:**

- **Contact Sales Form**:
  - Company name
  - Number of projects (estimate)
  - Number of team members
  - Expected scan volume
  - AI feature requirements
  - Compliance needs
  - Integration requirements
  - Desired deployment model (cloud, on-prem)
  - Budget range (optional)

**Sales Process:**

1. **Discovery Call**: Understanding requirements
2. **Custom Proposal**: Tailored pricing and feature set
3. **POC/Trial**: Enterprise trial period (optional)
4. **Contract Negotiation**: Terms, SLAs, customizations
5. **Onboarding**: Dedicated onboarding and training

**Typical Enterprise Pricing Factors:**

- Base platform fee
- Per-user pricing (volume discounts)
- AI credit allocation (bulk pricing)
- Support tier selection
- Custom integration development
- On-premises deployment (if applicable)
- Training and professional services

---

# 7. Technical Architecture

This section provides a high-level overview of CybeDefend's technical architecture, focusing on the key components, technologies, and design principles that enable the platform's functionality, scalability, and security.

## 7.1 System Architecture Overview

**Microservices-Based Architecture:**

CybeDefend is built on a modern microservices architecture, enabling:

- **Scalability**: Independent scaling of services based on demand
- **Resilience**: Fault isolation prevents cascading failures
- **Maintainability**: Services can be updated independently
- **Technology Diversity**: Use best tool for each service

**Core Architectural Principles:**

1. **Security by Design**: Security considerations at every layer
2. **Data Sovereignty**: Respect geographical data boundaries
3. **High Availability**: Redundancy and failover mechanisms
4. **Performance Optimization**: Efficient resource utilization
5. **API-First**: All functionality exposed via APIs
6. **Cloud-Native**: Leveraging cloud infrastructure capabilities

## 7.2 Key System Components

**1. Frontend Layer**

**Web Application:**

- **Technology**: React.js with TypeScript
- **State Management**: Redux or Context API
- **UI Components**: Custom component library + Material-UI
- **Real-Time Updates**: WebSocket connections for live scan results
- **Responsive Design**: Desktop and tablet optimized
- **Accessibility**: WCAG 2.1 AA compliance

**IDE Extensions:**

- **VS Code Extension**: TypeScript-based extension using VS Code API
- **JetBrains Plugin**: Kotlin-based plugin for IntelliJ Platform
- **Communication**: REST API calls to CybeDefend backend

**CLI Tool:**

- **Technology**: Go (for cross-platform compilation)
- **Distribution**: Binary releases for Linux, macOS, Windows
- **Features**: Scan execution, result retrieval, project management

**2. API Gateway**

**Purpose**: Single entry point for all client requests

**Responsibilities:**

- **Authentication and Authorization**: Validate JWT tokens, API keys
- **Request Routing**: Direct requests to appropriate microservices
- **Rate Limiting**: Prevent abuse and ensure fair usage
- **Load Balancing**: Distribute traffic across service instances
- **CORS Handling**: Manage cross-origin requests
- **Request/Response Transformation**: Normalize data formats
- **Logging and Monitoring**: Centralized request logging

**Technology**: Kong, Nginx, or custom Go-based gateway

**3. Identity and Access Management (IAM)**

**Authentication Service:**

- **OAuth2 Providers**: Google, Microsoft, GitHub, GitLab integration
- **JWT Token Generation**: Secure, short-lived access tokens
- **Refresh Token Management**: Long-lived tokens for session persistence
- **API Key Management**: Generate, revoke, rotate API keys
- **Multi-Factor Authentication** (future): Enhanced security option

**Authorization Service:**

- **ReBAC Implementation**: Relationship-Based Access Control using Permify or equivalent
- **Role Management**: Organization and team roles
- **Permission Evaluation**: Real-time permission checks
- **Policy Engine**: Define and enforce access policies

**Technology**: Custom service integrated with Permify (open-source ReBAC)

**4. Security Scanning Service**

**Scan Orchestration:**

- **Job Queue**: Manage scan requests (Redis Queue, AWS SQS, Google Cloud Tasks)
- **Kubernetes Integration**: Spin up scan pods dynamically
- **Resource Management**: CPU, memory, storage limits
- **Scanner Execution**: Orchestrate SAST, IaC, SCA, Container scanners
- **Result Aggregation**: Collect and batch results

**Scanner Integrations:**

- **SAST**: CybeDefend Engine + Opengrep (fork of Semgrep)
- **IaC**: Checkov, KICS, Trivy
- **SCA**: Custom engine + GitHub Advisories API
- **Container**: Trivy, custom image analyzer

**Technology**: Go or Python microservice, Kubernetes for container orchestration

**5. Analysis and Reporting Service**

**Vulnerability Processing:**

- **Data Normalization**: Standardize findings from different scanners
- **Deduplication**: Eliminate duplicate vulnerabilities
- **OWASP Mapping**: Categorize by OWASP Top 10
- **CWE Enrichment**: Add Common Weakness Enumeration references
- **CVSS Scoring**: Calculate or retrieve severity scores

**Report Generation:**

- **PDF Generation**: Libraries like wkhtmltopdf, Puppeteer
- **Excel Export**: Libraries like OpenPyXL, ExcelJS
- **SARIF Export**: Static Analysis Results Interchange Format
- **Custom Branding**: Apply logos, color schemes

**Technology**: Python or Node.js service

**6. AI Services**

**Knowledge Graph Service:**

- **Code Parsing**: AST generation using language-specific parsers (Tree-sitter)
- **Symbol Extraction**: Functions, classes, variables, imports
- **Dataflow Analysis**: Track data from sources to sinks
- **Graph Database**: Store relationships (Neo4j, custom graph store)
- **Query API**: Enable AI agents to query code structure

**Cybe Analysis Service:**

- **LLM Integration**: Regional LLMs (Anthropic Claude, OpenAI GPT, custom models)
- **Prompt Engineering**: Carefully crafted prompts for accurate analysis
- **Exploitability Evaluation**: Dataflow-based assessment
- **False Positive Detection**: Pattern recognition and context analysis
- **Priority Assignment**: Risk-based scoring algorithm

**Cybe AutoFix Service:**

- **Context Retrieval**: Query knowledge graph for full context
- **Fix Generation**: LLM-based code generation
- **Multi-File Coordination**: Orchestrate changes across files
- **Validation**: Syntax checking, basic semantic validation
- **PR/MR Creation**: GitHub/GitLab API integration

**Cybe Security Champion Service:**

- **Chat Interface**: WebSocket or Server-Sent Events for real-time chat
- **Conversation Context**: Maintain chat history
- **Knowledge Graph Queries**: Answer codebase questions
- **Vulnerability Context**: Pre-load vulnerability details
- **LLM Interaction**: Streaming responses for better UX

**Technology**: Python (FastAPI), deployed in sovereign clouds, separate EU and US instances

**7. Data Storage Layer**

**Primary Database:**

- **Technology**: PostgreSQL (relational data)
- **Schema**:
  - Organizations, teams, users, roles
  - Projects, scans, vulnerabilities
  - Vulnerability history, comments, statuses
  - Audit logs
- **Replication**: Multi-region replication for high availability
- **Backups**: Automated daily backups with point-in-time recovery

**Knowledge Graph Storage:**

- **Technology**: Neo4j, custom graph database, or object storage with graph structure
- **Data**: Parsed code, relationships, dataflows
- **Location**: Sovereign cloud (EU or US based on user selection)
- **Encryption**: At rest and in transit

**Object Storage:**

- **Purpose**: Store large files (uploaded ZIPs, container images, reports)
- **Technology**: AWS S3, Google Cloud Storage, Azure Blob Storage
- **Location**: Sovereign cloud regions
- **Lifecycle Policies**: Auto-delete temporary files after scan completion

**Cache Layer:**

- **Technology**: Redis
- **Purpose**: Session storage, rate limiting, temporary scan data
- **TTL Policies**: Automatic expiration for ephemeral data

**8. Message Queue / Event Bus**

**Purpose**: Asynchronous communication between services

**Use Cases:**

- Scan job queuing
- Notification triggers
- Webhook delivery
- AI analysis job distribution

**Technology**: Apache Kafka, AWS SQS, Google Cloud Pub/Sub, or Redis Streams

**9. Logging and Monitoring**

**Centralized Logging:**

- **Log Aggregation**: Collect logs from all services
- **Technology**: ELK Stack (Elasticsearch, Logstash, Kibana), Grafana Loki
- **Retention**: Configurable retention policies (e.g., 90 days)
- **Search and Analysis**: Full-text search, filtering, visualization

**Monitoring and Alerting:**

- **Metrics Collection**: Prometheus, Datadog, New Relic
- **Dashboards**: Grafana, custom dashboards
- **Alerts**: PagerDuty, Slack, email notifications
- **Health Checks**: Service health endpoints, automatic recovery

**Distributed Tracing:**

- **Technology**: Jaeger, OpenTelemetry
- **Purpose**: Track requests across microservices
- **Performance Analysis**: Identify bottlenecks

**10. Integration Layer**

**External API Integrations:**

- **GitHub API**: Repository access, PR creation
- **GitLab API**: Project access, MR creation
- **Container Registries**: Docker Hub, ECR, ACR, GCR, GHCR, Quay
- **GitHub Advisories API**: CVE data for SCA

**Webhooks** (future):

- **Inbound**: Receive events from GitHub, GitLab (commits, PRs)
- **Outbound**: Send events to external systems (scan completion, critical vulnerabilities)

## 7.3 Deployment Architecture

**Cloud Infrastructure:**

**Multi-Region Deployment:**

- **European Region**: EU-based cloud provider (AWS eu-west-1, Google europe-west1, Azure West Europe)
- **US Region**: US-based cloud provider (AWS us-east-1, Google us-central1, Azure East US)
- **Isolation**: Complete data isolation between regions
- **Independent Scaling**: Each region scales independently

**Kubernetes Clusters:**

- **Service Deployment**: All microservices deployed as Kubernetes pods
- **Auto-Scaling**: Horizontal Pod Autoscaler based on CPU/memory/custom metrics
- **Load Balancing**: Kubernetes Service + cloud load balancers
- **Rolling Updates**: Zero-downtime deployments
- **Pod Security Policies**: Enforce security standards

**Networking:**

- **VPC/VNet**: Private network for services
- **Network Policies**: Restrict inter-service communication
- **TLS Everywhere**: Encrypted communication between services
- **DDoS Protection**: Cloud provider DDoS mitigation
- **WAF**: Web Application Firewall for frontend

**CI/CD Pipeline:**

- **Version Control**: Git (GitHub or GitLab)
- **Build**: Docker images built on commit
- **Testing**: Automated unit, integration, and security tests
- **Deployment**: Automated deployment to Kubernetes
- **Rollback**: Automated rollback on failure

## 7.4 Security and Compliance

**Application Security:**

- **Input Validation**: All user inputs validated and sanitized
- **SQL Injection Prevention**: Parameterized queries, ORM
- **XSS Prevention**: Content Security Policy, output encoding
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Secrets Management**: HashiCorp Vault, AWS Secrets Manager
- **Dependency Scanning**: Regular scans of application dependencies

**Infrastructure Security:**

- **Least Privilege**: Services run with minimum required permissions
- **Network Segmentation**: Services isolated in private subnets
- **Intrusion Detection**: IDS/IPS systems monitoring traffic
- **Vulnerability Scanning**: Regular infrastructure scans
- **Patch Management**: Automated patching of OS and dependencies

**Data Security:**

- **Encryption at Rest**: AES-256 encryption for all stored data
- **Encryption in Transit**: TLS 1.3 for all communications
- **Data Masking**: Sensitive data masked in logs and non-production environments
- **Data Deletion**: Secure deletion processes for user data

**Compliance Certifications:**

**European Region:**

- GDPR (General Data Protection Regulation)
- ANSSI SecNumCloud (French cybersecurity)
- ISO 27001, 27017, 27018 (Information security)
- BSI C5 (German cloud security)

**US Region:**

- SOC 2 Type II (Service Organization Control)
- HIPAA (Health Insurance Portability and Accountability Act)
- PCI-DSS (Payment Card Industry Data Security Standard)
- ISO 27001, 27017, 27018

**Audit and Compliance:**

- **Audit Logging**: All user and system activities logged
- **Log Retention**: Minimum 1 year retention for compliance
- **Compliance Reporting**: Automated generation of compliance reports
- **Third-Party Audits**: Regular security audits by external firms

## 7.5 Scalability and Performance

**Horizontal Scaling:**

- Microservices scale independently based on load
- Auto-scaling policies for each service
- Database read replicas for read-heavy operations
- CDN for static assets (frontend, images)

**Performance Optimization:**

- **Caching**: Redis for frequently accessed data
- **Database Indexing**: Optimized indexes for query performance
- **Connection Pooling**: Reuse database connections
- **Asynchronous Processing**: Long-running tasks handled asynchronously
- **Code Optimization**: Profiling and optimization of hot paths

**Load Testing:**

- Regular load tests to identify bottlenecks
- Capacity planning based on usage projections
- Stress testing to validate auto-scaling

---

# 8. Appendices

## 8.1 Glossary

Comprehensive definitions of terms used throughout this document:

**A**

- **API (Application Programming Interface)**: Interface for programmatic access to CybeDefend functionality.
- **AST (Abstract Syntax Tree)**: Tree representation of source code structure used for code analysis.
- **AutoFix**: Cybe AutoFix, AI-powered automated vulnerability remediation feature.

**B**

- **BLSA (Business Logic Security Analysis)**: AI-driven analysis of business logic vulnerabilities (in development).

**C**

- **CI/CD (Continuous Integration/Continuous Deployment)**: Automated processes for integrating code changes and deploying to production.
- **CLI (Command-Line Interface)**: Terminal-based tool for interacting with CybeDefend.
- **Container**: Lightweight, standalone package containing application code and dependencies.
- **CVE (Common Vulnerabilities and Exposures)**: Standardized identifier for known vulnerabilities.
- **CVSS (Common Vulnerability Scoring System)**: Standardized method for rating vulnerability severity.
- **CWE (Common Weakness Enumeration)**: Categorization system for software weaknesses.
- **Cybe Analysis**: AI-powered vulnerability analysis for false positive reduction and exploitability assessment.
- **Cybe AutoFix**: AI-powered automatic code fix generation and PR/MR creation.
- **Cybe Security Champion**: 24/7 AI security expert for vulnerability consultation.

**D**

- **Dataflow Analysis**: Tracking data movement through code from sources (inputs) to sinks (sensitive operations).
- **Dockerfile**: Text file containing instructions for building Docker container images.

**F**

- **False Positive**: Incorrectly identified vulnerability that is not actually exploitable.

**G**

- **GDPR (General Data Protection Regulation)**: European data protection and privacy regulation.

**I**

- **IaC (Infrastructure as Code)**: Managing infrastructure through code (Terraform, CloudFormation, etc.).
- **IDE (Integrated Development Environment)**: Software application for code development (VS Code, IntelliJ, etc.).

**K**

- **Knowledge Graph**: Structured representation of codebase capturing relationships and dataflows.
- **Kubernetes**: Container orchestration platform for automating deployment, scaling, and management.

**L**

- **LLM (Large Language Model)**: AI model used for natural language understanding and generation.
- **Lockfile**: File specifying exact versions of dependencies (package-lock.json, Gemfile.lock, etc.).

**M**

- **MCP (Model Context Protocol)**: Protocol enabling AI coding assistants to access CybeDefend data.
- **MTTR (Mean Time to Resolve)**: Average time taken to resolve vulnerabilities.

**O**

- **OAuth2**: Authorization protocol for secure third-party access.
- **Opengrep**: Open-source static analysis tool (fork of Semgrep) used by CybeDefend.
- **OWASP Top 10**: List of ten most critical security risks for web applications.

**P**

- **Pull Request (PR)**: Proposed code changes in GitHub (Merge Request in GitLab).

**R**

- **RBAC (Role-Based Access Control)**: Access control based on user roles.
- **ReBAC (Relationship-Based Access Control)**: Access control based on relationships between entities.

**S**

- **SARIF (Static Analysis Results Interchange Format)**: Standard format for static analysis tool output.
- **SAST (Static Application Security Testing)**: Analysis of source code for vulnerabilities without execution.
- **SCA (Software Composition Analysis)**: Analysis of open-source dependencies for known vulnerabilities.
- **Scanner**: Tool that analyzes code, dependencies, or infrastructure for security issues.
- **Severity**: Rating of vulnerability impact (Critical, High, Medium, Low).
- **Sovereign Cloud**: Cloud infrastructure that guarantees data remains within specific geographical boundaries.

**T**

- **Triage**: Process of reviewing and prioritizing vulnerabilities.

**V**

- **Vulnerability**: Security flaw that could be exploited to compromise system security.

**W**

- **Webhook**: HTTP callback for real-time event notifications.

## 8.2 Supported Technologies

**Programming Languages (SAST):**

| Language | Detection | Frameworks Supported |
|----------|-----------|----------------------|
| JavaScript / TypeScript | Automatic | React, Vue, Angular, Express, Node.js |
| Python | Automatic | Django, Flask, FastAPI, common libraries |
| Java | Automatic | Spring Boot, Jakarta EE, Android |
| PHP | Automatic | Laravel, Symfony, WordPress |
| Go | Automatic | Gin, Echo, standard library |
| Ruby | Automatic | Rails, Sinatra |
| C / C++ | Automatic | Standard library, common frameworks |
| C# | Automatic | .NET Framework, .NET Core, ASP.NET |
| Rust | Automatic | Common crates |
| Kotlin | Automatic | Android, Spring Boot |
| Scala | Automatic | Play Framework, Akka |
| Swift | Automatic | iOS, macOS frameworks |

**Package Managers (SCA):**

| Ecosystem | Lockfiles | Manifest Files |
|-----------|-----------|----------------|
| Node.js / JavaScript | package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lock | package.json |
| Python | poetry.lock, Pipfile.lock | requirements.txt, pyproject.toml, Pipfile |
| Java / JVM | gradle.lockfile | pom.xml, build.gradle |
| PHP | composer.lock | composer.json |
| Ruby | Gemfile.lock | Gemfile |
| Go | go.sum | go.mod |
| .NET | packages.lock.json | *.csproj, packages.config |
| Rust | Cargo.lock | Cargo.toml |
| Swift | Package.resolved, Podfile.lock | Package.swift, Podfile |
| Elixir | mix.lock | mix.exs |
| Dart | pubspec.lock | pubspec.yaml |

**Infrastructure as Code (IaC):**

- Terraform (`.tf`)
- AWS CloudFormation (`.yaml`, `.json`)
- Azure Resource Manager (ARM) templates
- Google Cloud Deployment Manager
- Pulumi
- Ansible playbooks
- Kubernetes manifests (`.yaml`)
- Helm charts
- Docker Compose (`.yaml`)

**Container Technologies:**

- Docker images (from registries or local builds)
- Dockerfiles
- Container registries: Docker Hub, Amazon ECR, Azure ACR, Google GCR/Artifact Registry, GitHub GHCR, GitLab Container Registry, Red Hat Quay

**Version Control:**

- GitHub (SaaS)
- GitLab (SaaS and self-managed)
- Bitbucket (future)

**CI/CD Platforms:**

- GitHub Actions (official action)
- GitLab CI (documented integration)
- Jenkins (documented integration)
- CircleCI (documented integration)
- Azure DevOps Pipelines (documented integration)
- AWS CodePipeline (documented integration)
- Google Cloud Build (documented integration)
- Bamboo (documented integration)
- TeamCity (documented integration)
- Bitbucket Pipelines (documented integration)

**IDEs:**

- Visual Studio Code (official extension)
- JetBrains IDEs: IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, GoLand, Rider, CLion, RubyMine (official plugin)

**AI Assistants (via MCP):**

- Cursor
- Claude Desktop
- VS Code with MCP extension
- Windsurf
- Any MCP-compatible client

## 8.3 Integration Matrix

**Quick Reference for Integration Capabilities:**

| Integration Type | Supported Platforms | Authentication | Features | Status |
|------------------|---------------------|----------------|----------|--------|
| **Version Control** | GitHub, GitLab | OAuth2 | Repo connection, PR/MR creation | ✅ Production |
| **CI/CD** | GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps, etc. | API Key | Automated scanning, break-on-severity | ✅ Production |
| **Container Registry** | Docker Hub, ECR, ACR, GCR, GHCR, GitLab, Quay | Various (tokens, IAM) | Image scanning, vulnerability detection | ✅ Production |
| **IDE** | VS Code, JetBrains | API Key | In-editor scanning, results view | ✅ Production |
| **MCP** | Cursor, Claude, VS Code, Windsurf | API Key + Project ID | AI assistant access to vulnerabilities | ✅ Production |
| **CLI** | Linux, macOS, Windows | API Key | Scan execution, results retrieval | ✅ Production |
| **Webhooks** | GitHub, GitLab | Webhook secret | Automatic scan on commit/PR | 🔄 Roadmap |
| **Issue Tracking** | Jira, GitHub Issues, GitLab Issues | API tokens | Auto-create issues for vulnerabilities | 🔄 Roadmap |
| **Notifications** | Slack, Microsoft Teams | Webhook URLs | Scan completion, critical vulnerabilities | 🔄 Roadmap |

Legend:
- ✅ Production: Fully available
- 🔄 Roadmap: Planned for future release

## 8.4 Compliance Framework Mapping

**OWASP Top 10 2021 Coverage:**

| OWASP Category | CybeDefend Detection | Scanner Type |
|----------------|----------------------|--------------|
| A01: Broken Access Control | ✅ Yes | SAST, IaC |
| A02: Cryptographic Failures | ✅ Yes | SAST, IaC |
| A03: Injection | ✅ Yes | SAST |
| A04: Insecure Design | 🔄 BLSA (future) | BLSA |
| A05: Security Misconfiguration | ✅ Yes | IaC, Container, SAST |
| A06: Vulnerable and Outdated Components | ✅ Yes | SCA, Container |
| A07: Identification and Authentication Failures | ✅ Yes | SAST |
| A08: Software and Data Integrity Failures | ✅ Yes | SAST, SCA |
| A09: Security Logging and Monitoring Failures | ✅ Yes | SAST, IaC |
| A10: Server-Side Request Forgery (SSRF) | ✅ Yes | SAST |

**Additional Compliance Frameworks:**

- **PCI-DSS**: Data security requirements for payment systems
- **HIPAA**: Healthcare data protection (US)
- **GDPR**: Data privacy and protection (EU)
- **SOC 2**: Service organization controls
- **ISO 27001**: Information security management
- **NIST Cybersecurity Framework**: Risk management framework
- **CIS Benchmarks**: Configuration hardening standards (IaC)

## 8.5 API Documentation Reference

**API Endpoints Overview:**

CybeDefend provides a comprehensive REST API for programmatic access to all platform functionality.

**Base URLs:**

- **Europe**: `https://api-eu.cybedefend.com/v1`
- **United States**: `https://api-us.cybedefend.com/v1`

**Authentication:**

- **API Key** (header): `X-API-Key: your_api_key`
- **JWT Token** (header): `Authorization: Bearer your_jwt_token`

**Key Endpoint Categories:**

- `/auth/*` - Authentication and authorization
- `/organizations/*` - Organization management
- `/teams/*` - Team management
- `/projects/*` - Project CRUD operations
- `/scans/*` - Scan execution and status
- `/vulnerabilities/*` - Vulnerability management
- `/reports/*` - Report generation
- `/integrations/*` - Integration configuration
- `/users/*` - User management

**Full API Documentation:**

For complete API reference with request/response examples, see:
`https://docs.cybedefend.com/api-reference`

**OpenAPI Specification:**

Available at: `/v103/api-reference/openapi.json`

## 8.6 Contact and Support

**Support Channels:**

- **Community Forum**: https://community.cybedefend.com (Free plan)
- **Email Support**: support@cybedefend.com (Team and Business plans)
- **Live Chat**: Available in platform (Business plan)
- **Priority Support**: Dedicated channel (Enterprise plan)

**Sales Inquiries:**

- **Email**: sales@cybedefend.com
- **Phone**: +1 (555) 123-4567 (US), +33 1 23 45 67 89 (EU)

**Documentation:**

- **User Guide**: https://docs.cybedefend.com/user-guide
- **API Documentation**: https://docs.cybedefend.com/api-reference
- **Integration Guides**: https://docs.cybedefend.com/integrations

**Social Media:**

- **Twitter/X**: @CybeDefend
- **LinkedIn**: linkedin.com/company/cybedefend
- **GitHub**: github.com/CybeDefend

**Feature Requests and Roadmap:**

- **Public Roadmap**: https://cybedefend.featurebase.app/roadmap
- **Submit Feature Request**: https://cybedefend.featurebase.app

---

**Document Version**: 2.0  
**Last Updated**: October 19, 2025  
**Author**: CybeDefend Documentation Team  
**Status**: Production Specification

---

*This Detailed Functional Specifications document represents the complete, production-ready CybeDefend platform as of October 2025. All features described herein are either currently available in production or clearly marked as future roadmap items. This document serves as the authoritative reference for platform capabilities, architecture, and operational workflows.*
