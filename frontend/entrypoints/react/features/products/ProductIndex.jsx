import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the Redux store and handles the redirection
    redirect to the 1st product
 */

export default function ProductIndex() {
  // const { products } = useSelector(state => state.products)

  // if (products.length > 0) {
  //   const firstProductHandle = products[0].handle;
  //   return <Navigate to={`/products/${firstProductHandle}`} replace />;
  // }

  return (
    <div className="section_index_page bg-transparent">
      <h2 className="section_heading_normalcase">
        <b>Identify Your Best Sellers:</b> Leverage Shopify's <a href="https://shopify.dev/docs/api/storefront"> GraphQL Storefront API </a> to retrieve real-time product data and identify your top-performing items.
        This product list goes beyond what a basic Shopify store offers. By leveraging the data you gather, you can tailor it into a format that enhances the customer experience. Imagine curated collections, personalized recommendations, or dynamic product displays based on browsing behavior –  all features unavailable in the default Shopify setup.
      </h2>
    </div>
  )
}
