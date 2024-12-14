import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "../../../entities/Contact";

// Component contains table of contacts with header and contacts
function TableContact(props) {
    return (
        <table className='table table-hover'>
            <thead>
                <tr
                // Header row 
                >
                    <th>ID</th>
                    <th>Имя контакта</th>
                    <th>Номер телефона</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody
            // Contacts' rows
            >
                {

                    props.contacts ? props.contacts.map(contact =>
                        <Contact
                            // Attributes
                            key={contact.id}

                            // Properties
                            ContactId={contact.id}
                            ContactName={contact.name}
                            ContactPhoneNumber={contact.phoneNumber}
                            ContactEmail={contact.email}

                            // Methods
                            // deleteContact - handle deleting contact. This method will be called from RowContact through props drilling
                            deleteContact={props.deleteContact}
                        />) : []
                }


            </tbody>
        </table>
    );
}

export default TableContact;