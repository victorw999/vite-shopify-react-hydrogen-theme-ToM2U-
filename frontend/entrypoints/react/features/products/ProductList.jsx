import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion'
import { NavLink, useLoaderData } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { filterProductsByQuery } from './productUtils';

const ns = 'productlist'

function ProductList({ framerText }) {

  // get products from redux
  const { products, loadingError } = useSelector((state) => state.products);

  // get search paramater directly, w/o using a loader to return "q"
  const [searchParams] = useSearchParams()

  // filteredProducts are filtered by searchPrams (user searches)
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {

    // filter logic, update state 'filteredProducts'
    const fetchData = async () => {
      try {
        const filteredData = await filterProductsByQuery(products, searchParams.get('q'));
        setFilteredProducts(filteredData);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    // Fetch data only if products are available to avoid unnecessary calls
    if (products.length > 0) {
      fetchData();
    }
  }, [searchParams, products])

  return (
    <div className={`${ns}`}>
      <li><h3 className='list-header bg-contrast2'>Products</h3></li>

      {filteredProducts && filteredProducts.length ? (
        filteredProducts.map((product, idx) => {

          return (
            // <li key={idx}>{product.title}</li>
            <motion.li key={product.id}
              data-prod-id={product.id}
              {...framerText(idx)}
            >
              <NavLink
                as="NavLink"
                to={`products/${product.handle}`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
              >
                {product.title ? (
                  <>
                    {product.title}
                  </>
                ) : ''}
              </NavLink>
            </motion.li>
          )
        })
      ) : (
        <li>
          <a href="#" disabled>
            <i>No products</i>
          </a>
        </li>
      )}
    </div>
  )
}

export default ProductList
