export const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}
export const framerSidebarPanel = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.3 },
}
export const framerOutlet = {
  // initial: { opacity: 0 },
  // animate: { opacity: 1, delay: 0 },
  // exit: { opacity: 0, transition: { delay: 0 }, transition: { duration: 0 } },
  // transition: { duration: 1.0 },
}

export const framerDetailSection = {
  initial: { opacity: 1 },
  animate: { opacity: 1, delay: 0 },
  exit: { opacity: 0, transition: { delay: 0 }, transition: { duration: 0 } },
  // transition: { duration: 0.5 }
}


/**
 * set animation delays based on an item's index within a list.
 */
export const framerText = delay => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  }
}