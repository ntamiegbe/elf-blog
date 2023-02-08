import Header from '../../Components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
    post: Post
}

const Post = ({ post }: Props) => {
    return (
        <main>
            <Header />
            <img src={urlFor(post.mainImage).url()!} alt={post.title} className='h-[300px] w-full object-cover' />

            <article className='max-w-3xl mx-auto'>
                <h1 className='text-3xl mt-10 mb-3 capitalize'>{post.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>

                <div className="flex space-x-2 items-center">
                    <img src={urlFor(post.author.image).url()!} alt={post.author.name} className='h-10 w-10 rounded-full' />
                    <p className='font-extralight text-sm'>
                        Blog post by <span className='font-semibold'> {post.author.name} </span>- Published at {new Date(post._createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="">
                    <PortableText 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={}
                    /> 
                </div>
            </article>
        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    // Find the paths or pages that exists
    const query = `*[_type == 'post']{
        _id,
        slug {
            current
        }
    }`

    const posts = await sanityClient.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Populate the information for the page
    const query = `*[_type == 'post' && slug.current == 'first-blog-post'][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        slug,
        description,
        mainImage,
        body
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60
    }
}
