import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the Redux store and handles the redirection
    redirect to the 1st product
 */

export default function ProductIndex() {
  const { products } = useSelector(state => state.products)

  if (products.length > 0) {
    const firstProductHandle = products[0].handle;
    return <Navigate to={`/products/${firstProductHandle}`} replace />;
  }

  return (
    <p id="zero-state" className="bg-transparent">
      Products index
    </p>
  )
}
