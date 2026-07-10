import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Lessons from './components/Lessons'
import Flashcards from './components/Flashcards'
import Vocabulary from './components/Vocabulary'

type Tab = 'dashboard' | 'lessons' | 'flashcards' | 'vocabulary'

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Home', icon: '⌂' },
  { id: 'lessons', label: 'Lessons', icon: '✦' },
  { id: 'flashcards', label: 'Flashcards', icon: '◈' },
  { id: 'vocabulary', label: 'Vocab', icon: '❖' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard')

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F2', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: '#16161A',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        borderBottom: '3px solid #FFD60A',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 32, height: 32,
            background: '#E84855',
            border: '2px solid #FFD60A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Archivo Black", sans-serif',
            color: '#FFD60A',
            fontSize: '14px',
            transform: 'rotate(-3deg)',
          }}>L</div>
          <span style={{ fontFamily: '"Archivo Black", sans-serif', color: '#FAF8F2', fontSize: '18px', letterSpacing: '-0.5px' }}>
            LINGO<span style={{ color: '#FFD60A' }}>LOOP</span>
          </span>
        </div>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          color: '#2EC4B6',
          fontSize: '12px',
          background: 'rgba(46,196,182,0.12)',
          padding: '4px 10px',
          border: '1px solid rgba(46,196,182,0.4)',
        }}>
          🇫🇷 French — A2
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'dashboard' && <Dashboard onNavigate={setTab} />}
        {tab === 'lessons' && <Lessons />}
        {tab === 'flashcards' && <Flashcards />}
        {tab === 'vocabulary' && <Vocabulary />}
      </main>

      {/* Bottom nav */}
      <nav style={{
        background: '#16161A',
        display: 'flex',
        borderTop: '2px solid #2EC4B6',
        flexShrink: 0,
      }}>
        {NAV_ITEMS.map(item => {
          const active = tab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                flex: 1,
                padding: '12px 0 10px',
                background: active ? '#E84855' : 'transparent',
                border: 'none',
                color: active ? '#FFD60A' : '#6B6860',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                transition: 'background 0.15s',
                borderRight: item.id !== 'vocabulary' ? '1px solid #2a2a2e' : 'none',
              }}
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
