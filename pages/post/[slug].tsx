import Header from '../../Components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from "react-hook-form";

interface InputForm {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface Props {
    post: Post
}

const Post = ({ post }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm < InputForm > ()

    const onSubmit: SubmitHandler<InputForm> = async (data) => {
        await fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    return (
        <main>
            <Header />
            <img src={urlFor(post.mainImage).url()!} alt={post.title} className='h-[300px] w-full object-cover' />

            <article className='max-w-3xl mx-auto'>
                <h1 className='text-3xl mt-10 mb-3 px-2 md:px-0 capitalize'>{post.title}</h1>
                <h2 className='text-xl font-light px-2 md:px-0 text-gray-500 mb-2'>{post.description}</h2>

                <div className="flex space-x-2 px-2 md:px-0 items-center">
                    <img src={urlFor(post.author.image).url()!} alt={post.author.name} className='h-10 w-10 rounded-full' />
                    <p className='font-extralight text-sm'>
                        Blog post by <span className='font-semibold'> {post.author.name} </span>- Published at {new Date(post._createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-10">
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={{
                            h1: (props: any) => (
                                <h1 className='text-2xl font-bold my-5' {...props} />
                            ),
                            h2: (props: any) => (
                                <h2 className='text-xl font-bold my-5' {...props} />
                            ),
                            li: ({ children }: any) => (
                                <li className='ml-4 list-disc'> {...children} </li>
                            ),
                            link: ({ children, href }: any) => (
                                <a href={href} className='font-semibold hover:underline'> {...children} </a>
                            ),
                        }}
                    />
                </div>
            </article>

            <hr className='max-w-lg my-5 mx-auto border border-blue-300' />

            <form className='flex flex-col max-w-2xl mx-auto p-5 my-8' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='text-sm text-blue-700'>Enjoyed the article?</h3>
                <h4 className='text-3xl font-bold mb-5'>Leave a comment below</h4>

                <input type="hidden" {...register('_id')} name='_id' value={post._id} />

                <label className='block mb-5'>
                    <span>Name</span>
                    <input {...register('name', { required: true })} className='shadow-sm block w-full outline-none form-input rounded py-2 px-4' type="text" placeholder='Name' />
                </label>
                <label className='block mb-5'>
                    <span>Email</span>
                    <input {...register('email', { required: true })} className='shadow-sm block w-full outline-none form-input rounded py-2 px-4' type="email" placeholder='E-mail' />
                </label>
                <label className='block mb-5'>
                    <span>Comment</span>
                    <textarea {...register('comment', { required: true })} className='shadow-sm outline-none border rounded py-2 px-4 form-textarea mt-2 block w-full' rows={8} placeholder='Comment' />
                </label>


                <div className="flex flex-col p-5">
                    {errors.name && (
                        <span className='text-red-500'>The name field is required</span>
                    )}
                    {errors.comment && (
                        <span className='text-red-500'>The comment field is required</span>
                    )}
                    {errors.email && (
                        <span className='text-red-500'>The email field is required</span>
                    )}
                </div>

                <input onSubmit={handleSubmit(onSubmit)} type="submit" className='cursor-pointer text-blue-700 border border-blue-900 px-4 py-1 rounded-sm font-bold hover:bg-blue-900 hover:text-white' />
            </form>
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
