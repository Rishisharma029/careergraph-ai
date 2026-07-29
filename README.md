# 🌐 CareerGraph AI — Your Intelligent Career Knowledge Hub

[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Rishi_Sharma-purple?style=for-the-badge)](https://github.com/)

> **CareerGraph AI** transforms unstructured resume PDFs, academic credentials, and technical project reports into a clean, **100% whitelisted interactive Knowledge Graph**, visual story timeline, and token-by-token streaming RAG search engine.

---

## 🛠️ High-Level System Architecture

```mermaid
flowchart TD
    subgraph Input ["1. Unstructured Artifact Input"]
        PDF["📄 PDF Resumes"]
        DOCX["📑 DOCX Reports"]
        CERT["📜 Cloud Certificates"]
    end

    subgraph OCR ["2. OCR & Cleaning Pipeline"]
        TrOCR["⚡ Microsoft TrOCR + OpenCV Engine"]
        Filter["🧹 PDF Metadata Junk Stripper (/Catalog, /Pages, /Kids)"]
        Whitelist["🛡️ Entity Whitelister (Skills, Projects, Certs)"]
    end

    subgraph Graph ["3. Knowledge Graph Engine"]
        Root["👤 Rishi Sharma (Root Node)"]
        Projects["🟠 Flagship Projects Hub (HDRS, EvalSync, LeafSense)"]
        Skills["🟣 Whitelisted Competencies (Python, FastAPI, React)"]
        Certs["🔵 Cloud Certifications (AWS CCP, Claude 101)"]
    end

    subgraph Presentation ["4. Multi-View Interactive Hub"]
        GraphUI["🕸️ Interactive 2D Graph Canvas"]
        StoryUI["📖 Chronological Story Timeline (2023-2026)"]
        RAGUI["💬 Token-by-Token Streaming RAG Q&A"]
        PortUI["🌐 Multi-Device Viewport Portfolio (Desktop/Tablet/Mobile)"]
    end

    PDF --> TrOCR
    DOCX --> TrOCR
    CERT --> TrOCR
    TrOCR --> Filter
    Filter --> Whitelist
    Whitelist --> Root
    Root --> Projects
    Root --> Skills
    Root --> Certs
    Projects --> GraphUI
    Skills --> GraphUI
    Certs --> GraphUI
    GraphUI <--> StoryUI
    GraphUI <--> RAGUI
    GraphUI <--> PortUI
```

---

## ⚡ Key Architectural Innovations & Polish

### 1. 🧹 Clean Entity Whitelisting (No PDF Metadata Junk)
Generic PDF parsers corrupt knowledge graphs by treating internal specification objects (`/Catalog`, `/Pages`, `/Kids`, `/ProcSet`, `/Font`) as career entities. **CareerGraph AI** strips out PDF internal structure, enforcing a **100% Whitelisted Entity Dictionary** containing real projects (*HDRS*, *EvalSync*, *LeafSense AI*, *CampusOS*) and validated skills (*Python*, *FastAPI*, *React*, *Docker*, *TrOCR*).

### 2. 🏆 "Career Intelligence Generated" Summary Modal
Upon uploading a document, a sequential reveal modal presents extracted intelligence:
- `✔ 4 Flagship Projects Identified`
- `✔ 12 Verified Career Competencies Whitelisted`
- `✔ 2 Industry Certifications Validated`
- `✔ Chronological Story Timeline Built`
- `✔ Overall Resume & Career Match Score: 94%`

### 3. 🔍 AI Explainability Breakdown ("Why 95%?")
In the Knowledge Graph Node Inspector drawer, every node displays an explicit AI Confidence Breakdown detailing why a confidence score was assigned:
- `✓ Verified in Rishi_Sharma_Resume_2026.pdf`
- `✓ Validated in HDRS Technical Report`
- `✓ Cross-referenced across Verified Document Proofs`

### 4. 360° Interconnected Click-Anywhere Navigation
1-click cross-linking connects all views:
- **Timeline Item** ➔ 1-click `Highlight Graph Node`
- **Document Citation** ➔ 1-click `Highlight Graph Evidence`
- **Graph Node** ➔ 1-click `Ask AI` or `Filter Timeline`

### 5. 💬 Token-by-Token Streaming RAG Q&A Engine
Simulates real-time token-by-token answer generation backed by exact document evidence citations.

### 6. 🌐 Multi-Device Viewport Switcher
Live interactive preview toggle bar switching between:
- 💻 **Desktop Viewport (1920px)**
- 📑 **Tablet Viewport (768px)**
- 📱 **Mobile Viewport (375px)**

---

## 🕸️ Knowledge Graph Hierarchy & Structure

```mermaid
graph TD
    Root["👤 Rishi Sharma (Full-Stack AI Engineer)"]
    
    Root --> HubP["🟠 Flagship Projects Hub"]
    Root --> HubS["🟣 Core Skills Hub"]
    Root --> HubC["🔵 Certifications Hub"]
    Root --> HubE["🟢 Education Hub"]

    HubP --> HDRS["HDRS Document AI (99.4% Accuracy)"]
    HubP --> EvalSync["EvalSync Automated Grading"]
    HubP --> LeafSense["LeafSense AI Crop Classifier"]

    HubS --> Python["Python (95% Match)"]
    HubS --> TrOCR["Microsoft TrOCR & OpenCV (94%)"]
    HubS --> FastAPI["FastAPI Async Endpoints (92%)"]
    HubS --> React["React & TypeScript (90%)"]

    HubC --> AWS["AWS Cloud Practitioner (Score 890)"]
    HubE --> BCA["BCA @ Satyug Darshan Institute"]

    HDRS -. "built_with" .-> Python
    HDRS -. "uses" .-> TrOCR
    HDRS -. "powered_by" .-> FastAPI
```

---

## 💻 Tech Stack & Architecture

| Technology | Layer / Usage |
| :--- | :--- |
| **Vite 6.1** | Next-generation ultra-fast frontend build tooling |
| **React 18** | UI component architecture and state hooks |
| **TypeScript 5.5** | Type-safe strict entity and graph schema definitions |
| **Tailwind CSS 3.4** | Modern dark-mode glassmorphism styling |
| **Zustand** | Global store state management for graph nodes and document artifacts |
| **Lucide Icons** | Premium vector icon system |

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut Key | Action |
| :---: | :--- |
| <kbd>/</kbd> | Open Global Search modal |
| <kbd>Esc</kbd> | Close inspector drawers and active modals |
| <kbd>G</kbd> | Jump directly to Explorable Knowledge Graph |
| <kbd>T</kbd> | Jump directly to AI Story Timeline |

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/careergraph-ai.git
   cd careergraph-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

5. **Serve Production Build**:
   ```bash
   npx serve -s dist -p 3000
   ```

---

## 📜 License & Author

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

Developed & Maintained with ❤️ by **Rishi Sharma** ([@rishisharma](https://github.com/))
- **Role**: Full-Stack AI Engineer
- **Institution**: Satyug Darshan Institute of Engineering & Technology

---

<p align="center">
  Crafted with ❤️ by <strong>RISHI SHARMA</strong> • CareerGraph AI v1.0.0
</p>
