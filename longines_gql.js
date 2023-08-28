const axios = require('axios');
const graphql = `https://www.longines.com/api/graphql`;
let initQry = `query{categories{items{uid}}}`;
let categoriesQry = `query{categories(filters:{category_uid:{eq:"Mg=="}}){items{name children{name uid}}}}`;
let uid="";
let productsQry = `query{products(pageSize:2000,filter:{category_uid:{eq:"${uid}"}}){items{categories{uid}}}}`;
const uuid = [];

(async () => {
    const { data } = await axios.post(graphql, {query:initQry});
    if (data) {
        for (const cat of data.data.categories.items) {
            uid = cat.uid;
            const { data:products } = await axios.post(graphql, {query:productsQry});
            if (products) {
                for (const p of products.data.products.items) {
                    if (p.categories) {
                        for (const c of p.categories) {
                            if (uuid.indexOf(c.uid) < 0)
                                uuid.push(c.uid)
                        }
                    }
                }
            }
        }
    }
    for (const uid of uuid) {
        categoriesQry = `query{categories(filters:{category_uid:{eq:"${uid}"}}){items{name children{name uid}}}}`;
        const { data } = await axios.post(graphql, {query:categoriesQry});
        console.log(data);
        exit(0);
    }
})();