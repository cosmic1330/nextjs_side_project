import mysql from '../../../lib/db/mysql';

module.exports = async (req, res) => {
    try {
        const data = await mysql.query(`
          SELECT *
          FROM test
          WHERE datetime = '2021-02-01 21:38:48'
        `)
        res.status(200).json({ data })
    }catch ( error ) {
        console.log( error );
        res.status(403).json({ error })
    }

}