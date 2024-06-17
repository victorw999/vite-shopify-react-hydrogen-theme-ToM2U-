import React, { useState } from 'react'
import { framerText } from '../../utils/framerAnimationOptions';
import ContactList from '../contacts/ContactList';
import ProductList from '../products/ProductList';
import { useNavigate, redirect, NavLink } from 'react-router-dom';
import CustomerList from '../customers/CustomerList';

const TabSwitch = ({ initialActiveTab = 'contacts', contactsState, customersState }) => {

  const [activeTab, setActiveTab] = useState(initialActiveTab);
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
        <button
          className={activeTab === 'contacts' ? 'active' : ''}
          onClick={() => handleTabClick('contacts')}
        >
          contacts
        </button>
        <button
          className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => handleTabClick('customers')}
        >
          customers
        </button>
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => handleTabClick('products')}
        >
          products
        </button>

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