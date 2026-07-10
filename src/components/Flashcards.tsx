import { useState } from 'react'

const CARDS = [
  { fr: 'le pain', en: 'bread', example: 'Je veux du pain, s\'il vous plaît.' },
  { fr: 'le fromage', en: 'cheese', example: 'La France a plus de 300 fromages.' },
  { fr: 'le vin', en: 'wine', example: 'Un verre de vin rouge, merci.' },
  { fr: 'l\'eau', en: 'water', example: 'De l\'eau minérale, s\'il vous plaît.' },
  { fr: 'le restaurant', en: 'restaurant', example: 'Ce restaurant est excellent.' },
  { fr: 'la carte', en: 'menu', example: 'Puis-je avoir la carte?' },
  { fr: 'l\'addition', en: 'bill / check', example: 'L\'addition, s\'il vous plaît!' },
  { fr: 'délicieux', en: 'delicious', example: 'Ce plat est vraiment délicieux.' },
]

export default function Flashcards() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<number>>(new Set())
  const [review, setReview] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  const card = CARDS[index]
  const total = CARDS.length
  const progress = ((known.size + review.size) / total) * 100

  function handleKnow() {
    setKnown(s => new Set([...s, index]))
    advance()
  }

  function handleReview() {
    setReview(s => new Set([...s, index]))
    advance()
  }

  function advance() {
    setFlipped(false)
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  function restart() {
    setIndex(0)
    setFlipped(false)
    setKnown(new Set())
    setReview(new Set())
    setDone(false)
  }

  if (done) {
    return (
      <div style={{ padding: '40px 20px', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '56px', color: '#FFD60A',
          lineHeight: 1, marginBottom: '8px',
        }}>◆</div>
        <h2 style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '28px', margin: '0 0 8px',
        }}>Session Complete!</h2>
        <p style={{ fontFamily: '"Archivo", sans-serif', color: '#6B6860', marginBottom: '28px' }}>
          You went through all {total} cards.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '36px', color: '#2EC4B6',
            }}>{known.size}</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860' }}>KNEW IT</div>
          </div>
          <div style={{ width: '1px', background: '#D6D3CA' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '36px', color: '#E84855',
            }}>{review.size}</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860' }}>REVIEW</div>
          </div>
        </div>
        <button
          onClick={restart}
          style={{
            background: '#E84855', color: '#FFFFFF', border: 'none',
            padding: '14px 32px',
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '14px', letterSpacing: '0.06em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >Restart Deck</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 20px', maxWidth: 500, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '10px',
            color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px',
          }}>CHAPTER 3 · FOOD</div>
          <h2 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '22px', margin: 0,
          }}>Flashcards</h2>
        </div>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '12px',
          color: '#6B6860', background: '#F0EDE4',
          padding: '6px 12px', border: '1px solid #D6D3CA',
        }}>
          {index + 1} / {total}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#D6D3CA', height: '4px', marginBottom: '28px' }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: '#2EC4B6', transition: 'width 0.3s',
        }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          background: flipped ? '#16161A' : '#FFFFFF',
          border: `2.5px solid ${flipped ? '#FFD60A' : '#E84855'}`,
          minHeight: '220px',
          padding: '32px 28px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative',
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <div style={{
          position: 'absolute', top: 12, left: 14,
          fontFamily: '"DM Mono", monospace', fontSize: '9px',
          color: flipped ? '#6B6860' : '#6B6860',
          letterSpacing: '0.1em',
        }}>{flipped ? 'ENGLISH' : 'FRANÇAIS'}</div>

        <div style={{
          position: 'absolute', top: 12, right: 14,
          fontFamily: '"DM Mono", monospace', fontSize: '9px',
          color: '#6B6860',
        }}>{flipped ? '▼ TAP TO FLIP' : '▼ TAP TO FLIP'}</div>

        {!flipped ? (
          <div style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '36px',
            color: '#16161A',
            textAlign: 'center',
          }}>{card.fr}</div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '32px',
              color: '#FAF8F2',
              marginBottom: '16px',
            }}>{card.en}</div>
            <div style={{
              fontFamily: '"Archivo", sans-serif',
              fontSize: '13px',
              color: '#2EC4B6',
              fontStyle: 'italic',
              lineHeight: 1.5,
              padding: '0 8px',
            }}>{card.example}</div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {flipped ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReview}
            style={{
              flex: 1, background: 'transparent',
              border: '2px solid #E84855', color: '#E84855',
              padding: '14px',
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >✗ Review Again</button>
          <button
            onClick={handleKnow}
            style={{
              flex: 1, background: '#2EC4B6',
              border: '2px solid #2EC4B6', color: '#FFFFFF',
              padding: '14px',
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >✓ Got It</button>
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          style={{
            width: '100%', background: '#E84855',
            border: 'none', color: '#FFFFFF',
            padding: '16px',
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '14px', letterSpacing: '0.06em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >Reveal Answer →</button>
      )}

      {/* Mini legend */}
      <div style={{
        display: 'flex', gap: '16px', justifyContent: 'center',
        marginTop: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 8, height: 8, background: '#2EC4B6' }} />
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>
            KNEW IT: {known.size}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 8, height: 8, background: '#E84855' }} />
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>
            REVIEW: {review.size}
          </span>
        </div>
      </div>
    </div>
  )
}
