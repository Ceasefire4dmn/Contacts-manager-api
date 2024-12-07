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
                <button type="button" className="btn btn-light ms-3" onClick={toggleId}>
                    {displayId.length === 2 ? "..." : "Скрыть"}
                </button>
            </th>
            <th>{props.ContactName}</th>
            <th>{props.ContactEmail}</th>
        </tr>
    );
};

export default RowContact;
