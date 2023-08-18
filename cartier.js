const axios = require('axios');
const cheerio = require('cheerio');
const { CLIENT_RENEG_LIMIT } = require('tls');

const sleep = async t => {
    await new Promise(r => setTimeout(r, t));
}

const indexing = async context => {
    const { client, entry, base, interval } = context;
    let cnt = 0; const uniq = [];
    console.log(entry);
    const { data } = await client.get(entry);
    const $ = cheerio.load(data);
    $(".country-selector__country-list").each((idx,el) => {
        $(el).find(".country-selector__country").each((idx,el) => {
            $(el).find("a").each((idx,el) => {
                const href = $(el).attr("href");
                let name = $(el).text()
                name = name ? name.trim() : name;
                console.log("name: ",name);
                console.log("url: ", href);
            })
        })
    })
    console.log();
    console.log(`unique brand : ${cnt}`);
    return uniq;
}

const extraction = async (context) => {
    const { client, entry, base, ...rest } = context;
    const result = { ...rest, url: entry, spec: [], related: [], features: [] };
    result.source = "official";
    result.lang = "en";
    result.brand = "Citizen";
    result.brandID = 86;
    try {
        const res = await client.get(entry);
        const cUrl = res.request.res.responseUrl;
        if (cUrl != entry) {
            result.code = 404;
            return;
        }
        const { data } = res;
        const $ = cheerio.load(data);
        const title = $(".product-name").first().text();
        const subtitle = $(".product-subtitle").text();
        result.name = title + (subtitle ? subtitle : "");
        result.reference = $(".product-id").text();
        result.retail = $(".price").find(".list").find(".value").attr("content");
        result.price = $(".price").find(".sales").find(".value").attr("content");
        if (result.price) result.price = result.price.replace(/\s+/g, " ").trim();
        if (!result.retail) result.retail = result.price;
        result.description = $(".show-more-text-content").text().trim();
        result.thumbnail = $(".primary-images-main").find(".slide").first().attr("data-zoom-image");
        if (result.url.match(/\bmens\b/)) result.gender = "M";
        $(".recommendation-thumbnail").each((idx, el) => {
            const url = $(el).find("a").attr("href");
            const u = url ? url.split('/') : null;
            const r = u ? u[u.length - 1].replace('.html', '') : null;
            if (r) result.related.push(r);
        })
        let key, value;
        $(".key-details-col-2").find(".row").find("div").each((idx, el) => {
            const c = $(el).attr("class");
            if (c.match(/pdp-detail-attribute-header/i)) {
                key = $(el).text();
                if (key) key = key.replace(/\s+/g, " ").trim();
            } else if (c.match(/pdp-detail-attribute-col/i)) {
                value = $(el).find(".pdp-detail-attribute-list").text();
                if (value) {
                    const v = value.split('\n');
                    let nval = "";
                    v.forEach(val => {
                        const vv = val.replace(/\n|\s+/g, " ").trim();
                        if (vv) nval = nval + vv + " | ";
                    })
                    value = nval.slice(0, nval.length - 3);
                }
            }
            if (key && value) {
                result.spec.push({ key, value });
                key = ""; value = "";
            }
        })
        $(".feature-text-list-item").each((idx, el) => {
            const key = "feature";
            const value = $(el).text().replace(/\s+/g, " ").trim();
            result.spec.push({ key, value });
        })
        key = ""; value = "";
        $(".features-attributes-row").find(".row").find("div").each((idx, el) => {
            const c = $(el).attr("class");
            if (c.match(/pdp-detail-attribute-header/i)) {
                key = $(el).text();
                if (key) key = key.replace(/\s+/g, " ").trim();
            } else if (c.match(/pdp-detail-attribute-col/i)) {
                value = $(el).find(".pdp-detail-attribute-list").text();
                if (value) {
                    const v = value.split('\n');
                    let nval = "";
                    v.forEach(val => {
                        const vv = val.replace(/\n|\s+/g, " ").trim();
                        if (vv) nval = nval + vv + " | ";
                    })
                    value = nval.slice(0, nval.length - 3);
                }
            }
            if (key && value) {
                result.spec.push({ key, value });
                key = ""; value = "";
            }
        })
        $(".pdp-additional-functions-list").each((idx, el) => {
            const key = "functions";
            const value = $(el).text();
            if (value) {
                const v = value.split('\n');
                v.forEach(val => {
                    const value = val.replace(/\n|\s+/g, " ").trim();
                    if (value) result.spec.push({ key, value });
                })
            }
        })
    } catch (error) {
        console.error('Failed extraction for Citizen with error : ' + error);
        console.error('entry : ', entry)
        if (error.response) result.code = error.response.status;
        else result.code = 'UNKNOWN ERROR';
    }
    return result;
};

(async () => {
    // const url = "https://www.cartier.com/en-us/watches/collections/";
    const url = "https://www.cartier.com/en-us/change-country?renderView=modal";
    const result = await indexing({
        client: axios,
        entry: url,
        base: "https://www.cartier.com",
        interval: 2000
    })
    console.log(result);
    // for (const u of rr) {
    //     const ex = await extraction({
    //         client: axios,
    //         entry: u,
    //         base: "https://www.citizenwatch.com",
    //     })
    //     console.log(ex);
    //     await sleep(5000);
    // }
    console.log();
    console.log(`done......................`);
})()
