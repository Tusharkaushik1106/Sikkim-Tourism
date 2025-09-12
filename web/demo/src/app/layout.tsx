import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Monastery360 | Digital Heritage Platform',
  description: 'Explore Sikkim\'s monasteries through immersive digital experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          {children}
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
