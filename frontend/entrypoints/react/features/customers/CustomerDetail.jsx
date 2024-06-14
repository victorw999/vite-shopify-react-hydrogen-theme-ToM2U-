import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { calcCustomerTotalSpending } from "./customerUtils";

export default function CustomerDetail() {

  /**
   * retrieve customers from redux store
   * * useSelector "memoization" 
   * * useSelector remembers the previously retrieved customers data if the state hasn't changed and avoids unnecessary re-calculations.
   * * so we don't need to use useMemo() in this case
   */
  const { customers } = useSelector((state) => state.customers);

  const { customerId } = useParams()

  // filter out the one matches params.customerId
  let customer = customers.filter(customer => {
    // strip the gid's prefix to get the customer id
    let cid = customer.id.replace('gid://shopify/Customer/', '')
    if (cid === customerId) {
      return customer
    }
  })[0]

  console.log('===> customer detail: customer ', customer)
  console.log('calcCustomerTotalSpending: ', calcCustomerTotalSpending(customer))

  return (
    <div id="customer_detail" className="detail_section">
      {
        (customer != null) ? (<>
          <div className="detail_img_wrapper">
            {/* <img
              className="detail_img_main"
              src={`${customer?.featuredImage?.originalSrc}`}
            /> */}
          </div>

          <div className="detail_info_wrapper">
            <h1>{`${customer.firstName} ${customer.lastName}`}</h1>
            <div className="description">{customer.description}</div>
            <div className="variants">
              <h2>Variants: </h2>
              {
                customer?.variants?.edges.map(item => {
                  let variant = item.node
                  let vid = variant.id.replace('gid://shopify/customerVariant/', '')
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
        </>) : (<div> no customer match the param </div>)
      }
    </div>
  )
}

