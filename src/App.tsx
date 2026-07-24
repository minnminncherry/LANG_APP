import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import Lessons from './components/Lessons'
import Flashcards from './components/Flashcards'
import OldQuestions from './components/OldQuestions'
import CourseSelect from './components/CourseSelect'
import AdminApp from './admin/AdminApp'
import { COURSES } from './data/courses'
import Login from './components/Login'
import Signup from './components/Signup'
import api from './api/api';


type Tab = 'dashboard' | 'lessons' | 'flashcards' | 'old-questions'

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Home', icon: '⌂' },
  { id: 'lessons', label: 'Lessons', icon: '📖' },
  { id: 'flashcards', label: 'Cards', icon: '◈' },
  { id: 'old-questions', label: 'Review', icon: '✏️' },
]

export default function App() {
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<Tab>('dashboard')
  const [activeCourseId, setActiveCourseId] = useState('JLPT-N5')
  const [showCourseSelect, setShowCourseSelect] = useState(false)
  const [adminMode, setAdminMode] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
      const loadBackend = async () => {
        try {
            const response = await api.get("/api/hello");
            setMessage(response.data.message);
        } catch (err) {
            console.error(err);
            setMessage("❌ Cannot connect to backend");
        }
    };
    loadBackend();
}, []);

  if (adminMode) return <AdminApp onExit={() => setAdminMode(false)} />

  if (showSignup) {
    return <Signup onLogin={() => { setLoggedIn(true); setShowSignup(false) }} />
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} onSignup={() => setShowSignup(true)} />
  }

  const course = COURSES.find(c => c.id === activeCourseId) ?? COURSES[0]

  function handleSelectCourse(id: string) {
    setActiveCourseId(id)
    setShowCourseSelect(false)
  }

  if (showCourseSelect) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF8F2', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          background: '#16161A', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '56px', borderBottom: '3px solid #2EC4B6', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 32, height: 32, background: '#E84855', border: '2px solid #FFD60A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Archivo Black", sans-serif', color: '#FFD60A', fontSize: '14px',
              transform: 'rotate(-3deg)',
            }}>L</div>
            <span style={{ fontFamily: '"Archivo Black", sans-serif', color: '#FAF8F2', fontSize: '18px', letterSpacing: '-0.5px' }}>
              JLPT<span style={{ color: '#FFD60A' }}>LANG</span>
            </span>
          </div>
          <button
            onClick={() => setShowCourseSelect(false)}
            style={{
              background: 'transparent', border: '1px solid #2EC4B6',
              color: '#2EC4B6', padding: '6px 14px', cursor: 'pointer',
              fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.06em',
            }}
          >← BACK</button>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <CourseSelect activeCourseId={activeCourseId} onSelect={handleSelectCourse} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F2', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: '#16161A', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px', borderBottom: '3px solid #2EC4B6', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 32, height: 32, background: '#E84855', border: '2px solid #FFD60A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Archivo Black", sans-serif', color: '#FFD60A', fontSize: '14px',
            transform: 'rotate(-3deg)',
          }}>JL</div>
          <span style={{ fontFamily: '"Archivo Black", sans-serif', color: '#FAF8F2', fontSize: '18px', letterSpacing: '-0.5px' }}>
            JLPT<span style={{ color: '#FFD60A' }}>LANG</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowCourseSelect(true)}
            style={{
              fontFamily: '"DM Mono", monospace', color: '#2EC4B6', fontSize: '11px',
              background: 'rgba(46,196,182,0.1)', padding: '5px 10px',
              border: '1px solid rgba(46,196,182,0.4)', cursor: 'pointer',
              letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {course.flag} {course.language} — {course.level} ▾
          </button>
          <button
            onClick={() => setAdminMode(true)}
            style={{
              fontFamily: '"DM Mono", monospace', color: '#FFD60A', fontSize: '10px',
              background: 'rgba(255,214,10,0.1)', padding: '5px 10px',
              border: '1px solid rgba(255,214,10,0.3)', cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >ADMIN</button>
        </div>
        <button onClick={() => setLoggedIn(false)} style={{fontFamily: '"DM Mono", monospace', color: '#FFD60A', fontSize: '10px',
              background: 'rgba(255,214,10,0.1)', padding: '5px 10px',
              border: '1px solid rgba(255,214,10,0.3)', cursor: 'pointer',
              letterSpacing: '0.08em',}}> Logout </button>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{padding: 15, background: "#2EC4B6",color: "white"}}>
          Backend says:
          {message}
        </div>
        {tab === 'dashboard' && (
          <Dashboard
            course={course}
            onNavigate={(t) => setTab(t as Tab)}
            onChangeCourse={() => setShowCourseSelect(true)}
          />
        )}
        {tab === 'lessons' && (
          <Lessons lessons={course.lessons} courseName={course.name} courseFlag={course.flag} />
        )}
        {tab === 'flashcards' && (
          <Flashcards cards={course.flashcards} courseName={course.name} courseFlag={course.flag} />
        )}
        {tab === 'old-questions' && (
          <OldQuestions questions={course.oldQuestions} courseName={course.name} />
        )}
      </main>

      {/* Bottom nav */}
      <nav style={{ background: '#16161A', display: 'flex', borderTop: '2px solid #2EC4B6', flexShrink: 0 }}>
        {NAV_ITEMS.map(item => {
          const active = tab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                flex: 1, padding: '12px 0 10px',
                background: active ? '#E84855' : 'transparent',
                border: 'none', color: active ? '#FFD60A' : '#6B6860',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '3px', transition: 'background 0.15s',
                borderRight: item.id !== 'old-questions' ? '1px solid #2a2a2e' : 'none',
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
