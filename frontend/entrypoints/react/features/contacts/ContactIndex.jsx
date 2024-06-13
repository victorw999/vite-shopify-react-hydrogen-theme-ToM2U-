import { useLoaderData } from "react-router-dom"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the local storage via loader()and handles the redirection
    redirect to the 1st contact
 */

export default function ContactIndex() {

  // retrieving contact's data from local storage
  const { contacts } = useLoaderData()

  if (contacts.length > 0) {
    const firstContactId = contacts[0].id;
    return <Navigate to={`/contacts/${firstContactId}`} replace />;
  }

  return (
    <p id="zero-state" className="bg-transparent">
      ContactIndex.jsx
    </p>
  )
}


