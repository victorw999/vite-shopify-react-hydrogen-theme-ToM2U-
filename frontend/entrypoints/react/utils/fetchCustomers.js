const query = `{
  customers(first: 10) { 
    edges {
      node {       
        id        
        verifiedEmail
        lastName
        firstName
    		numberOfOrders
        lastOrder {
          id
          name
          lineItems (first: 10){
            nodes{
              title
              product{
                priceRangeV2{
                  maxVariantPrice{
                    amount
                  }
                }
                images (first:1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
        
              }
            }
          }
           
           
        }
        validEmailAddress
        tags
        image {
          id
        }
        
      }
    }
  }
}


`

async function fetchCustomers() {

  const headers = new Headers({
    'X-Shopify-Access-Token': import.meta.env.VITE__SHOPIFY_ADMIN_API,
    'Content-Type': 'application/json'
  });

  const response = await fetch(
    'https://vzine.myshopify.com/admin/api/2024-04/graphql.json',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query })
    }
  )

  const data = await response.json()

  // console.log('===> data.data.customers', data.data.customers.edges) // Access product data

  return data.data.customers.edges
}

export default fetchCustomers
