import { connectToDatabase } from "../../../lib/db/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  try {
    if (!req.query?.id) {
      res.status(404).json('Not found id !');
    }
    let data = await db
      .collection(req.query.id)
      .find()
      .sort({ t: 1 })
      .toArray();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
