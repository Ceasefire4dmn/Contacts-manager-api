import React, { useState } from "react";
import useContacts from "../../shared/hooks/useContacts";
import deletePcs from "./pics/delete.png";
import callPcs from "./pics/call.png";

const DeleteContactPage = () => {
    // url on base controller of the api
    const baseApiUrl = process.env.REACT_APP_API_URL;

    // url on contacts storage
    const contactsUrl = `${baseApiUrl}/contacts`;

    // dynamic update variables in the list by using useState hook
    const [deletingLog, setOperation] = useState(["", 2]);
    const [id, setId] = useState();

    const { contacts, handleDeleteContact, error } = useContacts(contactsUrl);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contact = contacts.find(contact => contact.id === id);

        if (contact) {
            // Контакт найден, выполняем удаление
            await setOperation([`Контакт ${contact.name} успешно удален!`, 0]);
            handleDeleteContact(id);
        } else {
            // Контакт не найден
            setOperation(["Такого пользователя не существует или введен неверный ID.", 1]);
        }
    }

    return (
        <div
            style={{
                justifyContent: 'space-evenly',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div
                className="card p-4 m-4"
                style={{ width: "40%" }}
            >
                <p className="display-4">
                    Удаление контакта
                </p>
                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        className="form-group"
                    // Contact's name field
                    >
                        <label htmlFor="name">
                            Введите ID контакта
                        </label>
                        <input
                            type="GUID"
                            className="form-control"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required={true}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-danger mt-3"
                    // Button for creating new contact
                    >
                        Удалить контакт
                    </button>
                
                </form>
                {
                    !error && deletingLog[1] === 1 &&
                    <div className="mt-4 alert alert-danger">
                        {deletingLog[0]}
                    </div>
                }
                {
                    !error && deletingLog[1] === 0 &&
                    <div className="mt-4 alert alert-success">
                        {deletingLog[0]}
                    </div>
                }
                {
                error && 
                    <div className="alert alert-danger mt-4">
                        {error}    
                    </div>
                }

                <img
                    src={callPcs}
                    alt="Call pic"
                    style={{ maxHeight: '300px', marginTop: '20px' }}
                />
            </div>
            <img 
                src={deletePcs} 
                alt="Delete pic" 
                style={{ maxHeight: '500px' }}    
            />
        </div>
            );
}

            export default DeleteContactPage;