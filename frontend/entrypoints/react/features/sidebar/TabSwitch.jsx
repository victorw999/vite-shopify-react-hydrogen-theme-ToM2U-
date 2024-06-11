import React, { useState } from 'react'
import { framerText } from '../../utils/framerAnimationOptions';
import ContactList from '../contacts/ContactList';
import ProductList from '../products/ProductList';
import { useNavigate, redirect, NavLink } from 'react-router-dom';

const TabSwitch = ({ initialActiveTab = 'contacts', contactsState, customersState }) => {

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // change router path
    if (tab === 'products' || tab === 'contacts' || tab === 'customers' ) {
      navigate(`/${tab}`)
    }    
  };

  return (
    <>
      <div>TabSwitch</div>
      <div>
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
          <div onClick={() => handleTabClick('products')}>
            <NavLink to="products" className={activeTab === 'products' ? 'active' : ''}>
              here products
            </NavLink>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'contacts' && (
            <div className="panel">
              <ContactList list={contactsState} framerText={framerText} />
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="panel">customers</div>
          )}
          {activeTab === 'products' && (
            <div className="panel">
              <ProductList framerText={framerText} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TabSwitch