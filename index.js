import express from "express";
import { getAll, getOne } from "./functions.js";
import {} from 'dotenv/config'

const app = express();
const port = process.env.PORT;

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linhas = getAll(html);
    res.status(200).send(linhas);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/linha/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linhas = getAll(html);
    const linha = getOne(linhas, id);
    res.status(200).send(linha);
  } catch (error) {
    if (error.message == "Linha inexistente") {
      res.status(404).send({ error: error.message });
    } else {
      res.status(500).send(error);
    }
  }
});

app.listen(port, () => console.log("listening on port " + port));
