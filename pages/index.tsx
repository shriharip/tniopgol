import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import Profile from './profile'


const Home: NextPage = () => {
  const { data: session } = useSession();
  return !session ?
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">
              Hello there, Welcome to LogPointJS.
            </h1>
            <h3 className="mb-5 text-2xl">
              Empowering security analysts to succeed.
            </h3>
            <p>
              Our solution detects, analyzes and responds to threats within your data for faster security investigations. LogPoint helps you prioritize incidents so you can focus on what’s important and get situational awareness.
            </p>
            <button onClick={() => signIn()} className="btn btn-primary mt-10">Get Started</button>
          </div>
        </div>
      </div>
    </>
    :
    <div className="container mx-auto">
      <Profile />
    </div>

}

export default Home
