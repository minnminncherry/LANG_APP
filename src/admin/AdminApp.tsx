import { useState } from 'react'
import AdminDashboard from './AdminDashboard'
import AdminUsers from './AdminUsers'
import AdminCourses from './AdminCourses'
import AdminQuestions from './AdminQuestions'

type AdminTab = 'dashboard' | 'users' | 'courses' | 'questions'

const NAV: { id: AdminTab; label: string; icon: string; sub: string }[] = [
  { id: 'dashboard', label: 'Overview', icon: '▦', sub: 'Stats & activity' },
  { id: 'users', label: 'Users', icon: '◎', sub: 'Manage learners' },
  { id: 'courses', label: 'Courses', icon: '📖', sub: 'Edit lessons' },
  { id: 'questions', label: 'Questions', icon: '✏️', sub: 'Question bank' },
]

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (pw === 'admin123') { onLogin() }
    else { setError(true); setTimeout(() => setError(false), 1500) }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#16161A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 360 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: 40, height: 40, background: '#E84855', border: '2px solid #FFD60A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Archivo Black", sans-serif', color: '#FFD60A', fontSize: '18px',
              transform: 'rotate(-3deg)',
            }}>L</div>
            <span style={{ fontFamily: '"Archivo Black", sans-serif', color: '#FAF8F2', fontSize: '24px', letterSpacing: '-0.5px' }}>
              LINGO<span style={{ color: '#FFD60A' }}>LOOP</span>
            </span>
          </div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '10px',
            color: '#2EC4B6', letterSpacing: '0.2em', marginTop: '8px',
          }}>ADMIN PORTAL</div>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '6px' }}>
              PASSWORD
            </div>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              style={{
                width: '100%', background: '#1E1E24',
                border: `1.5px solid ${error ? '#E84855' : '#2a2a2e'}`,
                padding: '12px 14px', color: '#FAF8F2',
                fontFamily: '"Archivo", sans-serif', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => !error && (e.currentTarget.style.borderColor = '#2EC4B6')}
              onBlur={e => (e.currentTarget.style.borderColor = '#2a2a2e')}
            />
            {error && (
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#E84855', marginTop: '5px', letterSpacing: '0.06em' }}>
                Incorrect password
              </div>
            )}
          </div>
          <button type="submit" style={{
            width: '100%', background: '#2EC4B6', color: '#FFFFFF', border: 'none',
            padding: '13px', fontFamily: '"Archivo Black", sans-serif',
            fontSize: '13px', letterSpacing: '0.08em', cursor: 'pointer',
          }}>SIGN IN →</button>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#3a3a44', textAlign: 'center', marginTop: '12px', letterSpacing: '0.06em' }}>
            Demo password: admin123
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminApp({ onExit }: { onExit: () => void }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<AdminTab>('dashboard')

  if (!loggedIn) return <LoginGate onLogin={() => setLoggedIn(true)} />

  return (
    <div style={{ minHeight: '100vh', background: '#F5F3EE', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{
        background: '#16161A', height: 52, display: 'flex',
        alignItems: 'center', padding: '0 24px', gap: '20px',
        borderBottom: '2px solid #2EC4B6', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 28, height: 28, background: '#E84855', border: '2px solid #FFD60A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Archivo Black", sans-serif', color: '#FFD60A', fontSize: '12px',
            transform: 'rotate(-3deg)',
          }}>L</div>
          <span style={{ fontFamily: '"Archivo Black", sans-serif', color: '#FAF8F2', fontSize: '15px', letterSpacing: '-0.3px' }}>
            LINGO<span style={{ color: '#FFD60A' }}>LOOP</span>
          </span>
          <span style={{
            fontFamily: '"DM Mono", monospace', fontSize: '9px',
            color: '#2EC4B6', background: 'rgba(46,196,182,0.15)',
            padding: '2px 8px', border: '1px solid rgba(46,196,182,0.3)',
            letterSpacing: '0.1em', marginLeft: '4px',
          }}>ADMIN</span>
        </div>

        <div style={{ flex: 1 }} />

        <button onClick={onExit} style={{
          background: 'transparent', border: '1px solid #2a2a2e', color: '#6B6860',
          padding: '5px 14px', fontFamily: '"DM Mono", monospace',
          fontSize: '9px', letterSpacing: '0.08em', cursor: 'pointer',
        }}>← BACK TO APP</button>
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, background: '#16161A', flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          borderRight: '1px solid #2a2a2e',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '20px 16px 12px' }}>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '8px', color: '#3a3a44', letterSpacing: '0.15em', marginBottom: '8px' }}>
              NAVIGATION
            </div>
            {NAV.map(item => {
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 12px',
                    background: active ? 'rgba(46,196,182,0.12)' : 'transparent',
                    border: 'none',
                    borderLeft: `3px solid ${active ? '#2EC4B6' : 'transparent'}`,
                    cursor: 'pointer', marginBottom: '2px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: active ? '#2EC4B6' : '#FAF8F2', marginBottom: '1px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '8px', color: '#3a3a44', letterSpacing: '0.04em' }}>
                      {item.sub}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid #2a2a2e' }}>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#3a3a44', marginBottom: '4px' }}>LOGGED IN AS</div>
            <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '12px', color: '#FAF8F2' }}>Admin</div>
            <button onClick={() => setLoggedIn(false)} style={{
              marginTop: '10px', background: 'transparent',
              border: '1px solid #2a2a2e', color: '#6B6860',
              width: '100%', padding: '7px',
              fontFamily: '"DM Mono", monospace', fontSize: '9px',
              letterSpacing: '0.06em', cursor: 'pointer',
            }}>SIGN OUT</button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {tab === 'dashboard' && <AdminDashboard />}
          {tab === 'users' && <AdminUsers />}
          {tab === 'courses' && <AdminCourses />}
          {tab === 'questions' && <AdminQuestions />}
        </main>
      </div>
    </div>
  )
}
