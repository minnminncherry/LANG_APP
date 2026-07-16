import { useState } from 'react'
import { COURSES, type Course, type Lesson } from '../data/courses'

type Mode = 'list' | 'lessons'

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(COURSES)
  const [mode, setMode] = useState<Mode>('list')
  const [activeCourse, setActiveCourse] = useState<Course | null>(null)
  const [, setEditLesson] = useState<Lesson | null>(null)
  const [showNewLesson, setShowNewLesson] = useState(false)

  // New lesson form state
  const [newTitle, setNewTitle] = useState('')
  const [newChapter, setNewChapter] = useState('1')
  const [newXP, setNewXP] = useState('75')
  const [newItems, setNewItems] = useState('10')

  function openLessons(course: Course) {
    setActiveCourse(course)
    setMode('lessons')
  }

  function back() {
    setMode('list')
    setActiveCourse(null)
    setEditLesson(null)
    setShowNewLesson(false)
  }

  function addLesson() {
    if (!activeCourse || !newTitle.trim()) return
    const newLesson: Lesson = {
      id: Date.now(),
      chapter: parseInt(newChapter),
      title: newTitle.trim(),
      status: 'locked',
      xp: parseInt(newXP),
      items: parseInt(newItems),
      words: [],
    }
    const updated = courses.map(c =>
      c.id === activeCourse.id ? { ...c, lessons: [...c.lessons, newLesson] } : c
    )
    setCourses(updated)
    setActiveCourse(updated.find(c => c.id === activeCourse.id) ?? activeCourse)
    setNewTitle(''); setNewChapter('1'); setNewXP('75'); setNewItems('10')
    setShowNewLesson(false)
  }

  function removeLesson(lessonId: number) {
    if (!activeCourse) return
    const updated = courses.map(c =>
      c.id === activeCourse.id ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) } : c
    )
    setCourses(updated)
    setActiveCourse(updated.find(c => c.id === activeCourse.id) ?? activeCourse)
  }

  function toggleStatus(lesson: Lesson) {
    if (!activeCourse) return
    const cycle: Record<string, Lesson['status']> = { locked: 'active', active: 'done', done: 'locked' }
    const updated = courses.map(c =>
      c.id === activeCourse.id
        ? { ...c, lessons: c.lessons.map(l => l.id === lesson.id ? { ...l, status: cycle[l.status] } : l) }
        : c
    )
    setCourses(updated)
    setActiveCourse(updated.find(c => c.id === activeCourse.id) ?? activeCourse)
  }

  const STATUS_COLOR: Record<string, string> = { done: '#2EC4B6', active: '#E84855', locked: '#D6D3CA' }

  if (mode === 'lessons' && activeCourse) {
    const chapters = [...new Set(activeCourse.lessons.map(l => l.chapter))].sort()

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <button onClick={back} style={{
            background: 'transparent', border: '1px solid #D6D3CA', padding: '7px 14px',
            fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860',
            letterSpacing: '0.06em', cursor: 'pointer',
          }}>← BACK</button>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em' }}>COURSE EDITOR</div>
            <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '22px', margin: 0 }}>
              {activeCourse.flag} {activeCourse.name} — {activeCourse.level}
            </h2>
          </div>
          <button onClick={() => setShowNewLesson(true)} style={{
            marginLeft: 'auto', background: '#E84855', color: '#FFFFFF', border: 'none',
            padding: '9px 18px', fontFamily: '"Archivo Black", sans-serif',
            fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
          }}>+ ADD LESSON</button>
        </div>

        {/* New lesson form */}
        {showNewLesson && (
          <div style={{
            background: '#FFFFFF', border: '2px solid #2EC4B6', padding: '20px',
            marginBottom: '20px',
          }}>
            <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', marginBottom: '14px', color: '#2EC4B6' }}>
              NEW LESSON
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              {[
                { label: 'Title', value: newTitle, set: setNewTitle, placeholder: 'Lesson title…' },
                { label: 'Chapter', value: newChapter, set: setNewChapter, placeholder: '1' },
                { label: 'XP', value: newXP, set: setNewXP, placeholder: '75' },
                { label: 'Items', value: newItems, set: setNewItems, placeholder: '10' },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {f.label.toUpperCase()}
                  </div>
                  <input
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', border: '1px solid #D6D3CA', padding: '8px 10px',
                      fontFamily: '"Archivo", sans-serif', fontSize: '13px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={addLesson} style={{
                background: '#2EC4B6', color: '#FFFFFF', border: 'none',
                padding: '9px 20px', fontFamily: '"Archivo Black", sans-serif',
                fontSize: '11px', letterSpacing: '0.06em', cursor: 'pointer',
              }}>SAVE LESSON</button>
              <button onClick={() => setShowNewLesson(false)} style={{
                background: 'transparent', border: '1px solid #D6D3CA', color: '#6B6860',
                padding: '9px 16px', fontFamily: '"DM Mono", monospace',
                fontSize: '10px', cursor: 'pointer',
              }}>CANCEL</button>
            </div>
          </div>
        )}

        {chapters.map(ch => (
          <div key={ch} style={{ marginBottom: '24px' }}>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif', fontSize: '12px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#6B6860', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: 22, height: 22, background: '#16161A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD60A', fontSize: '10px' }}>{ch}</div>
              Chapter {ch}
              <div style={{ flex: 1, height: 1, background: '#E8E5DC' }} />
            </div>
            {activeCourse.lessons.filter(l => l.chapter === ch).map(lesson => (
              <div key={lesson.id} style={{
                background: '#FFFFFF', border: '1.5px solid #E8E5DC',
                padding: '12px 16px', marginBottom: '6px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ width: 8, height: 8, background: STATUS_COLOR[lesson.status], flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '14px', marginBottom: '2px' }}>{lesson.title}</div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#6B6860' }}>
                    {lesson.items} items · +{lesson.xp} XP
                  </div>
                </div>
                <button onClick={() => toggleStatus(lesson)} style={{
                  background: `${STATUS_COLOR[lesson.status]}18`,
                  border: `1px solid ${STATUS_COLOR[lesson.status]}`,
                  color: STATUS_COLOR[lesson.status],
                  padding: '4px 10px', cursor: 'pointer',
                  fontFamily: '"DM Mono", monospace', fontSize: '8px', letterSpacing: '0.08em',
                }}>{lesson.status.toUpperCase()}</button>
                <button onClick={() => removeLesson(lesson.id)} style={{
                  background: 'transparent', border: '1px solid #E84855', color: '#E84855',
                  width: 28, height: 28, cursor: 'pointer', fontSize: '12px',
                }}>✕</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#6B6860', letterSpacing: '0.1em', marginBottom: '4px' }}>MANAGEMENT</div>
        <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '26px', margin: 0 }}>Courses</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ background: '#FFFFFF', border: `1.5px solid ${course.color}`, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>{course.flag}</span>
                <div>
                  <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '16px' }}>{course.name}</div>
                  <span style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '9px',
                    background: course.color, color: course.color === '#FFD60A' ? '#16161A' : '#FFFFFF',
                    padding: '2px 7px', letterSpacing: '0.06em',
                  }}>{course.level}</span>
                </div>
              </div>
              <span style={{
                fontFamily: '"DM Mono", monospace', fontSize: '8px',
                color: course.enrolled ? '#2EC4B6' : '#6B6860',
                border: `1px solid ${course.enrolled ? '#2EC4B6' : '#D6D3CA'}`,
                padding: '3px 8px', borderRadius: '10px',
              }}>{course.enrolled ? 'LIVE' : 'DRAFT'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Lessons', value: course.lessons.length },
                { label: 'Cards', value: course.flashcards.length },
                { label: 'Questions', value: course.oldQuestions.length },
              ].map(s => (
                <div key={s.label} style={{ background: '#F0EDE4', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '18px', color: course.color }}>{s.value}</div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '8px', color: '#6B6860' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={() => openLessons(course)} style={{
              width: '100%', background: course.color,
              color: course.color === '#FFD60A' ? '#16161A' : '#FFFFFF',
              border: 'none', padding: '10px',
              fontFamily: '"Archivo Black", sans-serif', fontSize: '11px',
              letterSpacing: '0.06em', cursor: 'pointer',
            }}>MANAGE LESSONS →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
