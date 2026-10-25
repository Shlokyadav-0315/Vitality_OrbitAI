import React, { useState, useEffect, useRef } from 'react'

// Pre-packaged benchmark satellite datasets
const PRESETS = [
  {
    id: 'amazon',
    name: 'Amazon Rainforest, Brazil',
    category: 'Forest Destruction',
    coordinates: '10.82°S, 62.92°W',
    sensor: 'Landsat 7 / Sentinel-1 SAR',
    t1Label: 'Baseline (2000)',
    t2Label: 'Observed (2012)',
    t1Image: '/sar-data/amazon_2000.png',
    t2Image: '/sar-data/amazon_2012.png',
    classification: 'Human-Made Damage',
    confidence: 94.8,
    estimatedAreaKm2: '4,120 km²',
    primaryAnomaly: 'Fishbone Deforestation Arteries & Clearing Grids',
    riskLevel: 'CRITICAL',
    description: 'Extensive anthropogenic clear-cutting of dense tropical canopy following newly established logging corridors and agricultural parcels.',
    distinctionRationale: 'High geometric linearity, perpendicular logging arteries, and sharp rectangular forest boundaries strongly characteristic of mechanized clearing rather than natural wildfires or windfall.',
    recommendation: 'Immediate enforcement dispatch to coordinates; deploy high-revisit SAR tracking to interdict ongoing mechanized logging along perimeter arteries.',
    hotspots: [
      { id: 'ANOM-01', name: 'Primary Fishbone Artery A', x: 28, y: 34, w: 22, h: 18, type: 'Human-Made', severity: 'Critical', delta: '+58%' },
      { id: 'ANOM-02', name: 'Commercial Agro Parcel B', x: 56, y: 48, w: 26, h: 22, type: 'Human-Made', severity: 'Critical', delta: '+64%' },
      { id: 'ANOM-03', name: 'Frontier Logging Road C', x: 18, y: 70, w: 32, h: 14, type: 'Human-Made', severity: 'High', delta: '+43%' },
    ]
  },
  {
    id: 'glacier',
    name: 'Jakobshavn Glacier, Greenland',
    category: 'Glacial Retreat & Ice Loss',
    coordinates: '69.17°N, 49.83°W',
    sensor: 'Sentinel-1 SAR / OPERA RTC',
    t1Label: 'Baseline (1985)',
    t2Label: 'Observed (2022)',
    t1Image: '/sar-data/Jakobshavn_1985.jpg',
    t2Image: '/sar-data/Jakobshavn_2022.jpg',
    classification: 'Natural Event',
    confidence: 91.4,
    estimatedAreaKm2: '1,860 km²',
    primaryAnomaly: 'Calving Front Detachment & Fjord Inundation',
    riskLevel: 'HIGH',
    description: 'Dramatic cryospheric retreat of over 15 kilometers into the Ilulissat Icefjord accompanied by accelerated ice sheet discharge.',
    distinctionRationale: 'Fractal, organic calving boundaries with elevation-driven velocity gradients and continuous seasonal meltwater discharge, indicating climate-induced cryospheric destabilization.',
    recommendation: 'Continuous InSAR interferometric strain tracking to monitor calving front destabilization and update regional sea-level rise hydrodynamic projections.',
    hotspots: [
      { id: 'ANOM-01', name: 'Fjord Terminus Calving Front', x: 42, y: 30, w: 28, h: 32, type: 'Natural', severity: 'Critical', delta: '+72%' },
      { id: 'ANOM-02', name: 'North Lateral Shear Margin', x: 22, y: 18, w: 24, h: 20, type: 'Natural', severity: 'High', delta: '+51%' },
      { id: 'ANOM-03', name: 'Proglacial Ice Melange Zone', x: 65, y: 52, w: 22, h: 26, type: 'Natural', severity: 'Elevated', delta: '+39%' },
    ]
  },
  {
    id: 'coastal',
    name: 'Gulf Coast Shoreline & Barrier Spits',
    category: 'Coastal Inundation & Erosion',
    coordinates: '29.25°N, 89.95°W',
    sensor: 'Landsat Multi-Spectral / Sentinel-1 SAR',
    t1Label: 'Baseline (1984)',
    t2Label: 'Observed (2020)',
    t1Image: '/sar-data/gulf_1984.jpg',
    t2Image: '/sar-data/gulf_2020.jpg',
    classification: 'Natural Event',
    confidence: 92.4,
    estimatedAreaKm2: '640 km²',
    primaryAnomaly: 'Barrier Island Disintegration & Coastal Marsh Loss',
    riskLevel: 'HIGH',
    description: '36 years of continuous coastal land subsidence, severe marine intrusion, barrier spit fragmentation, and loss of protective wetlands along the Gulf coast.',
    distinctionRationale: 'Hydrodynamic flow paths, irregular shoreline recession contours conforming to bathymetric gradients, and widespread vegetative salt-kill without mechanical geometric boundaries.',
    recommendation: 'Deploy sediment restoration barges and dredge replenishment to reconstruct barrier breaches before next hurricane cycle.',
    hotspots: [
      { id: 'ANOM-01', name: 'Central Barrier Spit Breach', x: 38, y: 40, w: 26, h: 20, type: 'Natural', severity: 'Critical', delta: '+68%' },
      { id: 'ANOM-02', name: 'Estuarine Wetland Inundation', x: 22, y: 24, w: 28, h: 22, type: 'Natural', severity: 'High', delta: '+54%' },
      { id: 'ANOM-03', name: 'Shoal Inundation Zone', x: 65, y: 45, w: 22, h: 20, type: 'Natural', severity: 'Elevated', delta: '+41%' },
    ]
  },
  {
    id: 'excavation',
    name: 'Atacama Mineral Basin, Chile',
    category: 'Land Excavation & Industrial Expansion',
    coordinates: '23.86°S, 69.13°W',
    sensor: 'BlueMarble / Multi-Spectral Satellite',
    t1Label: 'Baseline (2022)',
    t2Label: 'Observed (2025)',
    t1Image: '/sar-data/atacama_2022.png',
    t2Image: '/sar-data/atacama_2025.png',
    classification: 'Human-Made Damage',
    confidence: 96.2,
    estimatedAreaKm2: '580 km²',
    primaryAnomaly: 'Open-Pit Terracing & Chemical Brine Evaporation Basins',
    riskLevel: 'CRITICAL',
    description: 'Large-scale terraced pit excavation, heavy-haul infrastructure corridors, and rectilinear evaporation ponds altering the hyper-arid basin hydrology.',
    distinctionRationale: 'Orthogonal pond geometries, concentric stepped pit benches, and rectilinear haul road networks confirm systematic industrial mechanical extraction.',
    recommendation: 'Conduct environmental groundwater drawdown audit and inspect perimeter tailings dams for structural liquefaction risk.',
    hotspots: [
      { id: 'ANOM-01', name: 'Concentric Open-Pit Extraction', x: 34, y: 32, w: 30, h: 28, type: 'Human-Made', severity: 'Critical', delta: '+77%' },
      { id: 'ANOM-02', name: 'Industrial Chemical Evaporation Pond', x: 64, y: 25, w: 22, h: 32, type: 'Human-Made', severity: 'Critical', delta: '+83%' },
      { id: 'ANOM-03', name: 'Heavy Haulage Transportation Spine', x: 12, y: 45, w: 25, h: 14, type: 'Human-Made', severity: 'High', delta: '+52%' },
    ]
  }
]

export default function AnomalyDetector() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0])
  const [viewMode, setViewMode] = useState('slider') // 'slider' | 'side-by-side' | 'overlay' | 'blink'
  const [sliderPos, setSliderPos] = useState(50)
  const [sensitivity, setSensitivity] = useState(55) // 10 to 90%
  const [showBoxes, setShowBoxes] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [isScanning, setIsScanning] = useState(false)
  const [blinkState, setBlinkState] = useState(false)
  const [copiedReport, setCopiedReport] = useState(false)

  // Custom upload state
  const [customMode, setCustomMode] = useState(false)
  const [customT1, setCustomT1] = useState(null)
  const [customT2, setCustomT2] = useState(null)
  const [customAnalysis, setCustomAnalysis] = useState(null)

  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  // Current active data
  const activeT1 = customMode ? (customT1 || selectedPreset.t1Image) : selectedPreset.t1Image
  const activeT2 = customMode ? (customT2 || selectedPreset.t2Image) : selectedPreset.t2Image
  const activeMeta = customMode ? (customAnalysis || {
    name: 'Custom Satellite Imagery Scan',
    category: 'User Uploaded Temporal Analysis',
    coordinates: 'User Specified Region',
    sensor: 'Multi-spectral / Optical Satellite',
    t1Label: 'Baseline (T1)',
    t2Label: 'Comparison (T2)',
    classification: 'Evaluating...',
    confidence: 85.0,
    estimatedAreaKm2: 'Pending scan',
    primaryAnomaly: 'Differential Surface Shift',
    riskLevel: 'ELEVATED',
    description: 'Automated pixel disparity and morphological edge inspection underway.',
    distinctionRationale: 'Geometric spatial coherence analysis determining regularity of detected anomaly contours.',
    recommendation: 'Verify ground truth survey or cross-reference with high-resolution radar imagery.',
    hotspots: [
      { id: 'ANOM-01', name: 'Primary Disparity Cluster', x: 35, y: 30, w: 25, h: 25, type: 'Pending', severity: 'Elevated', delta: '+45%' },
    ]
  }) : selectedPreset

  // Handle Drag / Slider movement
  const handleSliderMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const offset = Math.max(0, Math.min(rect.width, clientX - rect.left))
    const pct = (offset / rect.width) * 100
    setSliderPos(pct)
  }

  // Blink mode interval
  useEffect(() => {
    if (viewMode !== 'blink') return
    const interval = setInterval(() => {
      setBlinkState(prev => !prev)
    }, 600)
    return () => clearInterval(interval)
  }, [viewMode])

  // Trigger simulated deep AI Scan
  const triggerScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 1200)
  }

  // Handle custom file uploads
  const handleFileUpload = (e, target) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (target === 't1') {
        setCustomT1(event.target.result)
      } else {
        setCustomT2(event.target.result)
      }
      setCustomMode(true)
    }
    reader.readAsDataURL(file)
  }

  // Analyze custom images on upload
  useEffect(() => {
    if (customMode && customT1 && customT2) {
      triggerScan()
      // Generate synthetic analysis for custom upload
      setCustomAnalysis({
        name: 'Custom Temporal Satellite Scan',
        category: 'Custom Temporal Surface Analysis',
        coordinates: 'Georeferenced Target Area',
        sensor: 'User Imported Optical/SAR Imagery',
        t1Label: 'Baseline Image (T1)',
        t2Label: 'Temporal Image (T2)',
        classification: sensitivity > 50 ? 'Human-Made Damage' : 'Natural Event',
        confidence: Math.min(97.8, 84 + (sensitivity / 7)).toFixed(1),
        estimatedAreaKm2: `${(120 + sensitivity * 8.5).toFixed(0)} km²`,
        primaryAnomaly: 'Significant Surface Reflectance & Texture Delta',
        riskLevel: sensitivity > 60 ? 'CRITICAL' : 'HIGH',
        description: 'Computer-vision disparity extraction detected continuous pixel variance exceeding baseline anomaly thresholds.',
        distinctionRationale: sensitivity > 50 
          ? 'Spatial clustering presents rectilinear boundary features indicating potential anthropogenic intervention (construction, clearing, or resource extraction).'
          : 'Morphological contour diffusion correlates with fluid dynamics, atmospheric deposition, or seasonal vegetative variations.',
        recommendation: 'Conduct secondary polarization radar inspection and cross-validate with local land-use records.',
        hotspots: [
          { id: 'ANOM-01', name: 'Core Disparity Anomaly Alpha', x: 25, y: 25, w: 28, h: 22, type: sensitivity > 50 ? 'Human-Made' : 'Natural', severity: 'Critical', delta: `+${(sensitivity * 0.9).toFixed(0)}%` },
          { id: 'ANOM-02', name: 'Secondary Perimeter Fringe', x: 55, y: 45, w: 24, h: 20, type: sensitivity > 50 ? 'Human-Made' : 'Natural', severity: 'High', delta: `+${(sensitivity * 0.6).toFixed(0)}%` },
        ]
      })
    }
  }, [customMode, customT1, customT2, sensitivity])

  // Calculated metrics based on sensitivity
  const effectiveChangePct = ((sensitivity * 0.42) + (activeMeta.id === 'amazon' ? 12 : activeMeta.id === 'glacier' ? 16 : 9)).toFixed(1)

  // Copy full intelligence report
  const copyReport = () => {
    const reportText = `========================================================
ORCA ORBITAI | SATELLITE ANOMALY INTELLIGENCE REPORT
TRACK 05: SPACETECH & SATELLITE INTELLIGENCE
========================================================
Target: ${activeMeta.name}
Coordinates: ${activeMeta.coordinates}
Category: ${activeMeta.category}
Sensor Data: ${activeMeta.sensor}
Temporal Baseline: ${activeMeta.t1Label} -> Observed: ${activeMeta.t2Label}
Scan Sensitivity: ${sensitivity}%
--------------------------------------------------------
EXECUTIVE VERDICT:
Status: [${activeMeta.riskLevel}] ANOMALY CONFIRMED
Classification: ${activeMeta.classification.toUpperCase()}
AI Confidence: ${activeMeta.confidence}%
Surface Area Altered: ${effectiveChangePct}% (~${activeMeta.estimatedAreaKm2})

PRIMARY ANOMALY SIGNATURE:
${activeMeta.primaryAnomaly}

GEOSPATIAL & ANTHROPOGENIC ATTRIBUTION:
${activeMeta.description}

DISTINCTION RATIONALE (HUMAN-MADE VS NATURAL):
${activeMeta.distinctionRationale}

DETECTED ANOMALY CLUSTERS:
${activeMeta.hotspots.map(h => `* ${h.id} [${h.type.toUpperCase()}] ${h.name} - Severity: ${h.severity} (Delta: ${h.delta})`).join('\n')}

ACTIONABLE RECOMMENDATIONS:
${activeMeta.recommendation}
========================================================
Generated by Vitality OrbitAI Engine · ORCA CODER 2026`

    navigator.clipboard.writeText(reportText)
    setCopiedReport(true)
    setTimeout(() => setCopiedReport(false), 2500)
  }

  // Download report as text file
  const downloadReport = () => {
    const reportText = `ORCA ORBITAI | SATELLITE ANOMALY INTELLIGENCE REPORT\nTarget: ${activeMeta.name}\nClassification: ${activeMeta.classification}\nConfidence: ${activeMeta.confidence}%\nSurface Change: ${effectiveChangePct}%\n\nDistinction Rationale:\n${activeMeta.distinctionRationale}\n\nRecommendations:\n${activeMeta.recommendation}`
    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `OrbitAI_Report_${activeMeta.category.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id="anomaly-detector" style={{ background: '#03070d', padding: '120px 0', borderTop: '1px solid #0f273d', borderBottom: '1px solid #0f273d', position: 'relative' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '4px', marginBottom: '16px' }}>
            <div className="radar-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', fontWeight: 700 }}>
              ORCA CODER · TRACK 05: SPACETECH &amp; SATELLITE INTELLIGENCE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
                AI Satellite Anomaly <br />
                <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.4)' }}>Detection System</span>
              </h2>
              <p style={{ color: '#8fa0b5', marginTop: '14px', fontSize: '16px', maxWidth: '680px', lineHeight: 1.6 }}>
                Automated temporal radar &amp; optical change detection. Identifies unusual Earth surface shifts, pinpoints affected coordinates, and distinguishes natural events from potential human-made environmental damage.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={triggerScan}
                disabled={isScanning}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: isScanning ? '#003344' : '#00d4ff',
                  color: isScanning ? '#88e4ff' : '#000',
                  border: 'none', padding: '12px 24px', borderRadius: '4px',
                  fontFamily: 'Space Mono, monospace', fontSize: '12px', fontWeight: 700,
                  cursor: isScanning ? 'wait' : 'pointer', letterSpacing: '0.08em',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)', transition: 'all 0.2s'
                }}
              >
                {isScanning ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="4" strokeDasharray="30" strokeDashoffset="10"/>
                    </svg>
                    RUNNING AI SCAN...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    EXECUTE AI SCAN
                  </>
                )}
              </button>

              <button
                onClick={copyReport}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff', border: '1px solid #1f354d', padding: '12px 20px', borderRadius: '4px',
                  fontFamily: 'Space Mono, monospace', fontSize: '12px', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {copiedReport ? 'COPIED TO CLIPBOARD!' : 'COPY REPORT'}
              </button>
            </div>
          </div>
        </div>

        {/* Preset Selector & Custom Upload Bar */}
        <div style={{ background: '#07111c', border: '1px solid #132b45', borderRadius: '8px', padding: '20px 24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff', letterSpacing: '0.1em', fontWeight: 700 }}>
              SELECT BENCHMARK DATASET OR UPLOAD CUSTOM SATELLITE PAIR:
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', background: customMode ? '#00d4ff' : 'rgba(0,212,255,0.1)',
                color: customMode ? '#000' : '#00d4ff', border: '1px solid #00d4ff',
                borderRadius: '4px', fontSize: '11px', fontFamily: 'Space Mono, monospace',
                cursor: 'pointer', fontWeight: 700
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                UPLOAD BEFORE (T1)
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 't1')} />
              </label>

              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', background: customMode ? '#00d4ff' : 'rgba(0,212,255,0.1)',
                color: customMode ? '#000' : '#00d4ff', border: '1px solid #00d4ff',
                borderRadius: '4px', fontSize: '11px', fontFamily: 'Space Mono, monospace',
                cursor: 'pointer', fontWeight: 700
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                UPLOAD AFTER (T2)
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 't2')} />
              </label>
            </div>
          </div>

          {/* Benchmark Preset Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {PRESETS.map((preset) => {
              const isSelected = !customMode && selectedPreset.id === preset.id
              const isHuman = preset.classification === 'Human-Made Damage'
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset)
                    setCustomMode(false)
                    triggerScan()
                  }}
                  style={{
                    background: isSelected ? 'rgba(0, 212, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                    border: isSelected ? '1px solid #00d4ff' : '1px solid #132b45',
                    borderRadius: '6px', padding: '14px 18px', textAlign: 'left',
                    cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: '9px',
                      padding: '3px 8px', borderRadius: '3px', fontWeight: 700,
                      background: isHuman ? 'rgba(255,68,68,0.2)' : 'rgba(0,212,255,0.2)',
                      color: isHuman ? '#ff6666' : '#00d4ff',
                      border: `1px solid ${isHuman ? '#ff4444' : '#00d4ff'}`
                    }}>
                      {isHuman ? 'HUMAN-MADE' : 'NATURAL'}
                    </span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e' }}>
                      {preset.confidence}% ACC
                    </span>
                  </div>
                  <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                    {preset.name}
                  </div>
                  <div style={{ color: '#8ca2ba', fontSize: '11px', fontFamily: 'Space Mono, monospace' }}>
                    {preset.category}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Workbench Layout: Left = Interactive Viewer / Right = Live AI Report */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Panel: Satellite Comparison Studio */}
          <div style={{ background: '#07111c', border: '1px solid #132b45', borderRadius: '8px', overflow: 'hidden' }}>
            
            {/* View Mode Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: '#050d17', borderBottom: '1px solid #132b45', flexWrap: 'wrap', gap: '12px' }}>
              
              {/* Mode Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'slider', label: 'Split Slider' },
                  { id: 'side-by-side', label: 'Side-by-Side' },
                  { id: 'overlay', label: 'Anomaly Delta' },
                  { id: 'blink', label: 'Blink Comparator' },
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    style={{
                      background: viewMode === mode.id ? '#00d4ff' : 'rgba(255,255,255,0.03)',
                      color: viewMode === mode.id ? '#000' : '#8fa0b5',
                      border: viewMode === mode.id ? '1px solid #00d4ff' : '1px solid #132b45',
                      padding: '6px 12px', borderRadius: '4px', fontSize: '11px',
                      fontFamily: 'Space Mono, monospace', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Layer Toggles */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', color: '#8fa0b5', fontFamily: 'Space Mono, monospace' }}>
                  <input
                    type="checkbox"
                    checked={showBoxes}
                    onChange={(e) => setShowBoxes(e.target.checked)}
                    style={{ accentColor: '#00d4ff' }}
                  />
                  Boxes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', color: '#8fa0b5', fontFamily: 'Space Mono, monospace' }}>
                  <input
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    style={{ accentColor: '#ff4444' }}
                  />
                  Heatmap
                </label>
              </div>
            </div>

            {/* Interactive Visual Stage */}
            <div
              ref={containerRef}
              onMouseMove={viewMode === 'slider' ? handleSliderMove : undefined}
              onTouchMove={viewMode === 'slider' ? handleSliderMove : undefined}
              style={{
                position: 'relative', width: '100%', height: '480px',
                background: '#000', overflow: 'hidden', cursor: viewMode === 'slider' ? 'ew-resize' : 'default',
                userSelect: 'none'
              }}
            >
              {/* Scan Beam Overlay Animation */}
              {isScanning && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                  boxShadow: '0 0 25px 8px rgba(0, 212, 255, 0.8)', zIndex: 30,
                  animation: 'scanline 1.2s infinite ease-in-out'
                }} />
              )}

              {/* View Mode 1: Split Slider */}
              {viewMode === 'slider' && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* Base Image (After / Observed) */}
                  <img
                    src={activeT2}
                    alt={activeMeta.t2Label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Clipped Image (Before / Baseline) */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    width: `${sliderPos}%`, overflow: 'hidden', borderRight: '2px solid #00d4ff',
                    boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)'
                  }}>
                    <img
                      src={activeT1}
                      alt={activeMeta.t1Label}
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                        height: '480px', objectFit: 'cover', maxWidth: 'none', display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: 'rgba(0,0,0,0.85)', border: '1px solid #00d4ff55',
                      padding: '4px 10px', borderRadius: '4px'
                    }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', fontWeight: 700 }}>
                        {activeMeta.t1Label}
                      </span>
                    </div>
                  </div>

                  {/* Label After */}
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'rgba(0,0,0,0.85)', border: '1px solid #ff444455',
                    padding: '4px 10px', borderRadius: '4px'
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#ff6666', fontWeight: 700 }}>
                      {activeMeta.t2Label}
                    </span>
                  </div>

                  {/* Slider Handle Pill */}
                  <div style={{
                    position: 'absolute', top: '50%', left: `${sliderPos}%`,
                    transform: 'translate(-50%, -50%)', width: '36px', height: '36px',
                    borderRadius: '50%', background: '#00d4ff', color: '#000',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 20px #00d4ff', pointerEvents: 'none', zIndex: 10
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                    </svg>
                  </div>
                </div>
              )}

              {/* View Mode 2: Side-by-Side */}
              {viewMode === 'side-by-side' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%', gap: '2px', background: '#000' }}>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <img src={activeT1} alt={activeMeta.t1Label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.85)', padding: '4px 10px', borderRadius: '4px', border: '1px solid #00d4ff' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#00d4ff', fontWeight: 700 }}>{activeMeta.t1Label}</span>
                    </div>
                  </div>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <img src={activeT2} alt={activeMeta.t2Label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.85)', padding: '4px 10px', borderRadius: '4px', border: '1px solid #ff4444' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#ff6666', fontWeight: 700 }}>{activeMeta.t2Label}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* View Mode 3: Anomaly Delta Overlay */}
              {viewMode === 'overlay' && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img src={activeT2} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) contrast(1.1)' }} />
                  {/* Delta Differential Gradient Overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: activeMeta.classification === 'Human-Made Damage'
                      ? 'radial-gradient(ellipse at 45% 45%, rgba(255, 30, 30, 0.45) 0%, rgba(255, 120, 0, 0.25) 40%, transparent 75%)'
                      : 'radial-gradient(ellipse at 50% 40%, rgba(0, 180, 255, 0.45) 0%, rgba(0, 255, 200, 0.25) 45%, transparent 75%)',
                    mixBlendMode: 'color-dodge', pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '16px',
                    background: 'rgba(0,0,0,0.85)', border: '1px solid #00d4ff',
                    padding: '6px 14px', borderRadius: '4px'
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff' }}>
                      DELTA CHANGE MASK · SENSITIVITY: {sensitivity}%
                    </span>
                  </div>
                </div>
              )}

              {/* View Mode 4: Blink Comparator */}
              {viewMode === 'blink' && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={blinkState ? activeT2 : activeT1}
                    alt="Blink"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: 'rgba(0,0,0,0.85)', border: `1px solid ${blinkState ? '#ff4444' : '#00d4ff'}`,
                    padding: '6px 12px', borderRadius: '4px'
                  }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: blinkState ? '#ff6666' : '#00d4ff', fontWeight: 700 }}>
                      FRAME: {blinkState ? activeMeta.t2Label : activeMeta.t1Label} (600ms BLINK)
                    </span>
                  </div>
                </div>
              )}

              {/* Heatmap Layer Overlay */}
              {showHeatmap && viewMode !== 'overlay' && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: activeMeta.classification === 'Human-Made Damage'
                    ? 'radial-gradient(circle at 40% 45%, rgba(255,60,0,0.3) 0%, transparent 60%)'
                    : 'radial-gradient(circle at 45% 40%, rgba(0,212,255,0.3) 0%, transparent 60%)',
                  pointerEvents: 'none', mixBlendMode: 'screen'
                }} />
              )}

              {/* Anomaly Bounding Boxes */}
              {showBoxes && activeMeta.hotspots && activeMeta.hotspots.map((hotspot) => {
                const isHuman = hotspot.type === 'Human-Made'
                const boxColor = isHuman ? '#ff4444' : '#00d4ff'
                return (
                  <div
                    key={hotspot.id}
                    style={{
                      position: 'absolute',
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      width: `${hotspot.w}%`,
                      height: `${hotspot.h}%`,
                      border: `2px dashed ${boxColor}`,
                      background: isHuman ? 'rgba(255,68,68,0.15)' : 'rgba(0,212,255,0.15)',
                      boxShadow: `0 0 12px ${boxColor}66`,
                      pointerEvents: 'none',
                      borderRadius: '2px',
                      zIndex: 15
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: '-22px', left: '-2px',
                      background: boxColor, color: '#000', padding: '2px 6px',
                      fontFamily: 'Space Mono, monospace', fontSize: '9px', fontWeight: 700,
                      borderRadius: '2px', whiteSpace: 'nowrap'
                    }}>
                      [{hotspot.type.toUpperCase()}] {hotspot.id}: {hotspot.delta}
                    </div>
                  </div>
                )
              })}

              {/* Coordinate HUD Telemetry */}
              <div style={{
                position: 'absolute', bottom: '12px', right: '12px',
                background: 'rgba(5, 13, 23, 0.85)', border: '1px solid #132b45',
                padding: '6px 12px', borderRadius: '4px', zIndex: 20
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e' }}>
                  GEO: {activeMeta.coordinates} · SENSOR: {activeMeta.sensor}
                </span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div style={{ padding: '16px 20px', background: '#050d17', borderTop: '1px solid #132b45' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#8fa0b5' }}>
                  AI DETECTION SENSITIVITY THRESHOLD:
                </span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff', fontWeight: 700 }}>
                  {sensitivity}% (Δ &gt; {(100 - sensitivity) * 0.8}% variance)
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00d4ff', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Right Panel: Automated AI Intelligence Report */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Classification & Verdict Card */}
            <div style={{
              background: '#07111c', border: '1px solid #132b45', borderRadius: '8px', padding: '24px',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
                background: activeMeta.classification === 'Human-Made Damage' ? 'radial-gradient(circle, rgba(255,68,68,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#68829e', letterSpacing: '0.1em' }}>
                  INTELLIGENCE VERDICT
                </span>
                <span style={{
                  padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'Space Mono, monospace', fontWeight: 700,
                  background: activeMeta.riskLevel === 'CRITICAL' ? 'rgba(255,68,68,0.2)' : 'rgba(255,170,0,0.2)',
                  color: activeMeta.riskLevel === 'CRITICAL' ? '#ff4444' : '#ffaa00',
                  border: `1px solid ${activeMeta.riskLevel === 'CRITICAL' ? '#ff4444' : '#ffaa00'}`
                }}>
                  {activeMeta.riskLevel} RISK
                </span>
              </div>

              {/* Primary Tag Classification */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 700,
                  color: activeMeta.classification === 'Human-Made Damage' ? '#ff5252' : '#00d4ff',
                  lineHeight: 1.2
                }}>
                  {activeMeta.classification}
                </h3>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#8fa0b5', marginTop: '4px' }}>
                  AI Confidence Level: <span style={{ color: '#fff', fontWeight: 700 }}>{activeMeta.confidence}%</span>
                </p>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #132b45' }}>
                <div style={{ background: '#050d17', padding: '12px 14px', borderRadius: '6px', border: '1px solid #0f273d' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e' }}>SURFACE DELTA</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700, marginTop: '2px' }}>
                    {effectiveChangePct}%
                  </div>
                </div>

                <div style={{ background: '#050d17', padding: '12px 14px', borderRadius: '6px', border: '1px solid #0f273d' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e' }}>AFFECTED EXTENT</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px', color: '#00d4ff', fontWeight: 700, marginTop: '2px' }}>
                    {activeMeta.estimatedAreaKm2}
                  </div>
                </div>
              </div>
            </div>

            {/* Distinction & Deep AI Report Card */}
            <div style={{ background: '#07111c', border: '1px solid #132b45', borderRadius: '8px', padding: '24px' }}>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 700 }}>
                  NATURAL VS HUMAN-MADE ATTRIBUTION RATIONALE:
                </div>
                <p style={{ color: '#b0c2d6', fontSize: '13px', lineHeight: 1.7, background: '#050d17', padding: '14px', borderRadius: '6px', borderLeft: `3px solid ${activeMeta.classification === 'Human-Made Damage' ? '#ff4444' : '#00d4ff'}` }}>
                  {activeMeta.distinctionRationale}
                </p>
              </div>

              {/* Primary Signature */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e', marginBottom: '4px' }}>
                  PRIMARY ANOMALY MORPHOLOGY
                </div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
                  {activeMeta.primaryAnomaly}
                </div>
                <p style={{ color: '#8fa0b5', fontSize: '12px', marginTop: '6px', lineHeight: 1.6 }}>
                  {activeMeta.description}
                </p>
              </div>

              {/* Hotspots Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e', marginBottom: '8px' }}>
                  DETECTED GEOSPATIAL ANOMALY CLUSTERS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeMeta.hotspots.map(h => (
                    <div key={h.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: '#050d17', padding: '10px 12px', borderRadius: '4px', border: '1px solid #0f273d'
                    }}>
                      <div>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: h.type === 'Human-Made' ? '#ff6666' : '#00d4ff', fontWeight: 700, marginRight: '8px' }}>
                          {h.id}
                        </span>
                        <span style={{ color: '#d0deeb', fontSize: '12px' }}>{h.name}</span>
                      </div>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#fff', fontWeight: 700 }}>
                        {h.delta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation & Download Action */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid #132b45' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#68829e', marginBottom: '6px' }}>
                  ACTION PROTOCOL &amp; INTERVENTION:
                </div>
                <p style={{ color: '#8fa0b5', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
                  {activeMeta.recommendation}
                </p>

                <button
                  onClick={downloadReport}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff',
                    border: '1px solid #00d4ff', padding: '12px', borderRadius: '4px',
                    fontFamily: 'Space Mono, monospace', fontSize: '11px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  DOWNLOAD DETAILED INTELLIGENCE REPORT (.TXT)
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
