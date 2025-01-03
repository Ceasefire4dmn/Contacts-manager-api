import React, { useState } from "react";
import useContacts from "../shared/hooks/useContacts";
import 'bootstrap/dist/css/bootstrap.min.css';

// Component handle creation of contacts and defines is visible contact creation form or not. 
const ContactCreationForm = (props) => {
    const baseApiUrl = process.env.REACT_APP_API_URL;
    // url on contacts storage
    const contactsUrl = `${baseApiUrl}/contacts`;
    // Handle dynamic filling and empting properties of contacts by using useState hooks
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [addingLog, setOperation] = useState("");
    const { error } = useContacts(contactsUrl);
    
    // Handle creation new contact after submitting the Button "Создать контакт"
    //Check if fields are properly filled 
    const handleSubmit = (event) => {
        event.preventDefault();

        if (name !== "" && phoneNumber !== "" && email !== "") {
            props.submitted({
                id: crypto.randomUUID(),
                name: name,
                phoneNumber: phoneNumber,
                email: email,
            });

            setName("");
            setPhoneNumber("");
            setEmail("");

            props.visible();
            setOperation("Контакт удачно добавлен!");
        }
    };

    return (
        // Contact creation form
        <div
            className="mt-4"
            style={{ width: "40%" }}
        >
            <form
                onSubmit={handleSubmit}
            >
                <div
                    className="form-group"
                // Contact's name field
                >
                    <label htmlFor="name">
                        Имя контакта
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                </div>

                <div
                    className="form-group"
                // Contact's phone number field
                >
                    <label htmlFor="phoneNumber">Номер телефона</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={true}
                    />
                </div>

                <div
                    className="form-group"
                // Contact's email field
                >
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success mt-3"
                // Button for creating new contact
                >
                    Создать контакт
                </button>
            </form>
            <div>
                {
                    !error && addingLog && <div className="mt-4 alert alert-success">
                        {addingLog}
                    </div>
                }
            </div>
        </div>
    );
};

export default ContactCreationForm;