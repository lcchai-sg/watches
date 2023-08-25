const axios = require('axios').default;

(async () => {
    let cat_uid = '"MTIy"';
    var options = {
        method: 'POST',
        url: 'https://www.longines.com/api/graphql',
        headers: {'Content-Type': 'application/json', 'User-Agent': 'Insomnia/2023.5.6'},
        data: '{"query":"{categories(filters:{category_uid:{eq:'+cat_uid+'}}) {total_count items { children_count name children { name children_count uid include_in_watch_configurator group_name}}} }"}'
    };
    const { data } = await axios.request(options);
    console.log(data);
})();

// https://www.longines.com/api/graphql?query=query Categories($filters:CategoryFilterInput!){Categories(filter: $filters){total_count items {children_count name children{name children_count uid}}}&variables={"filters":{"category_uid":{"eq":"MTc="}}}&operationName=Categories


// https://www.longines.com/api/graphql?query=query ProductList($pageSize: Int = 24 $currentPage: Int = 1 $filters: ProductAttributeFilterInput! $sort: ProductAttributeSortInput! $search: String = "") { products( pageSize: $pageSize currentPage: $currentPage filter: $filters sort: $sort search: $search ) { ...ProductListContent } } fragment ProductListContent on Products { total_count page_info { current_page page_size } ...ProductListItems ...ProductListToolbar } fragment ProductListItems on Products { items { ...ProductCardFull } } fragment ProductCardFull on ProductInterface { ...ProductCard ...ProductConfiguratorFragment ...ProductCardVariations ...WatchComparatorSummaryItem } fragment ProductCard on ProductInterface { __typename attribute_set_id url_key sku product_sku name custom_watch_collection tag case_dimension case_material mvt_fct_type description_sunglasses_description description_color dimensions_width_bracelet dimensions_width_bracelet_range filter_width_strap filter_interchangeable material_cluster small_image { path label } ...ProductStatus ...ProductPrice ... on ConfigurableProduct { ...ConfigurableProductCardFragment variants { ...ConfigurableProductCardOptionsFragment } } } fragment ProductStatus on ProductInterface { __typename uid attribute_set_id stock_status purchasable crcorporate crretailer live_appointment preorder_is_enabled } fragment ProductPrice on ProductInterface { base_price { ...CartMoneyFragment } special_price } fragment CartMoneyFragment on Money { value currency value_formatted currency_symbol } fragment ConfigurableProductCardFragment on ConfigurableProduct { uid product_sku attribute_set_id default_buckle variants { ...ConfigurableProductCardOptionsFragment } } fragment ConfigurableProductCardOptionsFragment on ConfigurableVariant { product { uid product_sku sku stock_status ...ProductPrice } } fragment ProductConfiguratorFragment on ProductInterface { attribute_set_id url_key display_in_configurator configurator_dial { ...MediaGalleryItem } configurator_soldier { ...MediaGalleryItem } configurator_strap { ...MediaGalleryItem } related_dial_products { sku } related_strap_products { sku } } fragment MediaGalleryItem on MediaGalleryInterface { __typename ...MediaGalleryImage ... on ProductVideo { video_content { video_description video_title video_url } } } fragment MediaGalleryImage on MediaGalleryInterface { path } fragment ProductCardVariations on ProductInterface { ...ProductVariations } fragment ProductVariations on ProductInterface { ...ProductVariationsItem related_products { ...ProductVariationsItem } } fragment ProductVariationsItem on ProductInterface { attribute_set_id url_key uid description_color dial_color bracelet_material bracelet_color description_hexadecimal_colors { code } dial_hexadecimal_color { code } bracelet_hexadecimal_color { code } image { ...MediaGalleryImage } small_image { ...MediaGalleryImage } } fragment WatchComparatorSummaryItem on ProductInterface { sku name thumbnail { ...MediaGalleryItem } ...ProductSummaryDescriptionFragment ...ProductPrice } fragment ProductSummaryDescriptionFragment on ProductInterface { attribute_set_id product_sku case_dimension filter_width_strap } fragment ProductListToolbar on Products { aggregations { __typename label count attribute_code options { __typename label value count } } sort_fields { default options { label value direction } } }&variables={"currentPage":1,"pageSize":24,"url":"watches/classic/watchmaking-tradition/master-collection","filters":{"category_uid":{"eq":"MTc="}},"sort":{},"sizeRanges":{},"cache_buster_store":"en_us","cache_buster_lang":"en-us"}&operationName=ProductList

https://www.longines.com/api/graphql?query=query Categories($filters:CategoryFilterInput!){categories(filters: $filters){total_count items{children_count name children{name children_count uid}}}}&variables={"filters":{"category_uid":{"eq":"MTE4"}},"cache_buster_store":"zh_TW","cache_buster_lang":"zh-TW"}&operationName=Categories

query getHotspotProductsBySkus($skus: [String]!){products(filter:{sku:{in:$skus}}){items{sku url_key name small_image{path} attribute_set_id case_dimension mvt_fct_type case_material description_sunglasses_description description_color dimensions_width_bracelet dimensions_width_bracelet_range}