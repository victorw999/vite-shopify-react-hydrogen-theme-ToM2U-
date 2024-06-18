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
        <b>Purchase History:</b> Utilize Shopify's  <a href="https://shopify.dev/docs/api/admin-graphql"> GraphQL Admin API </a> to extract detailed customer data for business intelligence. This includes metrics like total spending since account creation. By accessing this data, businesses can gain insights into customer behavior, optimize marketing, and improve customer relationship management, driving growth and success.
      </h2>
    </div>
  )
}
