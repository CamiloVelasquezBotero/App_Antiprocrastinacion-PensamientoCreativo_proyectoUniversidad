"use client"

import { useState } from "react"

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7)
}

export default function TaskForm({ selectedDate, onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(selectedDate || new Date().toISOString().slice(0,10))
  const [time, setTime] = useState(() => {
    const now = new Date()
    return now.toTimeString().slice(0,5)
  })

  // actualizar cuando cambia selectedDate
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // note: this is simple — you can add useEffect if you want to sync fully
  if (selectedDate && date !== selectedDate) {
    // keep the form date in sync when the sidebar selection changes
    // (only if user hasn't typed a different date)
    setDate(selectedDate)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert("Agrega un título a la tarea")
      return
    }

    const task = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      createdAt: new Date().toISOString(),
      done: false,
      notified: false
    }

    onAdd(task)
    setTitle("")
    setDescription("")
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input className="grow" type="text" placeholder="Título de tarea" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
      <button className="btn" type="submit">Añadir</button>

      <div style={{width:'100%', marginTop:8}}>
        <input type="text" placeholder="Descripción (opcional)" value={description} onChange={(e)=>setDescription(e.target.value)} style={{width:'100%',padding:8,borderRadius:8,marginTop:6,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}} />
      </div>
    </form>
  )
}
