import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SHOPIFY_URL, SHOPIFY_REACT_ROOT } from './Global.js';

console.log("====> SHOPIFY_REACT_ROOT", SHOPIFY_REACT_ROOT)
const target_container = document.getElementById(SHOPIFY_REACT_ROOT)
console.log("====> target_container", target_container)
const root = ReactDOM.createRoot(target_container);

root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App></App>
  </React.StrictMode>,
);