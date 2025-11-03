import './globals.css'

export const metadata = {
  title: 'Administrador de Tareas - Pensamiento Creativo',
  description: 'App anti-procrastinación — notificaciones y campanita',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
