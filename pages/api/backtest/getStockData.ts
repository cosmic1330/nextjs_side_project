import { readFileSync } from "fs";
import path from "path";
import { connectToDatabase } from "../../../lib/db/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    if (!req.query?.id) {
      res.status(404).json("Not found id !");
    }
    let data = await db
      .collection(req.query.id)
      .find()
      .sort({ t: 1 })
      .toArray();
    res.json(data);
  } catch (error) {
    const filePath = path.join(
      process.cwd(),
      "public",
      "datas",
      "20210828.json"
    );
    let jsonData = readFileSync(filePath, "utf8");
    jsonData = JSON.parse(jsonData);
    res.json(jsonData[req.query.id]);
    // console.log(error);
    // res.status(500).json({ error });
  }
};
