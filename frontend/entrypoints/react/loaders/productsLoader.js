// shopify Storefront API

const query = ` {
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        description
        variants(first: 5) {
          edges {
            node {              
              id
              selectedOptions {
                name
                value
              }
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          originalSrc           
        }
        media(first: 1) {
          edges {
            node {              
              previewImage {
                transformedSrc(maxHeight: 200, maxWidth: 200)
              }
            }
          }
        }
      }
    }
  }
}`
async function productsLoader() {

  const response = await fetch(
    'https://vzine.myshopify.com/api/2024-07/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env
          .VITE__SHOPIFY_STOREFRONT_API
      },
      body: JSON.stringify({ query })
    }
  )

  const data = await response.json()

  // console.log('===> productLoader()', data.data.products.edges) // Access product data

  // massage "products" data for easy usage
  const products = data.data.products.edges.map(i => i.node)

  return products
}

export default productsLoader
