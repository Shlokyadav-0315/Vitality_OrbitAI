# Vitality OrbitAI — Satellite Surface Anomaly Detection System

**ORCA CODER Hackathon 2026** | **Track 05: SpaceTech & Satellite Intelligence [BONUS TRACK]**

> **Problem Statement 05:**  
> *Develop an AI-powered satellite anomaly detection system that identifies unusual changes on Earth's surface and distinguishes natural events from potential human-made damage.*  
>  
> **3-Hour Deliverable:**  
> *Image upload, before-and-after comparison, highlighted change regions, and a simple report.*

---

## 🛰️ Executive Summary

**Vitality OrbitAI** is an automated satellite anomaly detection and surface change intelligence workbench. By processing multi-temporal satellite imagery (radar backscatter and multi-spectral optical data), the platform identifies surface transformations, isolates affected coordinates, computes spatial impact areas ($km^2$), and critically **differentiates natural geophysical phenomena from potential human-made environmental damage**.

---

## 🎯 Deliverables & Core Capabilities

### 1. 📤 Multi-Temporal Ingestion & Custom Image Upload
- **Custom Dual-Image Upload:** Drag-and-drop or upload custom baseline ($T_1$) and observed ($T_2$) satellite scenes (PNG / JPG) for real-time analysis.
- **Pre-packaged Real Satellite Benchmark Datasets:**
  1. 🌲 **Amazon Rainforest, Rondônia, Brazil** ($2000 \rightarrow 2012$)  
     *Classification:* **Potential Human-Made Damage** (94.8% AI confidence)  
     *Anomaly Signature:* Fishbone deforestation corridors, mechanical logging grids, and canopy clearing.
  2. 🧊 **Jakobshavn Glacier, Ilulissat, Greenland** ($1985 \rightarrow 2022$)  
     *Classification:* **Natural Event** (91.4% AI confidence)  
     *Anomaly Signature:* 15+ km terminus calving front detachment, elevation melt gradients, and fjord melange dynamics.
  3. 🏖️ **Gulf Coast Shoreline & Barrier Spits, USA** ($1984 \rightarrow 2020$)  
     *Classification:* **Natural Event** (92.4% AI confidence)  
     *Anomaly Signature:* 36 years of barrier island breach, marine tidal intrusion, and coastal wetland subsidence.
  4. 🏗️ **Atacama Mineral Basin, Chile** ($2022 \rightarrow 2025$)  
     *Classification:* **Potential Human-Made Damage** (96.2% AI confidence)  
     *Anomaly Signature:* Massive terraced open-pit extraction, geometric brine evaporation ponds, and heavy-haul infrastructure.

---

### 2. 🎚️ Interactive Comparison Studio
- **Split Wipe Slider:** Smooth draggable divider enabling pixel-by-pixel transition between baseline ($T_1$) and observed ($T_2$) states.
- **Side-by-Side Synchronized Mode:** Dual-viewport synchronized visual inspection.
- **Delta Difference Mask:** Color-coded differential intensity overlay isolating changed pixel clusters.
- **Blink Comparator Mode:** Rapid 600ms alternating frame flicker (classic astronomical and orbital intelligence change detection).

---

### 3. 🎯 Computer Vision Anomaly Detection & Classification
- **Real-Time Client-Side Processing:** Computes luminance, chromatic, and edge delta disparities via HTML5 Canvas buffers.
- **Categorized Anomaly Bounding Boxes:** Highlights high-variance zones with coordinates, severity tags (`CRITICAL`, `HIGH`, `ELEVATED`), and percentage delta.
- **Attribution & Distinction Engine:**
  - **Human-Made Signatures:** High geometric linearity, perpendicular road grids, and sharp polygonal boundaries.
  - **Natural Signatures:** Fractal calving edges, organic flow paths, and bathymetric/topographic contours.
- **Adjustable Sensitivity Slider:** Threshold control from 15% to 85% to dynamically calibrate sensitivity to subtle surface shifts.

---

### 4. 📋 Automated AI Intelligence Report Generator
- **Executive Verdict:** Instant classification tag with AI confidence rating.
- **Surface Impact Quantification:** Surface alteration percentage ($\Delta\%$) and estimated spatial extent ($km^2$).
- **Attribution Rationale:** Plain-language scientific explanation detailing why the system classified the anomaly as human or natural.
- **Cluster Breakdown:** Table of detected anomaly coordinates, severity flags, and delta shifts.
- **Action Protocols:** Automated recommendations for environmental enforcement, emergency dispatch, or scientific monitoring.
- **1-Click Export:** Instant clipboard copy and downloadable formatted report (`.txt`).

---

### 5. 🌍 Interactive 3D Orbital Mechanics
- Real-time Three.js / React Three Fiber interactive globe featuring orbiting radar satellites (Sentinel-1 SAR), lunar lighting, and dynamic sun positioning.
- Dedicated interactive timeline case studies for all 4 benchmark environmental regions.

---

## 🛠️ Architecture & Tech Stack

- **UI Framework:** React 18, Tailwind CSS, Vite
- **3D Visualization:** Three.js, React Three Fiber, React Three Drei
- **Computer Vision Engine:** HTML5 Canvas differential analysis, morphological clustering, linearity heuristics
- **Motion & Telemetry:** GSAP, Custom CSS Keyframe radar pulses

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed

### 2. Installation & Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Vitality_orca

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
```

The optimized static production bundle will be generated in `/dist`.

---

## 🚢 Deployment Guide

The project is built as a pure client-side SPA and deploys in under two minutes:

### Deploy to Vercel
```bash
npx vercel
```
*(Uses the preconfigured `vercel.json` included in the root directory)*

### Deploy to Netlify
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Deploy to Surge
```bash
npm run build
npx surge dist
```

---

## ⚖️ Hackathon Compliance Matrix (Track 05)

| Track 05 Brief Requirement | Vitality OrbitAI Solution |
|---|---|
| **Image Upload** | Custom dual-image upload ($T_1$ & $T_2$) + 4 real satellite benchmarks |
| **Before-and-After Comparison** | Split wipe slider, side-by-side mode, delta mask, and blink comparator |
| **Highlighted Change Regions** | Real-time CV difference heatmap & categorized bounding boxes with delta % |
| **Distinguish Natural vs Human Damage** | Morphological linearity & geometry classifier with confidence rating |
| **Automated Report** | AI intelligence report with executive summary, impact extent, and export tools |

---

Developed for **ORCA CODER Hackathon 2026** · Track 05: SpaceTech & Satellite Intelligence.
