const axios = require('axios');

const graphql = "https://www.longines.com/api/graphql";

(async () => {
    let qry = `query getProductsBySkus($skus:[String]!,$pageSize:Int=24){products(pageSize:$pageSize,filter:{sku:{in:$skus}}){items{...ProductCardFull}}}fragment ProductCardFull on ProductInterface{...ProductCard ...ProductConfiguratorFragment ...ProductCardVariations ...WatchComparatorSummaryItem} fragment ProductCard on ProductInterface{attribute_set_id url_key sku product_sku name custom_watch_collection tag case_dimension case_material mvt_fct_type description_sunglasses_description description_color dimensions_width_bracelet dimensions_width_bracelet_range filter_width_strap filter_interchangeable material_cluster small_image{path label} ...ProductStatus ...ProductPrice ... on ConfigurableProduct{...ConfigurableProductCardFragment variants{...ConfigurableProductCardOptionsFragment}}} fragment ProductStatus on ProductInterface{uid attribute_set_id stock_status purchasable crcorporate crretailer live_appointment preorder_is_enabled concierge} fragment ProductPrice on ProductInterface{base_price{...CartMoneyFragment} special_price} fragment CartMoneyFragment on Money{value currency value_formatted currency_symbol} fragment ConfigurableProductCardFragment on ConfigurableProduct{uid product_sku attribute_set_id default_buckle variants{...ConfigurableProductCardOptionsFragment}} fragment ConfigurableProductCardOptionsFragment on ConfigurableVariant{product{uid product_sku sku stock_status ...ProductPrice}} fragment ProductConfiguratorFragment on ProductInterface{attribute_set_id url_key display_in_configurator configurator_dial{...MediaGalleryItem} configurator_soldier{...MediaGalleryItem} configurator_strap{...MediaGalleryItem} related_dial_products{sku} related_strap_products{sku}} fragment MediaGalleryItem on MediaGalleryInterface{...MediaGalleryImage ... on ProductVideo{video_content{video_description video_title video_url}}} fragment MediaGalleryImage on MediaGalleryInterface{path} fragment ProductCardVariations on ProductInterface{...ProductVariations} fragment ProductVariations on ProductInterface{...ProductVariationsItem related_products{...ProductVariationsItem}} fragment ProductVariationsItem on ProductInterface{attribute_set_id url_key uid description_color dial_color bracelet_material bracelet_color description_hexadecimal_colors{code} dial_hexadecimal_color{code} bracelet_hexadecimal_color{code} image{...MediaGalleryImage} small_image{...MediaGalleryImage}} fragment WatchComparatorSummaryItem on ProductInterface{sku name thumbnail{...MediaGalleryItem} ...ProductSummaryDescriptionFragment ...ProductPrice} fragment ProductSummaryDescriptionFragment on ProductInterface{ attribute_set_id product_sku case_dimension filter_width_strap}`;
    const { data } = await axios.post(graphql, {query:qry, "variables":{"skus":["L2.409.4.87.2"]},"operationName":"getProductsBySkus"});
    console.log(data.data.products.items);
})()