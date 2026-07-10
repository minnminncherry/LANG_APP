import { useState } from 'react'

const LESSONS = [
  {
    id: 1, chapter: 1, title: 'Greetings & Introductions', status: 'done',
    xp: 50, items: 12,
    words: ['Bonjour', 'Merci', 'S\'il vous plaît', 'Au revoir'],
  },
  {
    id: 2, chapter: 1, title: 'Numbers 1–20', status: 'done',
    xp: 50, items: 20,
    words: ['Un', 'Deux', 'Trois', 'Quatre'],
  },
  {
    id: 3, chapter: 2, title: 'Colors & Descriptions', status: 'done',
    xp: 75, items: 15,
    words: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
  },
  {
    id: 4, chapter: 3, title: 'Food & Restaurants', status: 'active',
    xp: 100, items: 18,
    words: ['Pain', 'Fromage', 'Vin', 'Eau'],
  },
  {
    id: 5, chapter: 3, title: 'Shopping & Prices', status: 'locked',
    xp: 100, items: 14,
    words: [],
  },
  {
    id: 6, chapter: 3, title: 'Directions & Transport', status: 'locked',
    xp: 125, items: 16,
    words: [],
  },
  {
    id: 7, chapter: 4, title: 'Family & Relationships', status: 'locked',
    xp: 125, items: 20,
    words: [],
  },
]

const STATUS_COLORS: Record<string, string> = {
  done: '#2EC4B6',
  active: '#E84855',
  locked: '#D6D3CA',
}
const STATUS_LABELS: Record<string, string> = {
  done: '✓ COMPLETE',
  active: '▶ IN PROGRESS',
  locked: '⬡ LOCKED',
}

export default function Lessons() {
  const [expanded, setExpanded] = useState<number | null>(4)
  const chapters = [...new Set(LESSONS.map(l => l.chapter))]

  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '10px', color: '#6B6860',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '6px',
        }}>French A2</div>
        <h2 style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '24px', margin: 0, lineHeight: 1.1,
        }}>Your Lessons</h2>
      </div>

      {/* Progress bar */}
      <div style={{
        background: '#F0EDE4',
        border: '1.5px solid #D6D3CA',
        padding: '14px 16px',
        marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860',
            marginBottom: '6px',
          }}>
            <span>OVERALL PROGRESS</span>
            <span>3 / 7 LESSONS</span>
          </div>
          <div style={{ background: '#D6D3CA', height: '6px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: '43%', height: '100%',
              background: '#2EC4B6',
            }} />
          </div>
        </div>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '20px', color: '#2EC4B6',
        }}>43%</div>
      </div>

      {chapters.map(ch => (
        <div key={ch} style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '10px',
          }}>
            <div style={{
              width: 28, height: 28,
              background: '#16161A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Archivo Black", sans-serif',
              color: '#FFD60A', fontSize: '12px',
            }}>{ch}</div>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Chapter {ch}</div>
            <div style={{ flex: 1, height: '1px', background: '#D6D3CA' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {LESSONS.filter(l => l.chapter === ch).map(lesson => {
              const isExpanded = expanded === lesson.id
              const locked = lesson.status === 'locked'
              return (
                <div key={lesson.id}>
                  <button
                    onClick={() => !locked && setExpanded(isExpanded ? null : lesson.id)}
                    disabled={locked}
                    style={{
                      width: '100%',
                      background: isExpanded ? '#16161A' : '#FFFFFF',
                      border: `1.5px solid ${STATUS_COLORS[lesson.status]}`,
                      padding: '14px 16px',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      cursor: locked ? 'default' : 'pointer',
                      textAlign: 'left',
                      opacity: locked ? 0.5 : 1,
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{
                      width: 8, height: 8,
                      background: STATUS_COLORS[lesson.status],
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: '"Archivo Black", sans-serif',
                        fontSize: '14px',
                        color: isExpanded ? '#FAF8F2' : '#16161A',
                        marginBottom: '3px',
                      }}>{lesson.title}</div>
                      <div style={{
                        fontFamily: '"DM Mono", monospace', fontSize: '9px',
                        color: STATUS_COLORS[lesson.status],
                        letterSpacing: '0.08em',
                      }}>{STATUS_LABELS[lesson.status]} · {lesson.items} ITEMS</div>
                    </div>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: '11px',
                      color: '#FFD60A',
                      background: '#16161A',
                      padding: '3px 8px',
                    }}>+{lesson.xp} XP</div>
                  </button>

                  {isExpanded && lesson.words.length > 0 && (
                    <div style={{
                      background: '#F0EDE4',
                      border: '1.5px solid #E84855',
                      borderTop: 'none',
                      padding: '14px 16px',
                    }}>
                      <div style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '9px', color: '#6B6860',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}>Sample Words</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {lesson.words.map(w => (
                          <span key={w} style={{
                            background: '#FFFFFF',
                            border: '1px solid #D6D3CA',
                            padding: '4px 10px',
                            fontFamily: '"Archivo", sans-serif',
                            fontSize: '13px',
                          }}>{w}</span>
                        ))}
                      </div>
                      <button style={{
                        background: '#E84855',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 20px',
                        fontFamily: '"Archivo Black", sans-serif',
                        fontSize: '12px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}>
                        {lesson.status === 'active' ? 'Continue Lesson →' : 'Review Lesson →'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
