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
  let product = products.filter(product => product.handle === handle)[0]

  console.log('===>> product: ', product)

  return (
    <div id="product_detail" className="detail_section">
      {
        (product != null) ? (<>
          <div className="detail_img_wrapper">
            <img
              className="detail_img_main"
              srcset={`
                ${product?.media?.edges[0]?.node?.previewImage?.transformedSrc} 480w,
                ${product?.featuredImage?.originalSrc} 800w
              `}
              sizes="(max-width: 500px) 480px, 100vw"
              src={`${product?.featuredImage?.originalSrc}`}
              loading="lazy"
            />
          </div>

          <div className="detail_info_wrapper">
            <h1 className='section_heading'>{product.title}</h1>
            <div className="handle ">
              <span className="num_format_box">{product.handle}</span>
            </div>
            <div className="description py-10">{product.description}</div>
            <div className="list_section variants">
              <h2 className="list_title">Variants: </h2>
              <ul>
                {
                  product?.variants?.edges.map(item => {
                    let variant = item.node
                    let vid = variant.id.replace('gid://shopify/ProductVariant/', '')
                    let selectOptions = variant.selectedOptions[0]
                    return (
                      <li className="variantItem" key={vid}>
                        <span className="vid num_format_box">{vid}</span>
                        <span className="selectedOption uppercase num_format_box">{`${selectOptions.name}/${selectOptions.value}`}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </>) : (<div> no product match the param </div>)
      }
    </div>
  )
}

