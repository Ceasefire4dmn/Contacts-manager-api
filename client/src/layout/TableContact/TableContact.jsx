import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import RowContact from "../components/RowContact";



function TableContact(props) {
    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя контакта</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.contacts.map(contact => <RowContact key={contact.ContactId}
                        ContactId={contact.ContactId}
                        ContactName={contact.ContactName}
                        ContactEmail={contact.ContactEmail}
                    />)
                }
            </tbody>
        </table>
    );
}

export default TableContact;