"use client"
import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import CalendarSidebar from "../components/CalendarSidebar"
import { loadTasks, saveTasks } from "../utils/storage"
import { useRouter } from "next/navigation"

export default function Page() {
  const [tasks, setTasks] = useState([])
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0,10) // YYYY-MM-DD
  })
  const router = useRouter()

  // Guardar tareas cuando cambie Task
  useEffect(() => {
    if(tasks.length) {
      saveTasks(tasks)
    }
  }, [tasks])

  // cargar tasks al inicio
  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  // pedir permiso de notificaciones al cargar
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().catch(()=>{})
      }
    }
  }, [])

  // función para reproducir sonido (campanita)
  function playSound() {
    try {
      const audio = new Audio("/alert.mp3")
      audio.volume = 0.9
      audio.play().catch(()=>{})
    } catch (e) {
      // ignore
    }
  }

  // Añadir tarea
  function addTask(task) {
    setTasks(prev => [task, ...prev])
  }

  // alternar done
  function toggleDone(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  // eliminar tarea
  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // marcar como notificada (para evitar repetir)
  function markNotified(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, notified: true } : t))
  }

  // check de notificaciones: 20s intervalo
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("Notification" in window)) return

    const check = () => {
      const now = new Date()
      const isoDate = now.toISOString().slice(0,10) // YYYY-MM-DD
      const isoTime = now.toTimeString().slice(0,5) // HH:MM

      tasks.forEach(task => {
        if (!task.done && !task.notified && task.date === isoDate && task.time === isoTime) {
          // enviar notificación y reproducir sonido
          if (Notification.permission === "granted") {
            try {
              new Notification("¡Hora de tu tarea!", {
                body: `${task.title} — Es momento de cumplirla ⏰`,
                silent: false
              })

              navigator.serviceWorker.ready.then(reg => {
                reg.showNotification("¡Hora de tu tarea!", {
                  body: `${task.title} — Es momento de cumplirla ⏰`,
                  icon: "/icon-192.png",
                  vibrate: [200, 100, 200],
                });
              });
            } catch(e){ }
          }
          playSound()
          markNotified(task.id)      
          alert(`¡Hora de tu tarea`)
        }
      })
    }

    // chequeo inmediato al montar y luego intervalo
    check()
    const id = setInterval(check, 20000)
    return () => clearInterval(id)
  }, [tasks])

  // tareas para la fecha seleccionada
  const tasksForSelectedDate = tasks.filter(t => t.date === selectedDate).sort((a,b) => a.time.localeCompare(b.time))

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">CT</div>
          <div>
            <h1>CyberTasks</h1>
            <div className="small">App Antiprocrastinación - Pensamiento Creativo</div>
          </div>
        </div>

        <CalendarSidebar selectedDate={selectedDate} onSelectDate={setSelectedDate} tasks={tasks} />

        <div style={{marginTop:14}}>
          <div className="small">Tareas totales: <strong>{tasks.length}</strong></div>
        </div>

        <button 
          className='button-foro'
          onClick={() => router.push('/forum-comments')}
        >💬 Comenta en nuestro Foro</button>
      </aside>

      <main className="main-panel">
        <div className="header">
          <div>
            <h2>Administrador de Tareas - Pensamiento Creativo</h2>
            <div className="subtitle">Organiza por fecha y hora — Recibirás alertas cuando toque</div>
          </div>

          <div>
            <button className="btn" onClick={() => {
              // limpiar tarea notificadas opcional
              if (confirm("¿Eliminar todas las tareas completadas?")) {
                setTasks(prev => prev.filter(t => !t.done))
              }
            }}>Limpiar completadas</button>
          </div>
        </div>

        <TaskForm selectedDate={selectedDate} onAdd={addTask} />

        <section className="sectionTasks" style={{marginTop:12}}>
          <h3 style={{margin:'8px 0'}}>Tareas — {selectedDate}</h3>
          <div className="task-list">
            <TaskList tasks={tasksForSelectedDate} onToggle={toggleDone} onRemove={removeTask} />
          </div>
        </section>
      </main>
    </div>
  )
}
