import React, { useState } from 'react'
import { framerText } from '../../utils/framerAnimationOptions';
import ContactList from '../contacts/ContactList';
import ProductList from '../products/ProductList';
import { useNavigate, redirect, NavLink, Link } from 'react-router-dom';
import CustomerList from '../customers/CustomerList';
import { IconHome, IconPeople, IconLoadCustomer, IconProducts, IconContactBook } from '../../components/icons';
import { PiPants } from "react-icons/pi";


const TabSwitch = ({ activeTab, setActiveTab, contactsState }) => {

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // change router path
    if (tab === 'products' || tab === 'contacts' || tab === 'customers') {
      navigate(`/${tab}`)
    }
  };

  return (

    <div className='TabSwitch'>
      <div className="tab-controls">

        <Link to={`/`} className='tab_ctrl_unit'>
          <IconHome />
        </Link>

        <button
          className={`${activeTab === 'products' ? 'active' : ''} tab_ctrl_unit desktop_unit`}
          onClick={() => handleTabClick('products')}
        >
          <span className="desktop_txt">Products</span>
        </button>
        <IconProducts className="mobile_icon" action={() => handleTabClick('products')} />

        <button
          className={`${activeTab === 'customers' ? 'active' : ''} tab_ctrl_unit desktop_unit`}
          onClick={() => handleTabClick('customers')}
        >
          <span className="desktop_txt">Customers</span>
        </button>
        <IconLoadCustomer className="mobile_icon" action={() => handleTabClick('customers')} />

        <button
          className={`${activeTab === 'contacts' ? 'active' : ''} tab_ctrl_unit desktop_unit`}
          onClick={() => handleTabClick('contacts')}
        >
          <span className="desktop_txt">Contacts</span>
        </button>

        <IconContactBook className="mobile_icon" action={() => handleTabClick('contacts')} />
      </div>

      <div className="tab-content">
        <div className="panel">
          {activeTab === 'contacts' && (
            <ContactList list={contactsState} framerText={framerText} />
          )}
          {activeTab === 'customers' && (
            <CustomerList framerText={framerText} />
          )}
          {activeTab === 'products' && (
            <ProductList framerText={framerText} />
          )}
        </div>
      </div>
    </div>

  )
}

export default TabSwitch