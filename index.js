import * as cheerio from "cheerio";
import pretty from "pretty";

(async () => {
  const response = await fetch("https://www.viamobilidade.com.br/");
  const html = await response.text();

  let linhas = [];

  const $ = cheerio.load(html);
  const listaLinhas = $("ol").find("li");

  for (let i = 0; i < listaLinhas.length; i++) {
    linhas[i] = {
      id: $(listaLinhas[i]).find("span[title]").text(),
      titulo: $(listaLinhas[i]).find("span").attr("title"),
      status: $(listaLinhas[i]).find(".status").text(),
    };
    console.log(linhas[i]);
  }
})();
