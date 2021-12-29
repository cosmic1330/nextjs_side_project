
export default function MysqlTest({data,data2}) {
  return (
    <div>
        <pre>{JSON.stringify(data,0,2)}</pre>
        <pre>{JSON.stringify(data2,0,2)}</pre>
    </div>
  )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/test/mysql`)
    const data = await res.json();
    const data2 = {test:'this is test'};
    return { props: {data,data2} }
}
