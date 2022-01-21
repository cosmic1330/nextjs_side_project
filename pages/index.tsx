import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <button onClick={() => router.push('/todolist')}>
          ToDoList
        </button>
        <button onClick={() => router.push('/backtest')}>
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
        <button onClick={() => router.push('/chartjs')}>
          Chart測試
        </button>
      </main>
    </div>
  )
}
