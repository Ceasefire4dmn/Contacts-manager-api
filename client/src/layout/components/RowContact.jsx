import React, { useState } from "react";

const RowContact = (props) => {

    const [displayId, setDisplayId] = useState(props.ContactId.toString().slice(0, 2));

    const toggleId = () => {

        if (displayId.length === 2) {
            setDisplayId(props.ContactId);
        } else {
            setDisplayId(props.ContactId.toString().slice(0, 2));
        }
    };

    return (
        <tr>
            <th>
                
                {displayId}

                <button
                    type="button"
                    className="btn btn-outline-success ms-3"
                    onClick={toggleId}
                >
                    {displayId.length === 2
                        ? "..."
                        : "Скрыть"
                    }
                </button>
            </th>
            <th>{props.ContactName}</th>
            <th>{props.ContactPhoneNumber}</th>
            <th>{props.ContactEmail}</th>
            <th>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => props.deleteContact(props.ContactId)}
                >
                    &#x1F5D1;
                </button>
            </th>
        </tr>
    );
};

export default RowContact;
