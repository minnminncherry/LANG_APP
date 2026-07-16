import { ADMIN_STATS, WEEKLY_ACTIVITY, COURSE_BREAKDOWN } from './data'

const STAT_CARDS = [
  { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), sub: `+${ADMIN_STATS.newUsersThisWeek} this week`, color: '#2EC4B6' },
  { label: 'Active Today', value: ADMIN_STATS.activeToday.toString(), sub: `${Math.round((ADMIN_STATS.activeToday / ADMIN_STATS.totalUsers) * 100)}% of users`, color: '#E84855' },
  { label: 'Lessons Published', value: ADMIN_STATS.lessonsPublished.toString(), sub: 'Across 4 courses', color: '#FFD60A' },
  { label: 'Avg. Accuracy', value: `${ADMIN_STATS.avgAccuracy}%`, sub: 'All users, all courses', color: '#9B5DE5' },
  { label: 'Total XP Earned', value: ADMIN_STATS.totalXPEarned.toLocaleString(), sub: 'Cumulative', color: '#2EC4B6' },
  { label: 'New This Week', value: ADMIN_STATS.newUsersThisWeek.toString(), sub: 'New registrations', color: '#E84855' },
]

const MAX_SESSIONS = Math.max(...WEEKLY_ACTIVITY.map(d => d.sessions))

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px' }}>
          OVERVIEW
        </div>
        <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', margin: 0 }}>Dashboard</h2>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {STAT_CARDS.map(s => (
          <div key={s.label} style={{
            background: '#FFFFFF', border: '1.5px solid #E8E5DC',
            padding: '18px 20px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: -10, right: -4,
              fontFamily: '"Archivo Black", sans-serif', fontSize: '48px',
              color: s.color, opacity: 0.05, lineHeight: 1, pointerEvents: 'none',
            }}>{s.value}</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '28px', color: s.color, lineHeight: 1, marginBottom: '4px' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: '"Archivo", sans-serif', fontSize: '11px', color: '#6B6860' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>
        {/* Weekly activity chart */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8E5DC', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '3px' }}>
                WEEKLY ACTIVITY
              </div>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px' }}>Sessions per Day</div>
            </div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#2EC4B6' }}>
              Jul 8–14, 2026
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '120px' }}>
            {WEEKLY_ACTIVITY.map(d => {
              const h = (d.sessions / MAX_SESSIONS) * 100
              return (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>{d.sessions}</div>
                  <div style={{ width: '100%', background: '#2EC4B6', height: `${h}%`, minHeight: 4, transition: 'height 0.3s' }} />
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>{d.day}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Course breakdown */}
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8E5DC', padding: '20px' }}>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '3px' }}>
            ENROLLMENT
          </div>
          <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px', marginBottom: '20px' }}>By Course</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {COURSE_BREAKDOWN.map(c => {
              const pct = Math.round((c.users / ADMIN_STATS.totalUsers) * 100)
              return (
                <div key={c.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ fontSize: '14px' }}>{c.flag}</span>
                      <span style={{ fontFamily: '"Archivo", sans-serif', fontSize: '12px' }}>{c.name}</span>
                    </div>
                    <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: c.color }}>{c.users}</span>
                  </div>
                  <div style={{ background: '#F0EDE4', height: 5 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: c.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
