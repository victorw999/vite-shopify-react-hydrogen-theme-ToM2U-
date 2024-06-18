import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion'
import { NavLink, useLoaderData } from 'react-router-dom'
import { calcCustomerTotalSpending, filterCustomersByQuery } from './customerUtils'
import { useSearchParams } from 'react-router-dom';

// import { framerText } from '../../utils/framerAnimationOptions'
const ns = 'customerlist'

function CustomerList({ framerText }) {

  // get customers from redux
  const { customers, loadingError } = useSelector((state) => state.customers);

  // get search paramater directly, w/o using a loader to return "q"
  const [searchParams] = useSearchParams()

  // filteredCustomers are filtered by searchPrams (user searches)
  const [filteredCustomers, setfilteredCustomers] = useState(null)

  useEffect(() => {

    // filter logic, update state 
    const fetchData = async () => {
      try {
        const filteredData = await filterCustomersByQuery(customers, searchParams.get('q'));
        setfilteredCustomers(filteredData);
      } catch (error) {
        console.error('Error fetching filtered customers:', error);
      }
    };

    fetchData();

  }, [searchParams, customers])

  return (
    <div className={`${ns}`}>
      <li><h3 className='list-header bg-contrast2'>customers</h3></li>

      {filteredCustomers && filteredCustomers.length ? (
        filteredCustomers.map((customer, idx) => {

          // strip the gid's prefix to get the customer id
          let cid = customer.id.replace('gid://shopify/Customer/', '')

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
                    {`${customer.firstName} ${customer.lastName}`} <span className="totalSpending num_format_box bg-green-700">${customer.totalSpending}</span>
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
