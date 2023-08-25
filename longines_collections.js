const axios = require("axios");
const cheerio = require("cheerio");
const url="https://cms.longines.reflet.dev/en-us/categories/watches";

(async () => {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    $(".CategoryBlock_Content").each((idx,el) => {
        const name = $(el).find("h2").text();
        const desc = $(el).find(".Typography_paragraph").text();
        console.log("collection : ", name);
        console.log("description : ", desc);
        console.log();
    })
})()