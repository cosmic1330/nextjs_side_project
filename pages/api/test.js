// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { checkDate } from "../../utils/stock/date";
export default (req, res) => {
  checkDate();
  res.status(200).json({ name: "John Doe" });
};
