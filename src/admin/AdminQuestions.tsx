import { useState } from 'react'
import { COURSES } from '../data/courses'
import type { OldQuestion } from '../data/courses'

export default function AdminQuestions() {
  const [courseId, setCourseId] = useState('fr-a2')
  const [questions, setQuestions] = useState<OldQuestion[]>(
    COURSES.find(c => c.id === 'fr-a2')?.oldQuestions ?? []
  )
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // Form state
  const [qText, setQText] = useState('')
  const [opts, setOpts] = useState(['', '', '', ''])
  const [correct, setCorrect] = useState(0)
  const [explanation, setExplanation] = useState('')
  const [lesson, setLesson] = useState('')

  function handleCourseChange(id: string) {
    setCourseId(id)
    setQuestions(COURSES.find(c => c.id === id)?.oldQuestions ?? [])
    setShowForm(false)
    setExpandedId(null)
  }

  function addQuestion() {
    if (!qText.trim() || opts.some(o => !o.trim())) return
    const q: OldQuestion = {
      id: Date.now(),
      question: qText.trim(),
      options: opts.map(o => o.trim()),
      correct,
      explanation: explanation.trim(),
      lesson: lesson.trim() || 'General',
    }
    setQuestions(prev => [...prev, q])
    setQText(''); setOpts(['', '', '', '']); setCorrect(0); setExplanation(''); setLesson('')
    setShowForm(false)
  }

  function removeQuestion(id: number) {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const course = COURSES.find(c => c.id === courseId)

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px' }}>CONTENT</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', margin: 0 }}>Question Bank</h2>
          <button onClick={() => setShowForm(true)} style={{
            background: '#E84855', color: '#FFFFFF', border: 'none',
            padding: '9px 18px', fontFamily: '"Archivo Black", sans-serif',
            fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
          }}>+ NEW QUESTION</button>
        </div>
      </div>

      {/* Course picker */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {COURSES.map(c => (
          <button key={c.id} onClick={() => handleCourseChange(c.id)} style={{
            background: courseId === c.id ? '#16161A' : 'transparent',
            color: courseId === c.id ? '#FFD60A' : '#6B6860',
            border: `1.5px solid ${courseId === c.id ? '#16161A' : '#D6D3CA'}`,
            padding: '7px 14px', fontFamily: '"DM Mono", monospace',
            fontSize: '10px', letterSpacing: '0.06em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span>{c.flag}</span> {c.name}
          </button>
        ))}
      </div>

      {/* Add question form */}
      {showForm && (
        <div style={{ background: '#FFFFFF', border: '2px solid #2EC4B6', padding: '22px', marginBottom: '24px' }}>
          <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', color: '#2EC4B6', marginBottom: '16px' }}>
            NEW QUESTION — {course?.flag} {course?.name}
          </div>

          <div style={{ marginBottom: '12px' }}>
            <Label>Question Text</Label>
            <textarea
              value={qText} onChange={e => setQText(e.target.value)}
              placeholder="Type the question here…"
              rows={2}
              style={{
                width: '100%', border: '1px solid #D6D3CA', padding: '9px 12px',
                fontFamily: '"Archivo", sans-serif', fontSize: '13px',
                outline: 'none', resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            {opts.map((opt, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <button
                    onClick={() => setCorrect(i)}
                    style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${correct === i ? '#2EC4B6' : '#D6D3CA'}`,
                      background: correct === i ? '#2EC4B6' : 'transparent',
                      cursor: 'pointer', flexShrink: 0,
                    }}
                  />
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>
                    OPTION {String.fromCharCode(65 + i)}{correct === i ? ' (CORRECT)' : ''}
                  </span>
                </div>
                <input
                  value={opt} onChange={e => { const n = [...opts]; n[i] = e.target.value; setOpts(n) }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}…`}
                  style={{
                    width: '100%', border: `1px solid ${correct === i ? '#2EC4B6' : '#D6D3CA'}`,
                    padding: '8px 10px', fontFamily: '"Archivo", sans-serif',
                    fontSize: '13px', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div>
              <Label>Explanation</Label>
              <input value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="Why is this the correct answer?" style={inputStyle} />
            </div>
            <div>
              <Label>Source Lesson</Label>
              <input value={lesson} onChange={e => setLesson(e.target.value)} placeholder="e.g. Food & Restaurants" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addQuestion} style={{
              background: '#2EC4B6', color: '#FFFFFF', border: 'none',
              padding: '10px 22px', fontFamily: '"Archivo Black", sans-serif',
              fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
            }}>SAVE QUESTION</button>
            <button onClick={() => setShowForm(false)} style={{
              background: 'transparent', border: '1px solid #D6D3CA', color: '#6B6860',
              padding: '10px 16px', fontFamily: '"DM Mono", monospace',
              fontSize: '10px', cursor: 'pointer',
            }}>CANCEL</button>
          </div>
        </div>
      )}

      {/* Question list */}
      {questions.length === 0 ? (
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DC',
          padding: '48px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
          <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px', marginBottom: '6px' }}>No Questions Yet</div>
          <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '13px', color: '#6B6860' }}>
            Add questions for {course?.name} using the button above.
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {questions.map((q, i) => (
            <div key={q.id} style={{ background: '#FFFFFF', border: '1.5px solid #E8E5DC' }}>
              <button
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                style={{
                  width: '100%', padding: '14px 16px', background: 'transparent', border: 'none',
                  display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: '#16161A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD60A', flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', marginBottom: '2px' }}>{q.question}</div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>
                    FROM: {q.lesson.toUpperCase()} · {q.options.length} OPTIONS
                  </div>
                </div>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#6B6860' }}>
                  {expandedId === q.id ? '▲' : '▼'}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); removeQuestion(q.id) }}
                  style={{
                    background: 'transparent', border: '1px solid #E84855', color: '#E84855',
                    width: 26, height: 26, cursor: 'pointer', fontSize: '11px', flexShrink: 0,
                  }}
                >✕</button>
              </button>

              {expandedId === q.id && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid #F0EDE4' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', marginBottom: '12px' }}>
                    {q.options.map((opt, oi) => (
                      <div key={oi} style={{
                        padding: '9px 12px',
                        background: oi === q.correct ? 'rgba(46,196,182,0.08)' : '#FAFAF8',
                        border: `1px solid ${oi === q.correct ? '#2EC4B6' : '#E8E5DC'}`,
                        display: 'flex', gap: '8px', alignItems: 'center',
                      }}>
                        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: oi === q.correct ? '#2EC4B6' : '#6B6860' }}>
                          {oi === q.correct ? '✓' : String.fromCharCode(65 + oi)}
                        </span>
                        <span style={{ fontFamily: '"Archivo", sans-serif', fontSize: '12px' }}>{opt}</span>
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div style={{ background: '#F0EDE4', padding: '10px 12px', fontFamily: '"Archivo", sans-serif', fontSize: '12px', color: '#16161A', lineHeight: 1.5 }}>
                      💬 {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.08em', marginBottom: '4px' }}>
      {String(children).toUpperCase()}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #D6D3CA', padding: '8px 10px',
  fontFamily: '"Archivo", sans-serif', fontSize: '13px',
  outline: 'none', boxSizing: 'border-box',
}
