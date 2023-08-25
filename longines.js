const axios = require('axios');
const cats = require('./const_cats');
const graphql = "https://www.longines.com/api/graphql";

const categoriesqry = `query{categories{items{uid}}}`;
let productsqry = `query{products(pageSize:2000,filter:{category_uid:{eq:"Mg=="}}){total_count items{categories{uid}}}}`;
const categories = [];
    
(async() => {
    for (const cat of cats) {
        console.log(`uid : ${cat.uid}`);
        productsqry = `query{products(pageSize:2000,filter:{category_uid:{eq:"${cat.uid}"}}){total_count items{product_sku uid}}}`;
        const { data } = await axios.post(graphql, {query:productsqry});
        for (const d of data.data.products.items) {
            console.log(d);
        }
        process.exit(0);
    }

    // const { data } = await axios.post(graphql, {query: categoriesqry});
    //     if (data && data.data && data.data.categories && data.data.categories.items) {
    //     if (data.data.categories.items.length > 0) {
    //         for (const i of data.data.categories.items) {
    //             productsqry = `query{products(pageSize:2000,filter:{category_uid:{eq:"${i.uid}"}}){total_count items{categories{uid name}}}}`;
    //             const { data } = await axios.post(graphql, {query: productsqry});
    //             if (data && data.data && data.data.products && data.data.products.items) {
    //                 data.data.products.items.forEach(r => {
    //                     if (r.categories && r.categories.length > 0) {
    //                         r.categories.forEach(i => {
    //                             // if (categories.indexOf(i.uid) < 0)
    //                             //     categories.push(i.uid);
    //                             if (!categories.some(item => item.uid === i.uid))
    //                                 categories.push(i);
    //                         })
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }
    // categories.sort().forEach(u => {
    //     console.log(u);
    // })
})();
