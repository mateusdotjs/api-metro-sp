import * as cheerio from "cheerio";

export function getAll(html) {
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

  //tratamento das strings
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

    return {
      id: linha.id,
      titulo,
      status: linha.status === "Circulação de Trens"
      ? "Velocidade reduzida"
      : linha.status,
    };
  });

  return linhas;
}

export function getOne(linhas, id) {
  const linha = linhas.filter((item) => item.id == id);
  if(linha.length == 0) throw new Error ('Linha inexistente')
  return linha[0];
}
