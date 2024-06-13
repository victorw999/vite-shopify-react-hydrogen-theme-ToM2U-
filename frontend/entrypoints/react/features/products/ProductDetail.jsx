import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProductDetail() {

  /**
   * retrieve products from redux store
   * * useSelector "memoization" 
   * * useSelector remembers the previously retrieved products data if the state hasn't changed and avoids unnecessary re-calculations.
   * * so we don't need to use useMemo() in this case
   */
  const { products } = useSelector((state) => state.products);

  const { handle } = useParams()

  // filter out the one matches params.handle
  let product =  products.filter(product => product.handle === handle)[0]

  return (
    <div id="product_detail" className="detail_section">
      {
        (product != null) ? (<>
          <div className="detail_img_wrapper">
            <img
              className="detail_img_main"
              src={`${product?.featuredImage?.originalSrc}`}
            />
          </div>

          <div className="detail_info_wrapper">
            <h1>{product.title}</h1>
            <div className="handle">{product.handle}</div>
            <div className="description">{product.description}</div>
            <div className="variants">
              <h2>Variants: </h2>
              {
                product?.variants?.edges.map(item => {
                  let variant = item.node
                  let vid = variant.id.replace('gid://shopify/ProductVariant/', '')
                  let selectOptions = variant.selectedOptions[0]
                  return (
                    <li className="variantItem" key={vid}>
                      <div className="vid">vid: {vid}</div>
                      <div className="selectedOption uppercase">{`${selectOptions.name}/${selectOptions.value}`}</div>
                    </li>
                  )
                })
              }
            </div>
          </div>
        </>) : (<div> no product match the param </div>)
      }
    </div>
  )
}

