const axios = require('axios');
const cheerio = require('cheerio');
const w_url = "https://www.longines.com/en-us/p/watch-the-longines-master-collection-l2-128-4-77-6";

(async () => {
    const { data } = await axios.get(w_url);
    const $ = cheerio.load(data);
    let title = $('meta[property="og:title"]').attr('content');
    let description = $('meta[name="description"]').attr('content');
    let locale = $('meta[property="og:locale"]').attr('content');
    let url = $('meta[property="og:url"]').attr('content');
    let image = $('meta[property="og:image"]').attr('content');
    let s = $('script[type="application/ld+json"]').contents();
    let script = JSON.parse(s['0'].data);
    let sku = num = "";
    $('h1').each((idx,el) => {
        let cls = $(el).attr('class');
        if (cls && cls.match("ProductPageInformation_Title")) {
            sku=$(el).find("span").text();
        }
    })
    $('div').each((idx,el) => {
        let cls = $(el).attr('class');
        if (cls && cls.match("ProductPageVariations")) {
            num = $(el).find('p').text();
            $(el).find('li').each((idx,el) => {
                let href = $(el).find('a').attr('href');
                let desc = $(el).find('span').text();
                console.log({ href, desc });
            })
        }
    })
    console.log({title, description, locale, url, image, script, sku, num});
})()