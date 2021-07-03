import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Home page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <button onClick={() => router.push('/todolist')}>
          ToDoList
        </button>
        <button onClick={() => router.push('/stock')}>
          回測系統
        </button>
        <button onClick={() => router.push('/selectstock')}>
          選股
        </button>
        <button onClick={() => router.push('/db/mysqlTest')}>
          DB-mysqlTest
        </button>
        <button onClick={() => router.push('/db/mongodbTest')}>
          DB-mongodbTest
        </button>
        <button onClick={() => router.push('/i18n')}>
          i18n測試
        </button>
      </main>
    </div>
  )
}
