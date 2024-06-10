import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLoaderData } from 'react-router-dom'
 
// import { framerText } from '../../utils/framerAnimationOptions'
const ns = 'productlist'
 
function ProductList({ list, framerText }) {

  return (
    <div className={`${ns}`}>
      <li><h3 className='list-header bg-contrast2'>Products</h3></li>

      {list && list.length ? (
        list.map((product, idx) => {
          product = product.node
          return (
            <li key={idx}>{product.title}</li>
            // <motion.li key={product.id}
            //   data-prod-id={product.id}
            //   {...framerText(idx)}
            // >
            //   <NavLink
            //     as="NavLink"
            //     to={`products/${product.handle}`}
            //     className={({ isActive, isPending }) =>
            //       isActive ? 'active' : isPending ? 'pending' : ''
            //     }
            //   >
            //     {product.title ? (
            //       <>
            //         {product.title}
            //       </>
            //     ) : ''}
            //   </NavLink>
            // </motion.li>
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
