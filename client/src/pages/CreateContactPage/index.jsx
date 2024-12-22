import React from "react";
import useContacts from "../../shared/hooks/useContacts";
import ContactCreationForm from "../../features/ContactCreationForm";
import paint from "./pics/paint.png";



const CreateContactPage = () => {
    // url on base controller of the api
    const baseApiUrl = process.env.REACT_APP_API_URL;

    // url on contacts storage
    const contactsUrl = `${baseApiUrl}/contacts`;

    const { handleAddContact, error } = useContacts(contactsUrl);
    return (
        <div className="m-5 p-5">
            <span
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <span className="p-5">
                <p className="display-4">
                    Создать новый контакт
                </p>
                
                    {error && <div className="alert alert-danger">{error}</div>}

                </span>    
                <ContactCreationForm
                        submitted={handleAddContact}
                        visible={() => { }}
                    />
                
                <img
                    src={paint}
                    alt="Paint image"
                    className={'m-5'}
                    style={{ maxHeight: '300px' }}
                />

            </span>
        </div>
    );
}

export default CreateContactPage;