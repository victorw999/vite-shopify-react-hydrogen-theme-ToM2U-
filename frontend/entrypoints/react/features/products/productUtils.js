
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export async function filterProductsByQuery(products, query) {

  let result
  if (!products) result = []
  if (query !== null && products !== null) {
    result = matchSorter(products, query, { keys: ['title', 'handle'] })
    return result.sort(sortBy('title', 'handle'))
  } else {
    result = products
  }
  // console.log('result: ', result)
  return products
}