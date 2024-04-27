var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import { getAll, getOne } from "./functions.js";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://www.viamobilidade.com.br/");
        const html = yield response.text();
        const linhas = getAll(html);
        res.status(200).json(linhas);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Ocorreu um erro ao processar a requisição" });
    }
}));
app.get("/linha/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield fetch("https://www.viamobilidade.com.br/");
        const html = yield response.text();
        const linha = getOne(html, id);
        res.status(200).send(linha);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Linha inexistente") {
                return res.status(404).json({ error: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ error: "Ocorreu um erro ao processar a requisição" });
            }
        }
        else {
            console.log(error);
            res
                .status(500)
                .json({ error: "Ocorreu um erro ao processar a requisição" });
        }
    }
}));
app.listen(port, () => console.log("listening on port " + port));
