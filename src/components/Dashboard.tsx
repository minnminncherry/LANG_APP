import type { Course } from '../data/courses'

const STREAK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Dashboard({
  course,
  onNavigate,
  onChangeCourse,
}: {
  course: Course
  onNavigate: (tab: string) => void
  onChangeCourse: () => void
}) {
  const completed = [true, true, true, true, false, false, false].map((_, i) => i < Math.min(course.streak, 7))

  const STATS = [
    { label: 'Day Streak', value: String(course.streak), unit: 'days', color: '#2EC4B6' },
    { label: 'Words Learned', value: String(course.wordsLearned), unit: 'words', color: '#2EC4B6' },
    { label: 'Lessons Done', value: String(course.lessonsCompleted), unit: 'total', color: '#2EC4B6' },
    { label: 'Accuracy', value: String(course.accuracy), unit: '%', color: '#2EC4B6' },
  ]

  const QUICK_ACTIONS = [
    { label: 'Daily Lesson', desc: `Continue ${course.lessons.find(l => l.status === 'active')?.title ?? 'next lesson'}`, tab: 'lessons', color: '#E84855', geo: '▲' },
    { label: 'Flashcards', desc: `${course.flashcards.length} cards in deck`, tab: 'flashcards', color: '#2EC4B6', geo: '◆' },
  ]

  const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  });

  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      {/* Greeting */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#6B6860',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px',
        }}>{currentDate}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '28px', color: '#16161A', margin: 0, lineHeight: 1.1 }}>
            Hello,<br /><span style={{ color: '#E84855' }}>Sophie!</span>
          </h1>
          <button
            onClick={onChangeCourse}
            style={{
              background: '#F0EDE4', border: '1px solid #D6D3CA',
              padding: '6px 12px', cursor: 'pointer',
              fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860',
              letterSpacing: '0.06em',
            }}
          >{course.flag} Switch</button>
        </div>
      </div>

      {/* Streak banner */}
      <div style={{
        background: '#1A2E35', padding: '16px 20px', marginBottom: '20px',
        border: '2px solid #2EC4B6', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -12, right: -12,
          width: 60, height: 60, background: '#2EC4B6', opacity: 0.12, borderRadius: '50%',
        }} />
        <div style={{
          fontFamily: '"Archivo Black", sans-serif', color: '#2EC4B6',
          fontSize: '13px', marginBottom: '10px', letterSpacing: '0.05em',
        }}>THIS WEEK</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {STREAK_DAYS.map((day, i) => (
            <div key={day} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: completed[i] ? '#2EC4B6' : 'rgba(250,248,242,0.08)',
                border: `1px solid ${completed[i] ? '#2EC4B6' : 'rgba(250,248,242,0.2)'}`,
                marginBottom: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 4px',
              }}>
                {completed[i] && <span style={{ fontSize: '12px', color: '#FFFFFF' }}>✓</span>}
              </div>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '8px',
                color: completed[i] ? '#2EC4B6' : '#6B6860', letterSpacing: '0.05em',
              }}>{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {STATS.map(stat => (
          <div key={stat.label} style={{
            background: '#FFFFFF', border: '1.5px solid #D6D3CA',
            padding: '14px 16px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: -8, right: -4,
              fontFamily: '"Archivo Black", sans-serif', fontSize: '40px',
              color: stat.color, opacity: 0.06, lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px',
            }}>{stat.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860' }}>{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', letterSpacing: '0.08em', marginBottom: '12px', textTransform: 'uppercase' }}>
          Continue Learning
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.tab)}
              style={{
                background: action.color, border: 'none', padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', color: '#FFFFFF', textAlign: 'left', transition: 'transform 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div>
                <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px', marginBottom: '2px' }}>{action.label}</div>
                <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '12px', opacity: 0.8 }}>{action.desc}</div>
              </div>
              <span style={{ fontSize: '24px', opacity: 0.7 }}>{action.geo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily tip */}
      <div style={{
        background: '#F0EDE4', border: '1px solid #D6D3CA',
        padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start',
      }}>
        <div style={{
          width: 28, height: 28, background: '#2EC4B6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: '14px',
        }}>💡</div>
        <div>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: '11px',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px', color: '#2EC4B6',
          }}>Tip du Jour</div>
        </div>
      </div>
    </div>
  )
}
