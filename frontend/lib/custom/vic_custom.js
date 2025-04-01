import {createCustomDropdown} from './customDropdown.js'

export function initCustomFeatures() {

  document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
      // Create and append the dropdown
      const dropdown = createCustomDropdown('buddhistDropdown')
      document.body.appendChild(dropdown)
      console.log('===> dropdown injected to DOM simulating 3rd party app  ')
    }, 5000)
  })
}
