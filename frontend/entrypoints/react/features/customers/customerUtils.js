/**
 * calculate the total spending of all orders of the input customer
 * @param {customer obj} customer obj returned by GraphQL 
 * @returns sum of all orders
 */
export function calcCustomerTotalSpending(customer) {
  console.log(' calcCustomerTotalSpending ', customer.firstName)
  let sum = 0
  try {
    sum = customer.orders.edges.reduce((accum, curr) => {
      let orderTotalPrice = curr.node.totalPrice
      return Number(accum) + Number(orderTotalPrice)
    }, 0)
  } catch (e) {
    console.error('calcCustomerTotalSpending() error', e)
  }
  return sum
}