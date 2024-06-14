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

/**
 * convert GraphQL's DatString to this format xx/xx/year
 * @param {*} dateString 
 * @returns 
 */
export function convertISODateToString(dateString) {
  // Create a Date object from the ISO 8601 string
  const date = new Date(dateString);

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

  // Format the date in "MM/DD/YYYY"
  return `${month}/${day}/${year}`;
}