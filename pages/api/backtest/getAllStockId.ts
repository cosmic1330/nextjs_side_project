import { readFileSync } from 'fs';
import path from 'path';
import { connectToDatabase } from "../../../lib/db/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    db.listCollections().toArray(async (err, items) => {
      if (err) throw err;
      const ids = items.map((item) => item.name);
      res.json(ids);
    });
  } catch (error) {
    const filePath = path.join(process.cwd(), 'public','datas' ,'20210828.json');
    const jsonData = readFileSync(filePath, 'utf8');
    const ids = Object.keys(JSON.parse(jsonData));
    res.json(ids);
    // console.log(error);
    // res.status(500).json({ error });
  }
};
