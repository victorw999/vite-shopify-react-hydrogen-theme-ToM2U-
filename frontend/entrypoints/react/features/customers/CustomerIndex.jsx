import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the Redux store and handles the redirection
    redirect to the 1st customer
 */

export default function CustomerIndex() {
  const { customers } = useSelector(state => state.customers)

  // redirection logic:  
  // if (customers.length > 0) {
  //   // strip the gid's prefix to get the customer id
  //   // first customer's id
  //   let cid = customers[0].id.replace('gid://shopify/Customer/', '')
  //   return <Navigate to={`/customers/${cid}`} replace />;
  // }

  return (
    <div className="customerIndex section_index_page bg-transparent">
      <h2 className="section_heading_normalcase"> 
        <b>Purchase History:</b> To securely fetch data that's accessible exclusively via the admin API without exposing the API key, we must create a custom app utilizing <a href="https://shopify.dev/docs/api/shopify-app-remix/v2/authenticate/public/app-proxy"> Shopify's App Proxy</a>. This approach involves the frontend making the data requests to an Remix endpoint, reserved for the proxy, which then securely calls the <a href="https://shopify.dev/docs/api/admin-graphql"> GraphQL admin API </a> on Shopify server. This intermediary layer effectively <a href="https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/generate-app-access-tokens-admin">safeguards</a> the admin API key.

      </h2>
    </div>
  )
}
