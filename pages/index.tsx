import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import {sanityClient, urlFor} from '../sanity'

interface Props {
  posts: [Post]
}

const Home: NextPage = (props: Props) => {
  return (
    <div className="font-serif max-w-7xl mx-auto">
      <Head>
        <title>Egbe Literacy Foundation | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Banner />
      
    </div>
  )
}

export default Home

export const getServerSideProps = async() => {
  const query = `*[_type == 'post']{
  _id,
    title,
    author -> {
      name,
      image
    },
    slug,
    description, 
    mainImage
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}
