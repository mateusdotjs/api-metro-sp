import express from "express";
import { getAll } from "./functions.js";

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const data = getAll(html);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log("listening on port " + port));
