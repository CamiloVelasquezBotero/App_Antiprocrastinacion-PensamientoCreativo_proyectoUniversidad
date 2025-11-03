"use client"

export default function TaskList({ tasks = [], onToggle, onRemove }) {
  if (!tasks || tasks.length === 0) {
    return <div className="small">No hay tareas para esta fecha.</div>
  }

  return (
    <>
      {tasks.map(task => (
        <article key={task.id} className={`task-card ${task.done ? 'done' : ''}`}>
          <div className="task-left">
            <div>
              <div className="title">{task.title}</div>
              {task.description && <div className="desc">{task.description}</div>}
              <div className="task-meta">Hora objetivo: <strong>{task.time}</strong> • Ingreso: <em style={{color:'var(--muted)'}}>{new Date(task.createdAt).toLocaleString()}</em></div>
            </div>
          </div>

          <div className="actions">
            <button className={`icon-btn ${task.done ? '' : 'primary'}`} onClick={() => onToggle(task.id)} title={task.done ? 'Marcar como pendiente' : 'Marcar como hecho'}>
              {task.done ? '↺' : '✓'}
            </button>

            <button className="icon-btn" onClick={() => {
              if (confirm("Eliminar tarea?")) onRemove(task.id)
            }} title="Eliminar">
              ✕
            </button>
          </div>
        </article>
      ))}
    </>
  )
}
