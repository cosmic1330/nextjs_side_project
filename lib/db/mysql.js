import mysql from 'serverless-mysql';
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    },
  })
  
  exports.query = async ({ query, values }) => {
    try {
      const results = await db.query(query, values);
      await db.end()
      return results
    } catch (error) {
      return { error }
    }
}
export default db;