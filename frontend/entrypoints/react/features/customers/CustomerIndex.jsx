import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the Redux store and handles the redirection
    redirect to the 1st customer
 */

export default function CustomerIndex() {
  const { customers } = useSelector(state => state.customers)

  // if (customers.length > 0) {
  //   const firstProductHandle = customers[0].handle;
  //   return <Navigate to={`/customers/${firstProductHandle}`} replace />;
  // }

  return (
    <p id="zero-state" className="bg-transparent">
      customers index
    </p>
  )
}
