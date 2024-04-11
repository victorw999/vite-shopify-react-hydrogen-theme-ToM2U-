const query = `{
  products(first: 10) {  
    edges {
      node {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`
async function fetchProducts() {
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

  console.log('===> products', data.data.products.edges) // Access product data

  return data.data.products.edges
}

export default fetchProducts
