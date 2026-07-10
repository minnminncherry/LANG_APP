import { useState } from 'react'

type Word = {
  fr: string
  en: string
  type: string
  chapter: number
  mastery: number
}

const WORDS: Word[] = [
  { fr: 'bonjour', en: 'hello / good morning', type: 'excl.', chapter: 1, mastery: 100 },
  { fr: 'merci', en: 'thank you', type: 'excl.', chapter: 1, mastery: 100 },
  { fr: 'au revoir', en: 'goodbye', type: 'excl.', chapter: 1, mastery: 90 },
  { fr: 'un', en: 'one', type: 'num.', chapter: 1, mastery: 100 },
  { fr: 'rouge', en: 'red', type: 'adj.', chapter: 2, mastery: 85 },
  { fr: 'bleu', en: 'blue', type: 'adj.', chapter: 2, mastery: 80 },
  { fr: 'grand', en: 'big / tall', type: 'adj.', chapter: 2, mastery: 70 },
  { fr: 'le pain', en: 'bread', type: 'n. m.', chapter: 3, mastery: 60 },
  { fr: 'le fromage', en: 'cheese', type: 'n. m.', chapter: 3, mastery: 55 },
  { fr: 'le vin', en: 'wine', type: 'n. m.', chapter: 3, mastery: 50 },
  { fr: 'l\'eau', en: 'water', type: 'n. f.', chapter: 3, mastery: 45 },
  { fr: 'délicieux', en: 'delicious', type: 'adj.', chapter: 3, mastery: 30 },
  { fr: 'l\'addition', en: 'the bill', type: 'n. f.', chapter: 3, mastery: 20 },
  { fr: 'la carte', en: 'menu / map', type: 'n. f.', chapter: 3, mastery: 40 },
]

const TYPES = ['All', 'n. m.', 'n. f.', 'adj.', 'excl.', 'num.']

function masteryColor(m: number) {
  if (m >= 80) return '#2EC4B6'
  if (m >= 50) return '#FFD60A'
  return '#E84855'
}

export default function Vocabulary() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'alpha' | 'mastery' | 'chapter'>('chapter')

  const filtered = WORDS
    .filter(w => filter === 'All' || w.type === filter)
    .filter(w =>
      w.fr.toLowerCase().includes(search.toLowerCase()) ||
      w.en.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'alpha') return a.fr.localeCompare(b.fr)
      if (sort === 'mastery') return a.mastery - b.mastery
      return a.chapter - b.chapter
    })

  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '10px',
          color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px',
        }}>FRENCH A2</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '24px', margin: 0 }}>
            Vocabulary
          </h2>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '11px',
            color: '#2EC4B6',
          }}>{WORDS.length} words</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search words..."
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1.5px solid #D6D3CA',
            padding: '10px 14px 10px 36px',
            fontFamily: '"Archivo", sans-serif',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#E84855')}
          onBlur={e => (e.currentTarget.style.borderColor = '#D6D3CA')}
        />
        <span style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          color: '#6B6860', fontSize: '14px', pointerEvents: 'none',
        }}>⌕</span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {TYPES.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              background: filter === t ? '#16161A' : 'transparent',
              color: filter === t ? '#FFD60A' : '#6B6860',
              border: `1px solid ${filter === t ? '#16161A' : '#D6D3CA'}`,
              padding: '4px 10px',
              fontFamily: '"DM Mono", monospace',
              fontSize: '9px', letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Sort */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.08em' }}>
          SORT:
        </span>
        {(['chapter', 'alpha', 'mastery'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSort(s)}
            style={{
              background: sort === s ? '#E84855' : 'transparent',
              color: sort === s ? '#FFFFFF' : '#6B6860',
              border: `1px solid ${sort === s ? '#E84855' : '#D6D3CA'}`,
              padding: '3px 9px',
              fontFamily: '"DM Mono", monospace',
              fontSize: '9px', letterSpacing: '0.06em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >{s}</button>
        ))}
      </div>

      {/* Word list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filtered.map(word => (
          <div key={word.fr} style={{
            background: '#FFFFFF',
            border: '1.5px solid #D6D3CA',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: 6, height: 6, flexShrink: 0,
              background: masteryColor(word.mastery),
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: '15px', color: '#16161A',
                }}>{word.fr}</span>
                <span style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '8px', color: '#6B6860',
                  background: '#F0EDE4', padding: '1px 5px',
                }}>{word.type}</span>
              </div>
              <div style={{
                fontFamily: '"Archivo", sans-serif',
                fontSize: '12px', color: '#6B6860',
                marginTop: '1px',
              }}>{word.en}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: '13px',
                color: masteryColor(word.mastery),
              }}>{word.mastery}%</div>
              <div style={{
                width: 40, height: 3,
                background: '#F0EDE4',
                marginTop: '3px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0,
                  width: `${word.mastery}%`, height: '100%',
                  background: masteryColor(word.mastery),
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          fontFamily: '"Archivo", sans-serif', color: '#6B6860',
        }}>No words match your search.</div>
      )}
    </div>
  )
}
