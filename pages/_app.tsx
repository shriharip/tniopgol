import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
// pages/_app.js
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>)
}


export default MyApp;