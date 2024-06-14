import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the Redux store and handles the redirection
    redirect to the 1st customer
 */

export default function CustomerIndex() {
  const { customers } = useSelector(state => state.customers)

  if (customers.length > 0) {
    // strip the gid's prefix to get the customer id
    // first customer's id
    let cid = customers[0].id.replace('gid://shopify/Customer/', '')
    return <Navigate to={`/customers/${cid}`} replace />;
  }

  return (
    <p id="zero-state" className="bg-transparent">
      customers index
    </p>
  )
}
