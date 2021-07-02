const exec = require("child_process").exec;
const path = require("path");
export default async (req, res) => {
  await exec(
    "python index.py",
    { cwd: path.join("python") },
    (error, result, resp) => {
      if (error) {
        res.status(403).send(error);
      }
      res.status(200).send(result);
    }
  );
};
