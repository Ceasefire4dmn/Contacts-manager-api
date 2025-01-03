import React, { useState } from "react";
import  useVisibility from "../shared/hooks/useVisibility";
import ContactUpdatingForm from "../features/ContactUpdatingForm";
import Button from "../shared/ui/Button/Button";
import Modal from 'react-bootstrap/Modal';


const Contact = (props) => {

    const { isVisible, show, hide } = useVisibility();

    const [displayId, setDisplayId] = useState(`${props.ContactId}`.slice(0, 2));

    const toggleId = () => {

        if (displayId.length === 2) {
            setDisplayId(props.ContactId);
        } else {
            setDisplayId(`${props.ContactId}`.slice(0, 2));
        }
    };

    const isHidden = displayId.length === 2
        ? "..."
        : "Скрыть";

    return (
        <tr>
            <th>
                {displayId}
                <Button
                    style={"btn-outline-success"}
                    margin={"ms-3"}
                    btnFunction={toggleId}
                >
                    {isHidden}
                </Button>
            </th>
            <th>{props.ContactName}</th>
            <th>{props.ContactPhoneNumber}</th>
            <th>{props.ContactEmail}</th>
            <th>
                <Button
                    style={"btn-outline-success"}
                    btnFunction={() => show()}
                >
                    &#x270F;
                </Button>

                <Button
                    style={"btn-outline-danger"}
                    btnFunction={() => props.deleteContact(props.ContactId)}
                >
                    &#x1F5D1;
                </Button>
            </th>
            <Modal 
                style={{margin: "auto", alignContent: "center", }}
                show={isVisible} 
                onHide={() => hide()}
                onSubmit={() => hide()}>
                <ContactUpdatingForm contact={{id: props.ContactId, 
                                               name: props.ContactName, 
                                               phoneNumber: props.ContactPhoneNumber, 
                                               email: props.ContactEmail}}/>
            </Modal>
        </tr>

        
    );
};

export default Contact;
