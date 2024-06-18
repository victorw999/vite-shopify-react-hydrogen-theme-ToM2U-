import { useLoaderData } from "react-router-dom"
import { Navigate } from "react-router-dom";

/**
 *  a Redirection Component
    a component that reads from the local storage via loader()and handles the redirection
    redirect to the 1st contact
 */

export default function ContactIndex() {

  // retrieving contact's data from local storage
  // const { contacts } = useLoaderData()

  // if (contacts.length > 0) {
  //   const firstContactId = contacts[0].id;
  //   return <Navigate to={`/contacts/${firstContactId}`} replace />;
  // }

  return (
    <div className="section_index_page bg-transparent">
      <h2 className="section_heading_normalcase">
        Provides a glossary of your B2B customer contact information, streamlining communication.
        While this serves as a proof-of-concept for a contact directory, its underlying layout can be adapted to encompass a wider range of functionalities.  This includes the management of merchandise information, product categorization, and establishing associations between different data points.

      </h2>
    </div>
  )
}


