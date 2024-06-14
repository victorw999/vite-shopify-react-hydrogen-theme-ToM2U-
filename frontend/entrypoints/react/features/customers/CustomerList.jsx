import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion'
import { NavLink, useLoaderData } from 'react-router-dom'
import { calcCustomerTotalSpending } from './customerUtils'

// import { framerText } from '../../utils/framerAnimationOptions'
const ns = 'customerlist'

function CustomerList({ framerText }) {

  const { customers, loadingError } = useSelector((state) => state.customers);

  return (
    <div className={`${ns}`}>
      <li><h3 className='list-header bg-contrast2'>customers</h3></li>

      {customers && customers.length ? (
        customers.map((customer, idx) => {

          // strip the gid's prefix to get the customer id
          let cid = customer.id.replace('gid://shopify/Customer/', '')
          let totalSpending = calcCustomerTotalSpending(customer)

          return (

            <motion.li key={customer.id}
              data-prod-id={customer.id}
              {...framerText(idx)}
            >
              <NavLink
                as="NavLink"
                to={`customers/${cid}`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
              >
                {customer.firstName && customer.lastName ? (
                  <div className='name'>
                    {`${customer.firstName} ${customer.lastName} `} <span className="totalSpending font-mono p-[2px] px-3 bg-[green] rounded-[2px]">${totalSpending}</span>
                  </div>
                ) : ''}
              </NavLink>
            </motion.li>
          )
        })
      ) : (
        <li>
          <a href="#" disabled>
            <i>No customers</i>
          </a>
        </li>
      )}
    </div>
  )
}

export default CustomerList
