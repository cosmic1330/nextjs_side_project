
export default function Stock({data}){
    return <pre>{JSON.stringify(data,0,2)}</pre>
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/stock/takePrice?code=2330`)
    const data = await res.json();
    return { props: {data} }
}