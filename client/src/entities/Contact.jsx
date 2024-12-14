import React, { useState } from "react";
import Button from "../shared/ui/Button/Button";

const Contact = (props) => {

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
                    btnFunction={() => props.deleteContact(props.ContactId)}
                >
                    &#x1F5D1;
                </Button>
            </th>
        </tr>
    );
};

export default Contact;
