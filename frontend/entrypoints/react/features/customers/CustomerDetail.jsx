import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { calcCustomerTotalSpending, convertISODateToString } from "./customerUtils";
import { useMemo } from "react";

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

  // memoize expansive calculation
  const totalSpending = useMemo(() => calcCustomerTotalSpending(customer), [customer])

  console.log('===> customer detail: customer ', customer)

  return (
    <div id="customer_detail" className="detail_section">
      {
        (customer != null) ? (<>
          {/* <div className="detail_img_wrapper">
            <img
              className="detail_img_main"
              src={`${customer?.featuredImage?.originalSrc}`}
            />
          </div> */}

          <div className="detail_info_wrapper">
            <h1 className="section_heading">{`${customer.firstName} ${customer.lastName}`}</h1>
            <div className="totalSpending">Total Spending: <span className="num_format_box bg-green-700">${totalSpending}</span></div>
            <div className="description">{customer.description}</div>
            <div className="list_section">
              <h2 className="list_title">Orders: </h2>
              <ul>
                {
                  customer?.orders?.edges.map(item => {
                    let order = item.node
                    let lineItems = order.lineItems.nodes
                    return (
                      <li className="listItem orderItem" key={item.id}>
                        <div className="orderHeader">
                          <span className="orderNum num_format_box">{order.name}</span>{" "}
                          <span className="orderDate num_format_box">{convertISODateToString(order.createdAt)}</span>{" "}
                          <span className="totalprice num_format_box">${order.totalPrice}</span>
                        </div>
                        <div className="orderBody">
                          <ul>
                            {
                              lineItems.map(item => (
                                <li className="order_lineItem">
                                  <span className="lineItem_img_wrapper">
                                    <img
                                      className="lineItem_img_main"
                                      src={`${item?.product?.featuredImage.originalSrc}`}
                                    />
                                  </span>
                                  <span className="lineItem_info num_format_box border-none">
                                    {`${item.name} / qty:${item.quantity}`}
                                  </span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>

                      </li>
                    )
                  })
                }</ul>
            </div>
          </div>
        </>) : (<div> no customer match the param </div>)
      }
    </div>
  )
}

