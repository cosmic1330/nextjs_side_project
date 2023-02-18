import Head from 'next/head'
import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => router.push('/tomato_clock')}>
          番茄鐘
        </Button>
        <Button variant="contained" onClick={() => router.push('/backtest')}>
          回測系統
        </Button>
        <Button variant="contained" onClick={() => router.push('/selectstock')}>
          選股
        </Button>
        <Button variant="contained" onClick={() => router.push('/line')}>
          Line
        </Button>
        {/* <Button variant="contained" onClick={() => router.push('/db/mysqlTest')}>
          DB-mysqlTest
        </Button>
        <Button variant="contained" onClick={() => router.push('/db/mongodbTest')}>
          DB-mongodbTest
        </Button>
        <Button variant="contained" onClick={() => router.push('/i18n')}>
          i18n測試
        </Button>
        <Button variant="contained" onClick={() => router.push('/chartjs')}>
          Chart測試
        </Button>  */}
      </Stack>
      </main>
    </div>
  )
}
