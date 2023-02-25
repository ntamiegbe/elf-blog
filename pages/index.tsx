import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Link from 'next/link'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="font-serif max-w-7xl mx-auto">
      <Head>
        <title>Veritas University Journal of Humanities | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Banner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 my-5">
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer border rounded-xl shadow overflow-hidden'>
              <img src={urlFor(post.mainImage).url()!} alt={post.title} className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'/>
              <div className="flex justify-between p-5 bg-white">
                <div className="">
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>
                <img src={urlFor(post.author.image).url()!} alt={post.author.name} className='h-12 w-12 rounded-full'/>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
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
