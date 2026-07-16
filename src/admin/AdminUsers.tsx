import { useState } from 'react'
import { ADMIN_USERS, type AdminUser } from './data'

function accuracyColor(n: number) {
  if (n >= 85) return '#2EC4B6'
  if (n >= 70) return '#FFD60A'
  return '#E84855'
}

export default function AdminUsers() {
  const [users] = useState<AdminUser[]>(ADMIN_USERS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = users
    .filter(u => filter === 'all' || u.status === filter)
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.activeCourse.toLowerCase().includes(search.toLowerCase())
    )

  const detail = selected ? users.find(u => u.id === selected) : null

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px' }}>MANAGEMENT</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', margin: 0 }}>Users</h2>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#2EC4B6' }}>
            {filtered.length} / {users.length} shown
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users…"
            style={{
              width: '100%', background: '#FFFFFF', border: '1.5px solid #D6D3CA',
              padding: '9px 12px 9px 34px', fontFamily: '"Archivo", sans-serif', fontSize: '13px',
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#2EC4B6')}
            onBlur={e => (e.currentTarget.style.borderColor = '#D6D3CA')}
          />
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6B6860', pointerEvents: 'none' }}>⌕</span>
        </div>
        {(['all', 'active', 'inactive'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? '#16161A' : 'transparent',
            color: filter === f ? '#FFD60A' : '#6B6860',
            border: `1px solid ${filter === f ? '#16161A' : '#D6D3CA'}`,
            padding: '8px 16px', fontFamily: '"DM Mono", monospace',
            fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: detail ? '1fr 300px' : '1fr', gap: '16px' }}>
        {/* Table */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8E5DC', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 80px 70px 70px 70px',
            background: '#16161A', padding: '10px 16px', gap: '8px',
          }}>
            {['Name / Email', 'Course', 'XP', 'Lessons', 'Accuracy', 'Status'].map(h => (
              <div key={h} style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#FFD60A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>

          {filtered.map((user, i) => (
            <button
              key={user.id}
              onClick={() => setSelected(selected === user.id ? null : user.id)}
              style={{
                display: 'grid', gridTemplateColumns: '2fr 1.5fr 80px 70px 70px 70px',
                padding: '12px 16px', gap: '8px', width: '100%', textAlign: 'left',
                background: selected === user.id ? '#F0EDE4' : i % 2 === 0 ? '#FAFAF8' : '#FFFFFF',
                border: 'none', borderBottom: '1px solid #F0EDE4', cursor: 'pointer',
                borderLeft: selected === user.id ? '3px solid #2EC4B6' : '3px solid transparent',
              }}
            >
              <div>
                <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', marginBottom: '1px' }}>{user.name}</div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>{user.email}</div>
              </div>
              <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '12px', color: '#16161A', alignSelf: 'center' }}>{user.activeCourse}</div>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', color: '#2EC4B6', alignSelf: 'center' }}>{user.totalXP.toLocaleString()}</div>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', color: '#16161A', alignSelf: 'center' }}>{user.lessonsCompleted}</div>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '13px', color: accuracyColor(user.accuracy), alignSelf: 'center' }}>{user.accuracy}%</div>
              <div style={{ alignSelf: 'center' }}>
                <span style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '8px', letterSpacing: '0.08em',
                  padding: '3px 7px',
                  background: user.status === 'active' ? 'rgba(46,196,182,0.12)' : 'rgba(107,104,96,0.12)',
                  color: user.status === 'active' ? '#2EC4B6' : '#6B6860',
                  border: `1px solid ${user.status === 'active' ? '#2EC4B6' : '#D6D3CA'}`,
                  borderRadius: '10px',
                }}>{user.status.toUpperCase()}</span>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', fontFamily: '"Archivo", sans-serif', color: '#6B6860' }}>
              No users match your search.
            </div>
          )}
        </div>

        {/* Detail panel */}
        {detail && (
          <div style={{ background: '#FFFFFF', border: '1.5px solid #2EC4B6', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px' }}>{detail.name}</div>
              <button onClick={() => setSelected(null)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#6B6860',
              }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Email', value: detail.email },
                { label: 'Joined', value: detail.joinedAt },
                { label: 'Active Course', value: detail.activeCourse },
                { label: 'Streak', value: `${detail.streak} days` },
              ].map(row => (
                <div key={row.label} style={{ borderBottom: '1px solid #F0EDE4', paddingBottom: '10px' }}>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.08em', marginBottom: '3px' }}>{row.label.toUpperCase()}</div>
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '13px' }}>{row.value}</div>
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '4px' }}>
                {[
                  { label: 'XP', value: detail.totalXP.toLocaleString(), color: '#2EC4B6' },
                  { label: 'Lessons', value: String(detail.lessonsCompleted), color: '#16161A' },
                  { label: 'Accuracy', value: `${detail.accuracy}%`, color: accuracyColor(detail.accuracy) },
                ].map(s => (
                  <div key={s.label} style={{ background: '#F0EDE4', padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '18px', color: s.color }}>{s.value}</div>
                    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '8px', color: '#6B6860', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button style={{
                  flex: 1, background: '#E84855', color: '#FFFFFF', border: 'none',
                  padding: '10px', fontFamily: '"Archivo Black", sans-serif',
                  fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
                }}>SUSPEND</button>
                <button style={{
                  flex: 1, background: 'transparent', border: '1px solid #D6D3CA',
                  color: '#6B6860', padding: '10px', fontFamily: '"Archivo Black", sans-serif',
                  fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
                }}>RESET XP</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
