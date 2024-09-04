const query = `{
  customers(first: 10) { 
    edges {
      node {       
        id        
        verifiedEmail
        lastName
        firstName
    		numberOfOrders
        orders(first: 10) {
          edges {
            node {
              id
              name 
              totalPrice
              createdAt
              lineItems(first: 10) {
                nodes {
                  name
                  quantity
                  title
                  product {                  
                    media(first: 1) {
                      edges {
                        node {
                          preview {
                            image {
                              transformedSrc(maxHeight: 130, maxWidth: 130)
                            }
                          }
                        }
                      }
                    }
                  }
                  
               
                  
                }
              }
            }
          }
        } 
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

async function customersLoader(force = false) {
  let prefix = `customersLoader() ===> `
  console.log(prefix)

  try {

    //-------------------------------------------------------------
    // this mothod exposes Admin API, 
    //-------------------------------------------------------------
    // const headers = new Headers({
    //   'X-Shopify-Access-Token': import.meta.env.VITE__SHOPIFY_ADMIN_API,
    //   'Content-Type': 'application/json'
    // });

    // const response = await fetch(
    //   'https://vzine.myshopify.com/admin/api/2024-04/graphql.json',
    //   {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify({ query })
    //   }
    // )

    const APP_PROXY_URL = 'https://vzine.myshopify.com/apps/proxytest'

    const CACHE_KEY = 'appproxy_adminapi_ToM2U'; // Define a key to store data in sessionStorage



    const cachedData = sessionStorage.getItem(CACHE_KEY);
    // Check if data is stored in sessionStorage and the force option is not set

    let return_data = null

    // Check if sessionStorage is loaded & the force option is not set
    if (cachedData && !force) {
      console.log(prefix + 'Returning cached data from sessionStorage');
      if (cachedData !== undefined && cachedData.trim() != 'undefined') {
        console.log(prefix + ' cachedData ', cachedData);
        return_data = await JSON.parse(cachedData) // return the cached data
      }

    } else {

      console.log(prefix + ' start fetching ');

      // calling App Proxy
      const response = await fetch(APP_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'vzine.myshopify.com'
          'Access-Control-Allow-Origin': '*'
        }
      })
      if (!response.ok) {
        throw new Error('customersLoader(): Network response was not ok');
      }
      return_data = await response.json()
      console.log(prefix + 'Fetched new data from API:', return_data);
      if (return_data)
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(return_data));
    }

    console.log(prefix + ' return_data: ', return_data)

    let results = ''
    if (return_data) {
      results = return_data.data.customers.edges.map(i => i.node)
    }
    console.log(prefix + ' results: ', results)
    return results
  } catch (err) {
    console.error(prefix + 'error fetching customers: ', err)
  }

}

export default customersLoader;
