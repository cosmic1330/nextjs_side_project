import { connectToDatabase } from "../../../lib/db/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  try {
    db.listCollections().toArray(async (err, items) => {
      if (err) throw err;
      const ids = items.map((item) => item.name);
      res.json(ids);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
