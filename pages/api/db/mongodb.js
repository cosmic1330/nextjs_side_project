import { connectToDatabase } from '../../../lib/db/mongodb'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    try {
        const movies = await db
            .collection("test")
            .find({name: "jeff"})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();
            res.json(movies);
    }catch ( error ) {
        console.log( error );
        res.status(403).json({ error })
    }
};