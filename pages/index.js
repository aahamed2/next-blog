import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../comps/Layout'
import { getSortedPostsData } from '../lib/posts'
import Date from '../comps/date'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({ allPostsData }) {


  return (
    <Layout>

      <Head>
        <title>Homepage</title>
      </Head>

      <Image src='/images/luf.jpeg'
        width={200}
        height={144} />

      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2 >Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

    </Layout>


  )
}
