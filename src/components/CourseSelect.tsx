import { COURSES, type Course } from '../data/courses'

export default function CourseSelect({
  activeCourseId,
  onSelect,
}: {
  activeCourseId: string
  onSelect: (id: string) => void
}) {
  const enrolled = COURSES.filter(c => c.enrolled)
  const available = COURSES.filter(c => !c.enrolled)

  function Card({ course, active }: { course: Course; active: boolean }) {
    return (
      <button
        onClick={() => course.enrolled && onSelect(course.id)}
        disabled={!course.enrolled}
        style={{
          background: active ? '#16161A' : '#FFFFFF',
          border: `2px solid ${active ? course.color : '#D6D3CA'}`,
          padding: '16px',
          textAlign: 'left',
          cursor: course.enrolled ? 'pointer' : 'default',
          opacity: course.enrolled ? 1 : 0.55,
          transition: 'transform 0.1s',
          width: '100%',
        }}
        onMouseEnter={e => course.enrolled && (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{
            width: 44, height: 44, fontSize: '24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: active ? 'rgba(255,255,255,0.08)' : '#F0EDE4',
            flexShrink: 0,
            borderRadius: '50%',
          }}>{course.flag}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: '16px',
                color: active ? '#FAF8F2' : '#16161A',
              }}>{course.name}</span>
              <span style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '9px',
                background: course.color,
                color: course.color === '#FFD60A' ? '#16161A' : '#FFFFFF',
                padding: '2px 6px',
                letterSpacing: '0.06em',
              }}>{course.level}</span>
              {active && (
                <span style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '8px',
                  color: course.color,
                  letterSpacing: '0.06em',
                }}>● ACTIVE</span>
              )}
            </div>

            {course.enrolled ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: active ? '#aaa' : '#6B6860' }}>
                    {course.lessonsCompleted} lessons · {course.wordsLearned} words
                  </span>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: course.color }}>
                    {course.progress}%
                  </span>
                </div>
                <div style={{ background: active ? 'rgba(255,255,255,0.15)' : '#F0EDE4', height: 4 }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, transition: 'width 0.4s' }} />
                </div>
              </div>
            ) : (
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.06em' }}>
                NOT ENROLLED — COMING SOON
              </div>
            )}
          </div>
        </div>
      </button>
    )
  }

  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '10px',
          color: '#6B6860', letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '6px',
        }}>LingoLoop</div>
        <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', margin: 0, lineHeight: 1.1 }}>
          My Courses
        </h2>
      </div>

      {/* Enrolled */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: '10px', color: '#6B6860',
        }}>Enrolled ({enrolled.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {enrolled.map(c => (
            <Card key={c.id} course={c} active={c.id === activeCourseId} />
          ))}
        </div>
      </div>

      {/* Available */}
      <div>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: '10px', color: '#6B6860',
        }}>Explore Courses</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {available.map(c => (
            <Card key={c.id} course={c} active={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
