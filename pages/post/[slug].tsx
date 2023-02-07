import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'

interface Props {
    post: Post
}

const Post = ({ post }: Props) => {
    return (
        <div>Post</div>
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
        }
    }
}
