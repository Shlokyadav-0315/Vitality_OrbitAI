import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { useState, useEffect } from 'react'
import Globe from './components/Globe'
import Moon from './components/Moon'
import Sentinel1 from './components/Sentinel1'
import Sun from './components/Sun'
import Modal from './components/Modal'
import Tooltip from './components/Tooltip'
import TechText from './components/TechText'
import StrokeText from './components/StrokeText'
import AnomalyDetector from './components/AnomalyDetector'
import { useScrollAnimation, useCounter } from './hooks/useScrollAnimation'

// ── Scroll Progress ───────────────────────────────────────────────────
function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-50" style={{ background: '#111' }}>
      <div className="h-full transition-all duration-100" style={{ width: `${pct}%`, background: '#00d4ff' }} />
    </div>
  )
}

// ── Section 1: Hero ───────────────────────────────────────────────────
function HeroSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-end px-8 md:px-16 pb-20">
      {/* Mission tag */}
      <div
        className="mb-6 flex items-center gap-3"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="w-2 h-2 rounded-full radar-pulse" style={{ background: '#00d4ff' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em' }}>
          ORCA CODER 2026 — TRACK 05: SPACETECH &amp; SATELLITE INTELLIGENCE
        </span>
      </div>

      {/* Main title */}
      <div style={{
        width: '100%',
        height: '160px',
        position: 'relative',
        marginBottom: '12px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease-out 0.2s'
      }}>
        <TechText
          text="Vitality"
          fontWeight={700}
          fontSize={140}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="none"
          clickKick
          guides={false}
          color="#fff"
          accentColor="#00d4ff"
          align="left"
        />
      </div>

      {/* Subtitle */}
      <div style={{
        width: '100%',
        height: '60px',
        position: 'relative',
        marginBottom: '16px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out 0.4s'
      }}>
        <TechText
          text="OrbitAI Anomaly System"
          fontWeight={400}
          fontSize={32}
          reveal="letter"
          dashLength={3}
          dashGap={2}
          specks={10}
          intro="none"
          clickKick
          guides={false}
          color="#00d4ff"
          accentColor="#00d4ff"
          align="left"
        />
      </div>

      <p style={{
        fontSize: '16px',
        color: '#8fa0b5',
        maxWidth: '560px',
        lineHeight: 1.6,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out 0.6s'
      }}>
        AI-powered satellite anomaly detection distinguishing natural events from potential human-made damage across Earth&apos;s surface.
      </p>

      {/* Action link */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.7s',
          marginTop: '24px'
        }}
      >
        <a
          href="#anomaly-detector"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#00d4ff', color: '#000', padding: '12px 24px',
            borderRadius: '4px', textDecoration: 'none',
            fontFamily: 'Space Mono, monospace', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.1em', width: 'fit-content',
            boxShadow: '0 0 20px rgba(0,212,255,0.4)', transition: 'all 0.2s'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#000' }} />
          LAUNCH AI ANOMALY SCANNER
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 animate-bounce" style={{ color: '#555' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}>SCROLL</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

// ── Section 2: What is SAR ────────────────────────────────────────────
function SARSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Section header — left aligned, no ALL CAPS label */}
        <div style={{
          borderLeft: '2px solid #00d4ff',
          paddingLeft: '24px',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff',
            lineHeight: 1
          }}>
            Synthetic<br />Aperture Radar
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px', maxWidth: '400px', lineHeight: 1.7 }}>
            A satellite technology that sees through clouds, smoke, and darkness — imaging Earth's surface with radar pulses.
          </p>
        </div>

        {/* Three facts — horizontal rule separators, not cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
          {[
            { num: '01', title: 'All-weather vision', body: 'Radar waves penetrate clouds, storms, and night. Unlike optical cameras, SAR never goes blind.' },
            { num: '02', title: 'Surface precision', body: 'Detects millimeter-scale ground deformation — invisible to the human eye, visible to radar.' },
            { num: '03', title: 'Change detection', body: 'Comparing passes over time reveals glacier retreat, floods, earthquakes, and deforestation.' },
          ].map((item, i) => (
            <div key={item.num} style={{
              padding: '40px 40px 40px 0',
              borderTop: '1px solid #1a1a1a',
              borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
              paddingLeft: i > 0 ? '40px' : '0',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.8s ease-out ${0.2 + i * 0.15}s`
            }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', marginBottom: '20px' }}>{item.num}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid #1a1a1a',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out 0.8s'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', letterSpacing: '0.1em' }}>
            SENTINEL-1 · ESA · 6-12 DAY REVISIT · ACTIVE SINCE 2014
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Section 3: Glacier ────────────────────────────────────────────────
function GlacierSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [year, setYear] = useState(0)
  const data = [
    { year: '1985', label: 'Baseline — glacier at maximum extent', image: '/sar-data/Jakobshavn_1985.jpg' },
    { year: '2022', label: '37 years later — significant retreat documented', image: '/sar-data/Jakobshavn_2022.jpg' },
  ]

  return (
    <section ref={ref} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '16px' }}>
            69.17°N 49.83°W · GREENLAND
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#fff'
          }}>
            Jakobshavn<br />Glacier
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px' }}>37 years of ice loss, captured by satellite radar.</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out 0.3s'
          }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img
                src={data[year].image}
                alt={data[year].label}
                style={{ width: '100%', display: 'block', transition: 'opacity 0.4s' }}
              />
              {/* Year overlay */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid #00d4ff22',
                padding: '8px 16px'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '28px', color: '#00d4ff', fontWeight: 700 }}>
                  {data[year].year}
                </span>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '40px 20px 16px'
              }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#888' }}>{data[year].label}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}>
            {/* Timeline */}
            <div style={{ padding: '28px', border: '1px solid #1a1a1a', marginBottom: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' }}>
                TIMELINE
              </p>
              <input
                type="range" min="0" max="1" value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#00d4ff' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                {['1985', '2022'].map(y => (
                  <span key={y} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '13px',
                    color: data[year].year === y ? '#00d4ff' : '#555',
                    transition: 'color 0.2s'
                  }}>{y}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {[
              { value: '15km+', label: 'terminus retreat' },
              { value: '40m/day', label: 'flow speed' },
              { value: '1mm/yr', label: 'sea level contribution' },
            ].map(s => (
              <div key={s.label} style={{ padding: '20px 28px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontSize: '12px', color: '#777' }}>{s.label}</span>
              </div>
            ))}

            <div style={{ padding: '20px 28px', border: '1px solid #1a1a1a', marginTop: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                DATA SOURCE<br />
                <span style={{ color: '#999' }}>Sentinel-1 SAR — OPERA RTC<br />Alaska Satellite Facility</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4: Amazon ─────────────────────────────────────────────────
function AmazonSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [year, setYear] = useState(0)
  const data = [
    { year: '2000', label: 'Baseline — dense Amazon rainforest intact', image: '/sar-data/amazon_2000.png' },
    { year: '2012', label: '12 years later — visible deforestation and clearing', image: '/sar-data/amazon_2012.png' },
  ]

  return (
    <section ref={ref} style={{ background: 'rgba(0,5,0,0.6)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00ff88', letterSpacing: '0.15em', marginBottom: '16px' }}>
            3.46°S 62.21°W · RONDÔNIA, BRAZIL
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#fff'
          }}>
            Amazon<br />Deforestation
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px' }}>12 years of anthropogenic forest loss, analyzed by multi-temporal satellite sensors.</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out 0.3s'
          }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img
                src={data[year].image}
                alt={data[year].label}
                style={{ width: '100%', display: 'block', transition: 'opacity 0.4s' }}
              />
              {/* Year overlay */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid #00ff8822',
                padding: '8px 16px'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '28px', color: '#00ff88', fontWeight: 700 }}>
                  {data[year].year}
                </span>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '40px 20px 16px'
              }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#888' }}>{data[year].label}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '2px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}>
            {/* Timeline */}
            <div style={{ padding: '28px', border: '1px solid #1a1a1a', marginBottom: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' }}>
                TIMELINE
              </p>
              <input
                type="range" min="0" max="1" value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#00ff88' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                {['2000', '2012'].map(y => (
                  <span key={y} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '13px',
                    color: data[year].year === y ? '#00ff88' : '#555',
                    transition: 'color 0.2s'
                  }}>{y}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {[
              { value: '17%', label: 'Amazon lost since 1970' },
              { value: '10k km²', label: 'cleared per year (peak)' },
              { value: '400+', label: 'billion trees destroyed' },
            ].map(s => (
              <div key={s.label} style={{ padding: '20px 28px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontSize: '12px', color: '#777' }}>{s.label}</span>
              </div>
            ))}

            <div style={{ padding: '20px 28px', border: '1px solid #1a1a1a', marginTop: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                DATA SOURCE<br />
                <span style={{ color: '#999' }}>Copernicus &amp; Earth Observation<br />Landsat 7 ETM+ · USGS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4B: Coastal / Gulf Coast ──────────────────────────────────
function CoastalSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [year, setYear] = useState(0)
  const data = [
    { year: '1984', label: 'Baseline — intact barrier islands and coastal wetland buffer', image: '/sar-data/gulf_1984.jpg' },
    { year: '2020', label: '36 years later — extensive barrier breach, subsidence, and sea intrusion', image: '/sar-data/gulf_2020.jpg' },
  ]

  return (
    <section ref={ref} style={{ background: 'rgba(0,12,28,0.65)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '16px' }}>
            29.25°N 89.95°W · GULF COAST
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#fff'
          }}>
            Gulf Coast<br />Shoreline Erosion
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px' }}>36 years of coastal marsh loss and marine intrusion, documented from orbit.</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out 0.3s'
          }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img
                src={data[year].image}
                alt={data[year].label}
                style={{ width: '100%', display: 'block', transition: 'opacity 0.4s' }}
              />
              {/* Year overlay */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid #00d4ff22',
                padding: '8px 16px'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '28px', color: '#00d4ff', fontWeight: 700 }}>
                  {data[year].year}
                </span>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '40px 20px 16px'
              }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#888' }}>{data[year].label}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '2px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}>
            {/* Timeline */}
            <div style={{ padding: '28px', border: '1px solid #1a1a1a', marginBottom: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' }}>
                TIMELINE
              </p>
              <input
                type="range" min="0" max="1" value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#00d4ff' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                {['1984', '2020'].map(y => (
                  <span key={y} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '13px',
                    color: data[year].year === y ? '#00d4ff' : '#555',
                    transition: 'color 0.2s'
                  }}>{y}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {[
              { value: '5,000 km²', label: 'wetland lost since 1930' },
              { value: '1 football pitch/hr', label: 'average land loss rate' },
              { value: '36 yrs', label: 'satellite monitoring baseline' },
            ].map(s => (
              <div key={s.label} style={{ padding: '20px 28px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontSize: '12px', color: '#777' }}>{s.label}</span>
              </div>
            ))}

            <div style={{ padding: '20px 28px', border: '1px solid #1a1a1a', marginTop: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                DATA SOURCE<br />
                <span style={{ color: '#999' }}>USGS Earth Resources Observation<br />Landsat Archive · Sentinel-1 SAR</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4C: Atacama Mineral Excavation ───────────────────────────
function AtacamaSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [year, setYear] = useState(0)
  const data = [
    { year: '2022', label: 'Baseline — initial basin topography and early extraction boundary', image: '/sar-data/atacama_2022.png' },
    { year: '2025', label: '3 years later — massive open-pit excavation, evaporation basins and haul roads', image: '/sar-data/atacama_2025.png' },
  ]

  return (
    <section ref={ref} style={{ background: 'rgba(25,12,0,0.65)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#ffaa00', letterSpacing: '0.15em', marginBottom: '16px' }}>
            23.86°S 69.13°W · ATACAMA BASIN, CHILE
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#fff'
          }}>
            Atacama Mineral<br />Basin Excavation
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px' }}>Rapid industrial open-pit excavation and chemical evaporation basins, tracked from space.</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease-out 0.3s'
          }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img
                src={data[year].image}
                alt={data[year].label}
                style={{ width: '100%', display: 'block', transition: 'opacity 0.4s' }}
              />
              {/* Year overlay */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid #ffaa0044',
                padding: '8px 16px'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '28px', color: '#ffaa00', fontWeight: 700 }}>
                  {data[year].year}
                </span>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '40px 20px 16px'
              }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#888' }}>{data[year].label}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '2px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}>
            {/* Timeline */}
            <div style={{ padding: '28px', border: '1px solid #1a1a1a', marginBottom: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' }}>
                TIMELINE
              </p>
              <input
                type="range" min="0" max="1" value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#ffaa00' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                {['2022', '2025'].map(y => (
                  <span key={y} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '13px',
                    color: data[year].year === y ? '#ffaa00' : '#555',
                    transition: 'color 0.2s'
                  }}>{y}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {[
              { value: '580 km²', label: 'total excavation basin area' },
              { value: '+77%', label: 'open-pit expansion rate' },
              { value: 'Human-Made', label: 'anomaly classification' },
            ].map(s => (
              <div key={s.label} style={{ padding: '20px 28px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontSize: '12px', color: '#777' }}>{s.label}</span>
              </div>
            ))}

            <div style={{ padding: '20px 28px', border: '1px solid #1a1a1a', marginTop: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                DATA SOURCE<br />
                <span style={{ color: '#999' }}>BlueMarble NextGen Observation<br />High-Resolution Orbital Imagery</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4: Impact ─────────────────────────────────────────────────
function ImpactSection() {
  const [ref, isVisible] = useScrollAnimation()
  const impacts = [
    {
      stat: '3.3',
      suffix: 'mm',
      unit: 'per year',
      label: 'Global sea level rise rate',
      detail: 'Jakobshavn contributes significantly to oceans rising worldwide.',
      tooltip: 'Based on NOAA satellite measurements 2020-2026'
    },
    {
      stat: '15',
      suffix: '%',
      unit: 'since 1950',
      label: 'AMOC current weakening',
      detail: 'Freshwater influx from melting disrupts Atlantic circulation.',
      tooltip: 'Atlantic Meridional Overturning Circulation data'
    },
    {
      stat: '7',
      suffix: 'm',
      unit: 'potential',
      label: 'Sea rise if Greenland melts',
      detail: "Greenland's ice sheet holds enough water to reshape every coastline.",
      tooltip: 'Total water volume if entire ice sheet melts'
    },
    {
      stat: '2',
      prefix: '↑',
      suffix: '°C',
      unit: 'Arctic warming',
      label: 'Faster than global average',
      detail: 'The Arctic warms 3× faster than the rest of Earth.',
      tooltip: 'Arctic amplification: warming rate vs global average'
    },
  ]

  return (
    <section ref={ref} style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{
          borderLeft: '2px solid #00d4ff',
          paddingLeft: '24px',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <StrokeText
            text="Why this matters"
            strokeColor="#00d4ff"
            fillColor="#fff"
            strokeWidth={1.4}
            drawDuration={1.6}
            fontSize={64}
            fontWeight={600}
            letterSpacing={-2}
            trigger="scroll"
            fillMode="wipe"
            wipeFrom="left"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#111' }}>
          {impacts.map((item, i) => {
            const counter = useCounter(parseFloat(item.stat), 2000, isVisible)
            const displayValue = isVisible ? counter : 0

            return (
              <div key={item.label} style={{
                background: '#000',
                padding: '48px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease-out ${0.2 + i * 0.1}s`
              }}>
                <Tooltip text={item.tooltip}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '48px', color: '#fff', fontWeight: 700, letterSpacing: '-0.03em' }}>
                      {item.prefix || ''}{displayValue.toFixed(1)}{item.suffix || ''}
                    </span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff' }}>{item.unit}</span>
                  </div>
                </Tooltip>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#ccc', marginBottom: '8px' }}>{item.label}</p>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Section 5: More ───────────────────────────────────────────────────
function MoreSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const locations = [
    {
      code: 'EQK',
      title: 'Earthquakes',
      sub: 'Ground deformation mapping',
      color: '#ff4444',
      stats: [
        { value: '7.8', label: 'Turkey 2023 magnitude' },
        { value: '50,000+', label: 'lives lost' },
        { value: '2mm', label: 'SAR precision' },
      ],
      description: 'SAR interferometry detects millimeter-scale ground shifts after earthquakes. By comparing pre- and post-quake radar images, scientists create deformation maps that show exactly where ground moved and by how much — critical for rescue teams and infrastructure assessment.',
      fact: 'The 2023 Turkey-Syria earthquake caused ground shifts of up to 6 meters, measured precisely by Sentinel-1 SAR within hours of the event.',
      source: 'ESA Copernicus Emergency Management Service',
      imagePlaceholder: 'Turkey Earthquake SAR Deformation Map — 2023',
      comingSoon: false
    },
    {
      code: 'FLD',
      title: 'Floods',
      sub: 'Emergency flood mapping',
      color: '#4488ff',
      stats: [
        { value: '1.5B', label: 'people at flood risk' },
        { value: '6hrs', label: 'SAR revisit time' },
        { value: '90%', label: 'mapping accuracy' },
      ],
      description: 'Unlike optical satellites, SAR sees through clouds and rain to map flood extents in real-time. Water appears as dark areas (smooth surface = low backscatter) while land shows bright returns. Emergency responders use these maps to plan evacuations and relief operations.',
      fact: 'During the 2022 Pakistan floods, Sentinel-1 SAR mapped 32,000 km² of flooded land in near real-time, helping coordinate relief for 33 million affected people.',
      source: 'ESA Copernicus · UNOSAT Flood Portal',
      imagePlaceholder: 'Pakistan Flood SAR Map — August 2022',
      comingSoon: false
    },
    {
      code: 'VLC',
      title: 'Volcanoes',
      sub: 'Eruption precursor detection',
      color: '#ff8800',
      stats: [
        { value: '1,500+', label: 'active volcanoes monitored' },
        { value: '10cm', label: 'inflation detectable' },
        { value: '24/7', label: 'continuous monitoring' },
      ],
      description: 'Before a volcano erupts, magma pushing upward inflates the ground surface. SAR detects this inflation — sometimes centimeters of ground rise — weeks before eruption. This early warning saves lives by enabling timely evacuations.',
      fact: 'Sentinel-1 detected 15cm of ground inflation at Iceland\'s Reykjanes Peninsula 3 weeks before the 2024 eruption, enabling a full evacuation of Grindavík.',
      source: 'Icelandic Meteorological Office · ESA Sentinel-1',
      imagePlaceholder: 'Iceland Volcanic Inflation SAR Map — 2024',
      comingSoon: false
    },
    {
      code: 'URB',
      title: 'Urban Growth',
      sub: 'City expansion & subsidence',
      color: '#aa44ff',
      stats: [
        { value: '68%', label: 'world population urban by 2050' },
        { value: '3cm/yr', label: 'Jakarta sinking rate' },
        { value: '100+', label: 'cities monitored' },
      ],
      description: 'SAR tracks urban expansion and ground subsidence — sinking caused by groundwater extraction and heavy construction. Cities like Jakarta, Shanghai, and Mexico City are sinking at alarming rates, detectable only by satellite radar.',
      fact: 'Parts of Jakarta, Indonesia are sinking at 25cm per year due to groundwater extraction. SAR monitoring led to Indonesia moving its capital city to Nusantara.',
      source: 'TU Delft · Copernicus InSAR Earth Program',
      imagePlaceholder: 'Jakarta Subsidence SAR Map — 2015 to 2023',
      comingSoon: false
    },
    {
      code: 'AGR',
      title: 'Agriculture',
      sub: 'Crop health & soil moisture',
      color: '#00cc66',
      stats: [
        { value: '800M', label: 'people food insecure' },
        { value: '40%', label: 'land use is agriculture' },
        { value: '15%', label: 'yield prediction improvement' },
      ],
      description: 'SAR measures soil moisture and crop biomass by sensing how radar waves interact with vegetation water content. Farmers and governments use this data to predict harvests, optimize irrigation, and detect crop stress before it becomes visible to the naked eye.',
      fact: 'The EU\'s Copernicus Agriculture Monitoring system uses Sentinel-1 SAR to monitor crop conditions across 27 countries, providing early warnings of food security threats.',
      source: 'ESA Copernicus Land Monitoring Service',
      imagePlaceholder: 'European Crop Moisture SAR Map — 2023',
      comingSoon: false
    },
    {
      code: 'ICE',
      title: 'Sea Ice',
      sub: 'Arctic & Antarctic monitoring',
      color: '#88ddff',
      stats: [
        { value: '13%', label: 'Arctic sea ice lost per decade' },
        { value: '4M km²', label: 'minimum extent 2023' },
        { value: '1979', label: 'SAR monitoring start' },
      ],
      description: 'SAR distinguishes between different types of sea ice — first-year ice vs. multi-year ice — providing critical data for ship routing through Arctic passages and understanding climate change feedback loops.',
      fact: 'The 2023 Antarctic sea ice extent reached a record low, 1 million km² below the previous record. SAR data revealed this collapse 6 weeks before conventional satellites confirmed it.',
      source: 'National Snow and Ice Data Center · ESA',
      imagePlaceholder: 'Antarctic Sea Ice SAR — Record Low 2023',
      comingSoon: false
    },
  ]

  const comingSoonTopics = [
    { code: 'OIL', title: 'Oil Spill Detection', sub: 'Ocean pollution tracking' },
    { code: 'MNE', title: 'Mining Activity', sub: 'Illegal extraction monitoring' },
    { code: 'WLD', title: 'Wildfire Scars', sub: 'Post-fire damage assessment' },
    { code: 'CST', title: 'Coastline Change', sub: 'Erosion & sea level rise' },
  ]

  const handleCardClick = (location) => {
    setSelectedLocation(location)
    setModalOpen(true)
  }

  return (
    <section ref={ref} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>

        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <StrokeText
            text="Beyond glaciers"
            strokeColor="#00d4ff"
            fillColor="#fff"
            strokeWidth={1.4}
            drawDuration={1.6}
            fontSize={64}
            fontWeight={600}
            letterSpacing={-2}
            trigger="scroll"
            fillMode="wipe"
            wipeFrom="left"
          />
          <p style={{ color: '#777', marginTop: '16px', fontSize: '15px' }}>SAR reveals change across every surface of Earth. Click any topic to explore.</p>
        </div>

        {/* Main 6 cards — real data — VERTICAL LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {locations.map((loc, i) => (
            <div
              key={loc.code}
              onClick={() => handleCardClick(loc)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === i ? '#0a0a14' : '#000',
                padding: '12px 24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.08}s both` : 'none',
                borderLeft: hoveredCard === i ? `3px solid ${loc.color}` : '3px solid transparent',
                border: '1px solid #111'
              }}
            >
              {/* Arrow icon */}
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  fontSize: '18px',
                  color: hoveredCard === i ? loc.color : '#444',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === i ? 'translateX(2px)' : 'translateX(0)',
                  display: 'inline-block'
                }}>→</span>
              </div>

              {/* Code tag */}
              <div style={{ minWidth: '35px', flexShrink: 0 }}>
                <p style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  color: hoveredCard === i ? loc.color : '#666',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  transition: 'color 0.3s'
                }}>{loc.code}</p>
              </div>

              {/* Title & subtitle */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '2px',
                  transition: 'color 0.3s'
                }}>{loc.title}</h3>
                <p style={{ fontSize: '11px', color: '#777' }}>{loc.sub}</p>
              </div>

              {/* Mini stats - horizontal */}
              <div style={{
                display: 'flex',
                gap: '24px',
                paddingLeft: '24px',
                borderLeft: '1px solid #1a1a1a',
                flexShrink: 0
              }}>
                {loc.stats.slice(0, 2).map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <p style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '13px',
                      color: '#fff',
                      fontWeight: 700,
                      marginBottom: '2px'
                    }}>{s.value}</p>
                    <p style={{ fontSize: '8px', color: '#555', whiteSpace: 'nowrap' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* View indicator */}
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '8px',
                color: hoveredCard === i ? loc.color : '#444',
                letterSpacing: '0.1em',
                transition: 'color 0.3s',
                flexShrink: 0
              }}>
                VIEW
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon section - keep as grid */}
        <div style={{ marginTop: '64px' }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#555',
            letterSpacing: '0.15em',
            marginBottom: '16px',
            paddingLeft: '40px'
          }}>COMING SOON</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#111' }}>
            {comingSoonTopics.map((loc, i) => (
              <div
                key={loc.code}
                onMouseEnter={() => setHoveredCard(10 + i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === 10 + i ? '#080808' : '#000',
                  padding: '28px',
                  transition: 'all 0.3s ease',
                  cursor: 'not-allowed',
                  opacity: isVisible ? 0.6 : 0,
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${0.6 + i * 0.08}s both` : 'none',
                }}
              >
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#444', letterSpacing: '0.15em', marginBottom: '10px' }}>{loc.code}</p>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>{loc.title}</h3>
                <p style={{ fontSize: '11px', color: '#333' }}>{loc.sub}</p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#00d4ff33', marginTop: '16px', letterSpacing: '0.1em' }}>COMING SOON</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal with real data */}
      {selectedLocation && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={selectedLocation.title}>
          {/* Coords/tag */}
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: selectedLocation.color, letterSpacing: '0.1em', marginBottom: '20px' }}>
            {selectedLocation.code} — {selectedLocation.sub.toUpperCase()}
          </p>

          {/* Image placeholder */}
          <div style={{
            background: '#0a0a0a',
            border: `1px dashed ${selectedLocation.color}33`,
            borderRadius: '2px',
            padding: '32px 16px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '8px' }}>SAR IMAGERY</p>
            <p style={{ fontSize: '12px', color: '#444' }}>{selectedLocation.imagePlaceholder}</p>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#222', marginTop: '12px' }}>IMAGE UPLOAD COMING SOON</p>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#111', marginBottom: '20px' }}>
            {selectedLocation.stats.map(s => (
              <div key={s.label} style={{ background: '#000', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px', color: '#fff', fontWeight: 700 }}>{s.value}</p>
                <p style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#aaa', marginBottom: '16px' }}>{selectedLocation.description}</p>

          {/* Key fact */}
          <div style={{ background: `${selectedLocation.color}11`, border: `1px solid ${selectedLocation.color}22`, padding: '16px', marginBottom: '16px' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: selectedLocation.color, letterSpacing: '0.1em', marginBottom: '8px' }}>KEY FINDING</p>
            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.7 }}>{selectedLocation.fact}</p>
          </div>

          {/* Source */}
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', letterSpacing: '0.08em' }}>
            SOURCE: {selectedLocation.source}
          </p>
        </Modal>
      )}
    </section>
  )
}

// ── Section 6: Final ──────────────────────────────────────────────────
function FinalSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} style={{ background: '#000', padding: '160px 0 80px', borderTop: '1px solid #111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease-out'
          }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '24px' }}>
              ORCA CODER HACKATHON 2026
            </p>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#fff', lineHeight: 1.05, marginBottom: '24px'
            }}>
              SpaceTech &amp;<br />Satellite AI
            </h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.7, maxWidth: '380px' }}>
              Autonomous satellite surface anomaly detection distinguishing natural planetary dynamics from potential human-made environmental damage.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            {[
              { key: 'Challenge', val: '05 | SpaceTech & Satellite Intelligence' },
              { key: 'Stack', val: 'React · Three.js · Computer Vision Canvas' },
              { key: 'Sensors', val: 'Sentinel-1 SAR · Multi-spectral Optical' },
              { key: 'Deliverable', val: 'Anomaly Detection & Automated Report' },
            ].map(item => (
              <div key={item.key} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '16px 0', borderBottom: '1px solid #111'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', letterSpacing: '0.08em' }}>{item.key}</span>
                <span style={{ fontSize: '13px', color: '#888' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '80px',
          paddingTop: '32px',
          borderTop: '1px solid #0a0a0a',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out 0.4s'
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#444' }}>
            © 2026 VITALITY ORBITAI — DEVELOPED FOR ORCA CODER HACKATHON · TRACK 05
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [globeOpen, setGlobeOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setGlobeOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = globeOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [globeOpen])

  return (
    <div style={{ background: '#000', width: '100%' }}>
      <ProgressBar />

      {/* Fullscreen Globe */}
      {globeOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #111' }}>
            <div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff' }}>INTERACTIVE GLOBE</p>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Drag to rotate · Scroll to zoom</p>
            </div>
            <button
              onClick={() => setGlobeOpen(false)}
              style={{
                fontFamily: 'Space Mono, monospace', fontSize: '11px',
                color: '#888', background: 'none', border: '1px solid #222',
                padding: '8px 20px', cursor: 'pointer', letterSpacing: '0.08em'
              }}
            >
              ESC — CLOSE
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 3, 5]} intensity={2.5} castShadow />
              <pointLight position={[-5, -3, -5]} intensity={1} />
              <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
              <Globe />
              <Moon />
              <Sentinel1 />
              <Sun />
              <OrbitControls enableZoom enableRotate rotateSpeed={0.5} zoomSpeed={0.6} minDistance={3} maxDistance={12} />
            </Canvas>
          </div>
        </div>
      )}

      {/* Background 3D */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 3, 5]} intensity={2.5} castShadow />
          <pointLight position={[-5, -3, -5]} intensity={1} />
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
          <Globe />
          <Moon />
          <Sentinel1 />
          <Sun />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>

      {/* Explore Globe button */}
      <button
        onClick={() => setGlobeOpen(true)}
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 40,
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#000', border: '1px solid #00d4ff33',
          color: '#00d4ff', padding: '12px 24px', cursor: 'pointer',
          fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#00d4ff11'; e.currentTarget.style.borderColor = '#00d4ff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.borderColor = '#00d4ff33' }}
      >
        <div className="radar-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4ff' }} />
        EXPLORE GLOBE
      </button>

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <AnomalyDetector />
        <SARSection />
        <GlacierSection />
        <AmazonSection />
        <CoastalSection />
        <AtacamaSection />
        <ImpactSection />
        <MoreSection />
        <FinalSection />
      </div>
    </div>
  )
}
