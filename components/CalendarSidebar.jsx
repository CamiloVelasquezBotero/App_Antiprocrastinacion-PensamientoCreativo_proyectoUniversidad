"use client"

export default function CalendarSidebar({ selectedDate, onSelectDate, tasks = [] }) {
  // crear un conteo simple de tareas por fecha
  const counts = tasks.reduce((acc, t) => {
    acc[t.date] = (acc[t.date] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <label className="small">Busca Tus Tareas Por Fecha 🔎</label>
      <input className="calendar-input" type="date" value={selectedDate} onChange={(e) => onSelectDate(e.target.value)} />

      <div style={{marginTop:12}}>
        <div className="small">Resumen rápido</div>
        <ul style={{listStyle:'none', padding:0, marginTop:8}}>
          <li style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}>
            <span>Hoy</span>
            <span className="badge">{counts[new Date().toISOString().slice(0,10)] || 0}</span>
          </li>
          <li style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}>
            <span>Seleccionada</span>
            <span className="badge">{counts[selectedDate] || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
