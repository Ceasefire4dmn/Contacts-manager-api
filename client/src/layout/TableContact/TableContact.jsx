import React from 'react'; 
import "bootstrap/dist/css/bootstrap.min.css";
import RowContact from "../components/RowContact";



function TableContact(props) {
    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя контакта</th>
                    <th>Номер телефона</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.contacts.map(contact => 
                    <RowContact 
                        // Attributes
                        key={contact.ContactId}
                        
                        // Properties
                        ContactId={contact.id}
                        ContactName={contact.name}
                        ContactPhoneNumber={contact.phoneNumber}
                        ContactEmail={contact.email}
                        
                        // Methods:
                        // deleteContact - method for deleting contact which will be called from RowContact
                        deleteContact={props.deleteContact}
                    />)
                }
            </tbody>
        </table>
    );
}

export default TableContact;