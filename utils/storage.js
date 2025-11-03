"use client"
export function loadTasks() {
  try {
    if (typeof window === "undefined") return []
    const tasks = localStorage.getItem("tasks")
    if (!tasks) return []
    return JSON.parse(tasks)
  } catch (e) {
    console.error("Error loading tasks", e)
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } catch (e) {
    console.error("Error saving tasks", e)
  }
}
