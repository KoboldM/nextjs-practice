import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header/header'
import Footer from './components/Footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KoboldM Anime Fetcher',
  description: 'Practicing NextJS with GraphQL',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <Header/>
            {children}
            <Footer/>
        </body>
    </html>
  )
}
