import { useState } from 'react'
import type { OldQuestion } from '../data/courses'

export default function OldQuestions({ questions, courseName }: { questions: OldQuestion[]; courseName: string }) {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  function choose(qId: number, optIdx: number) {
    if (revealed.has(qId)) return
    setSelected(s => ({ ...s, [qId]: optIdx }))
  }

  function reveal(qId: number) {
    if (selected[qId] === undefined) return
    setRevealed(s => new Set([...s, qId]))
  }

  const score = questions.filter(q => revealed.has(q.id) && selected[q.id] === q.correct).length
  const done = questions.length > 0 && questions.every(q => revealed.has(q.id))

  if (questions.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
        <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '20px', marginBottom: '8px' }}>
          No Past Questions Yet
        </div>
        <div style={{ fontFamily: '"Archivo", sans-serif', color: '#6B6860', fontSize: '14px' }}>
          Complete lessons in {courseName} to unlock review questions.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '10px',
          color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px',
        }}>{courseName.toUpperCase()} · REVIEW</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '24px', margin: 0 }}>
            Old Questions
          </h2>
          {done && (
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '14px',
              color: '#2EC4B6',
            }}>{score}/{questions.length} correct</div>
          )}
        </div>
      </div>

      {done && (
        <div style={{
          background: score === questions.length ? '#2EC4B6' : '#16161A',
          border: `2px solid ${score === questions.length ? '#2EC4B6' : '#FFD60A'}`,
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ fontSize: '22px' }}>{score === questions.length ? '🏆' : '📝'}</span>
          <div>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              color: score === questions.length ? '#FFFFFF' : '#FFD60A',
              fontSize: '14px',
              marginBottom: '2px',
            }}>
              {score === questions.length ? 'Perfect score!' : `${score} out of ${questions.length} correct`}
            </div>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '10px',
              color: score === questions.length ? 'rgba(255,255,255,0.7)' : '#aaa',
            }}>
              {score < questions.length ? 'Review the explanations below to improve.' : 'All answers correct — great work!'}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {questions.map((q, qi) => {
          const picked = selected[q.id]
          const isRevealed = revealed.has(q.id)

          return (
            <div key={q.id} style={{
              background: '#FFFFFF',
              border: `1.5px solid ${isRevealed ? (picked === q.correct ? '#2EC4B6' : '#E84855') : '#D6D3CA'}`,
            }}>
              {/* Question header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid #F0EDE4',
                display: 'flex', gap: '12px', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#16161A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '10px', color: '#FFD60A',
                }}>{qi + 1}</div>
                <div>
                  <div style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: '15px', lineHeight: 1.4, marginBottom: '4px',
                  }}>{q.question}</div>
                  <div style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '9px',
                    color: '#6B6860', letterSpacing: '0.08em',
                  }}>FROM: {q.lesson.toUpperCase()}</div>
                </div>
              </div>

              {/* Options */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, oi) => {
                  let bg = 'transparent'
                  let border = '1px solid #D6D3CA'
                  let color = '#16161A'

                  if (isRevealed) {
                    if (oi === q.correct) { bg = 'rgba(46,196,182,0.1)'; border = '1.5px solid #2EC4B6'; color = '#16161A' }
                    else if (oi === picked) { bg = 'rgba(232,72,85,0.08)'; border = '1.5px solid #E84855'; color = '#E84855' }
                  } else if (picked === oi) {
                    bg = '#F0EDE4'; border = '1.5px solid #16161A'
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => choose(q.id, oi)}
                      disabled={isRevealed}
                      style={{
                        background: bg, border,
                        padding: '10px 14px',
                        display: 'flex', alignItems: 'center', gap: '10px',
                        cursor: isRevealed ? 'default' : 'pointer',
                        textAlign: 'left', color,
                        transition: 'background 0.1s',
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `1.5px solid ${isRevealed && oi === q.correct ? '#2EC4B6' : isRevealed && oi === picked ? '#E84855' : '#D6D3CA'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        fontFamily: '"DM Mono", monospace', fontSize: '9px',
                        color: isRevealed && oi === q.correct ? '#2EC4B6' : isRevealed && oi === picked ? '#E84855' : '#6B6860',
                      }}>
                        {isRevealed && oi === q.correct ? '✓' : isRevealed && oi === picked && picked !== q.correct ? '✗' : String.fromCharCode(65 + oi)}
                      </div>
                      <span style={{ fontFamily: '"Archivo", sans-serif', fontSize: '13px' }}>{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Check / Explanation */}
              <div style={{ padding: '0 16px 14px' }}>
                {!isRevealed ? (
                  <button
                    onClick={() => reveal(q.id)}
                    disabled={picked === undefined}
                    style={{
                      background: picked !== undefined ? '#E84855' : '#F0EDE4',
                      color: picked !== undefined ? '#FFFFFF' : '#6B6860',
                      border: 'none',
                      padding: '10px 20px',
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase',
                      cursor: picked !== undefined ? 'pointer' : 'default',
                    }}
                  >Check Answer</button>
                ) : (
                  <div style={{
                    background: '#F0EDE4',
                    border: '1px solid #D6D3CA',
                    padding: '10px 12px',
                    display: 'flex', gap: '8px',
                  }}>
                    <span style={{ fontSize: '14px' }}>💬</span>
                    <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '12px', color: '#16161A', lineHeight: 1.5 }}>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
