import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../Components/Header'

const Home: NextPage = () => {
  return (
    <div className="font-serif max-w-7xl mx-auto">
      <Head>
        <title>Egbe Literacy Foundation | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

    </div>
  )
}

export default Home
