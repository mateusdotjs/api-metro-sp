import * as cheerio from "cheerio";
import { Dado } from "./types";

export function getAll(html: string) {
  let dados: Dado[] | [] = [];

  const $ = cheerio.load(html);
  const listaLinhas = $("ol").find("li");

  for (let i = 0; i < listaLinhas.length; i++) {
    const id = $(listaLinhas[i]).find("span[title]").text();
    const titulo = $(listaLinhas[i]).find("span").attr("title");
    const status = $(listaLinhas[i]).find(".status").text();

    if (!id || !titulo) {
      throw new Error("Erro ao recuperar status.");
    }

    dados[i] = {
      id,
      titulo,
      status,
    };
  }

  const linhas = formatAll(dados);
  return linhas;
}

export function getOne(html: string, idReq: string) {
  let dado: Dado | null = null;

  const $ = cheerio.load(html);
  const listaLinhas = $("ol").find("li");

  for (let i = 0; i < listaLinhas.length; i++) {
    const id = $(listaLinhas[i]).find("span[title]").text();
    const titulo = $(listaLinhas[i]).find("span").attr("title");
    const status = $(listaLinhas[i]).find(".status").text();

    if (!id || !titulo) {
      throw new Error("Erro ao recuperar status.");
    }

    if (id === idReq) {
      dado = {
        id,
        titulo,
        status,
      };

      break;
    }
  }

  if (dado === null) throw new Error("Linha inexistente");

  const linha = formatOne(dado);
  return linha;
}

function formatAll(dados: Dado[]) {
  let linhas = dados.map((linha) => {
    let titulo;

    if (linha.titulo.includes("-")) {
      let arr = linha.titulo.split("-");
      titulo = `${arr[1].trim()}`;
    } else {
      let maiusculo = linha.titulo.slice(0, 1);
      let minusculo = linha.titulo.slice(1).toLowerCase();
      titulo = `${maiusculo}${minusculo}`;
    }

    let status =
      linha.status === "Circulação de Trens"
        ? "Velocidade reduzida"
        : linha.status;

    return {
      id: linha.id,
      titulo,
      status,
    };
  });

  return linhas;
}

function formatOne(dado: Dado) {
  let titulo: string;

  if (dado.titulo.includes("-")) {
    let arr = dado.titulo.split("-");
    titulo = `${arr[1].trim()}`;
  } else {
    let maiusculo = dado.titulo.slice(0, 1);
    let minusculo = dado.titulo.slice(1).toLowerCase();
    titulo = `${maiusculo}${minusculo}`;
  }

  let status =
    dado.status === "Circulação de Trens" ? "Velocidade reduzida" : dado.status;

  return {
    id: dado.id,
    titulo,
    status,
  };
}
