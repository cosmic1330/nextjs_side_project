import { connectToDatabase } from '../../lib/db/mongodb'
import Head from 'next/head'
import Link from 'next/link'

export default function Home({ isConnected }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/" locale="en">
          <a>回英文首頁</a>
        </Link>
        <Link href="/" locale="en">
          <a>回中文首頁</a>
        </Link>
        <h1 className="title">
          Welcome to Next.js with MongoDB!
        </h1>
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
  </div>
    )}
export async function getServerSideProps(context) {
    const { client } = await connectToDatabase()
  
    const isConnected = await client.isConnected()
  
    return {
      props: { isConnected },
    }
}