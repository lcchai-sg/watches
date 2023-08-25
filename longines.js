const axios = require('axios')
const cheerio = require('cheerio')
const url = "https://www.longines.com/en-us"

const indexing = async (input) => {
    const { client, entry, base, interval } = input
    const source = "official"
    const lang = "en"
    const brand = "Longines"
    const brandId = 220020
    const result = { source, lang, brand, brandId, collections:[], watches:{} }
    const col = []
    const { data } = await client.get(entry)
    if (data) {
        const $ = cheerio.load(data)
    }
}

(async () => {
    const { data } = await axios.get(url)
    console.log(data)
})()