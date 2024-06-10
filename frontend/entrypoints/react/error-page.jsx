import { useRouteError } from 'react-router-dom'
import { SHOPIFY_REACT_ROOT } from './Global'
import { useEffect } from 'react'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  useEffect(() => {
    if (error) {
      document.getElementById(SHOPIFY_REACT_ROOT).classList.add('error-state')
    } else {
      document
        .getElementById(SHOPIFY_REACT_ROOT)
        .classList.remove('error-state')
    }

    return () => {
      // Cleanup to remove the class if ErrorBoundary is unmounted
      document
        .getElementById(SHOPIFY_REACT_ROOT)
        .classList.remove('error-state')
    }
  }, [error])

  // Set the error state in your root component
  // const root = document.getElementById(SHOPIFY_REACT_ROOT);
  // if (root) {
  //   const rootComponent = ReactDOM.renderToString(<ReactRoot />);
  //   root.innerHTML = rootComponent; // Remount to trigger state change
  //   const rootElement = root.firstChild;
  //   rootElement.classList.add('error-state');
  // }

  return (
    <div id="error-page">
      <p>
        React Errors: &nbsp;
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
