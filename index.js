import * as cheerio from "cheerio";
import pretty from "pretty";

const run = async () => {
  const response = await fetch("https://www.viamobilidade.com.br/");
  const html = await response.text();

  let dados = [];

  const $ = cheerio.load(html);
  const listaLinhas = $("ol").find("li");

  for (let i = 0; i < listaLinhas.length; i++) {
    dados[i] = {
      id: $(listaLinhas[i]).find("span[title]").text(),
      titulo: $(listaLinhas[i]).find("span").attr("title"),
      status: $(listaLinhas[i]).find(".status").text(),
    };
  }

  let linhas = dados.map((linha) => {
    let titulo;

    if (linha.titulo.includes("-")) {
      let arr = linha.titulo.split("-");
      titulo = `Linha ${linha.id} - ${arr[1].trim()}`;
    } else {
      let maiusculo = linha.titulo.slice(0, 1);
      let minusculo = linha.titulo.slice(1).toLowerCase();
      titulo = `Linha ${linha.id} - ${maiusculo}${minusculo}`;
    }

    return {
      id: linha.id,
      titulo,
      status: linha.status,
    };
  });
};

run();
