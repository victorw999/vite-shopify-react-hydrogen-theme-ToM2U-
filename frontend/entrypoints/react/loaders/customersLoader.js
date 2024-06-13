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

async function customersLoader() {
  try {
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
    console.log('===customers loader data: ', data)
    let results = data.data.customers.edges.map(i => i.node)
    return results
  } catch (err) {
    console.error('fetchCustomersByAdminAPI() error fetching customers: ', err)
  }

}

export default customersLoader;
