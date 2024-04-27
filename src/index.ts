import express from "express";
import cors from "cors";
import { getAll, getOne } from "./functions.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linhas = getAll(html);
    res.status(200).json(linhas);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao processar a requisição" });
  }
});

app.get("/linha/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linha = getOne(html, id);
    res.status(200).send(linha);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Linha inexistente") {
        return res.status(404).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Ocorreu um erro ao processar a requisição" });
      }
    } else {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao processar a requisição" });
    }
  }
});

app.listen(port, () => console.log("listening on port " + port));
