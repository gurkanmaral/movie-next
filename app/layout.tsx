import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/lib/AuthProvider'
import QueryProvider from "@/components/QueryProvider";
import { QueryClient, QueryClientProvider } from 'react-query';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MovieApp',
  description: 'Movie-app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}  >
      <QueryProvider>
          <AuthProvider>
          <Navbar />
          <main className='w-[100vw] m-auto  '>
          {children}
          </main>  
          <Footer />
          </AuthProvider>   
        </QueryProvider>
      </body>
    </html>
  )
}
