import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const ns = 'contactlist'

function ContactList({ list, framerText }) {
  return (
    <div className={`${ns}`}>
      <li><h3 className='list-header bg-contrast2'>Contacts</h3></li>
      {list.length ? (
        list.map((contact, idx) => (
          <motion.li key={contact.id}
            {...framerText(idx)}
          >
            <NavLink
              as="NavLink"
              to={`contacts/${contact.id}`}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}{' '}
              {contact.favorite && <span>★</span>}
            </NavLink>
          </motion.li>
        ))
      ) : (
        <li>
          <a href="#" disabled>
            <i>No contacts</i>
          </a>
        </li>
      )}
    </div>
  )
}

export default ContactList
