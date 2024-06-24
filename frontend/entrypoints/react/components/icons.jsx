import React from 'react'
import { motion } from 'framer-motion'
import { AiOutlineRollback } from 'react-icons/ai'
import { BsPeople } from "react-icons/bs";

import { RiHome7Line } from "react-icons/ri";
import { BsDatabaseDown } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiPants } from "react-icons/pi";
import { VscNewFile } from "react-icons/vsc";
import { MdOutlineImportContacts } from "react-icons/md";

const bsi = 2 // btn shake intensity
const framerBtnHover = (flag) => {
  let options = {
    scale: 1.01, // Always include scaling
  };

  if (flag && flag.includes('shake')) {
    options.x = [-bsi, bsi, -bsi, bsi, -bsi, 0]; // Creates a shaking motion
    options.transition = {
      duration: 0.1,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };
  }
  return options
}

const framerBtnHover_colorChange = (flag) => {
  let options = {
    scale: 1.01, // Always include scaling
    // backgroundColor: '#DAA520',// "#b59410", // gold
    borderColor: "#faca0d"
  };

  if (flag && flag.includes('shake')) {
    options.x = [-bsi, bsi, -bsi, bsi, -bsi, 0]; // Creates a shaking motion
    options.transition = {
      duration: 0.1,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };
  }
  return options
}


/** close contact app*/
export function IconGoBack(props) {
  return (
    <motion.button
      whileHover={framerBtnHover('shake')}
      onClick={props.action}
      className={`appIcon absolute right-[theme('sidebarMargin.default')]  ${props.className}`}
      aria-label="close sidebar"
    >
      <AiOutlineRollback />
    </motion.button>
  )
}


/** open Contacts app */
export function IconPeople(props) {
  const borderVariants = {
    default: {
      borderColor: 'white',
    },
    hover: {
      borderColor: 'red',
    },
  };

  return (
    <motion.button
      whileHover={framerBtnHover_colorChange('shake')}
      onClick={props.action}
      className={`appIcon  ${props.className}`}
      aria-label="toggle sidebar"
    >
      <BsPeople />
    </motion.button>
  )
}

/**   */
export function IconHome(props) {
  const { action, className, ...rest } = props;
  return (
    <motion.button
      whileHover={framerBtnHover}
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle home"
    >
      <RiHome7Line />
    </motion.button>
  )
}

/**  load sample contacts data */
export function IconLoadSample(props) {
  const { action, className, ...rest } = props; // Destructure and separate 'action'

  return (
    <motion.button
      whileHover={framerBtnHover}
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle load data"
      {...rest}
    >
      <BsDatabaseDown />
    </motion.button>
  )
}

/**  load shopify customer data */
export function IconLoadCustomer(props) {
  const { action, className, ...rest } = props; // Destructure and separate 'action'

  return (
    <motion.button
      whileHover={framerBtnHover}
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle load customer"
      {...rest}
    >
      <CgProfile />
    </motion.button>
  )
}

/**  Pants icon represent "products" */
export function IconProducts(props) {
  const { action, className, ...rest } = props; // Destructure and separate 'action'

  return (
    <motion.button
      whileHover={framerBtnHover}
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle load products"
      {...rest}
    >
      <PiPants />
    </motion.button>
  )
}

/**  create new contact, next to search bar*/
export function IconNewContact(props) {
  const { action, className, ...rest } = props; // Destructure and separate 'action'

  return (
    <motion.button
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle new contact "
      {...rest}
    >
      <VscNewFile />
    </motion.button>
  )
}



/**  contact books */
export function IconContactBook(props) {
  const { action, className, ...rest } = props; // Destructure and separate 'action'

  return (
    <motion.button
      whileHover={framerBtnHover}
      onClick={action}
      className={`appIcon  ${className ? className : ''}`}
      aria-label="toggle contact books "
      {...rest}
    >
      <MdOutlineImportContacts />
    </motion.button>
  )
}