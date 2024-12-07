import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const ContactCreationForm = ({ submitted, visible }) => {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        if (name !== "" && phoneNumber !== "" && email !== "") {
            submitted({
                ContactId: crypto.randomUUID(),
                ContactName: name,
                ContactPhoneNumber: phoneNumber,
                ContactEmail: email,
            });

            setName("");
            setPhoneNumber("");
            setEmail("");

            visible();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="form-group">
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

            <div>
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

            <div className="form-group">
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
            >
                Создать контакт
            </button>
        </form>
    );
};

export default ContactCreationForm;