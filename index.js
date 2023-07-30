import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName;

app.use(bodyParser.urlencoded({ extended: true }));

// Pre-Proccessing Using custom Middleware!
function bandNameGenerate(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerate);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>You have submiteed</h1>
            <h2> Your Band Name is: ${bandName} 🔥`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
