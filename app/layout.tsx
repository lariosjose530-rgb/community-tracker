import '../styles/globals.css' // o el estilo que use tu proyecto

export const metadata = {
  title: 'Solo Leveling Habit Tracker',
  description: 'Rastreador de hábitos y comunidad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}