import React from "react";

const Header = (props) =>
{
    return (
        <div>
            <h2 className={`card-header text-center ${props.margin || "m-5"}`}>
            {props.text || "Список контактов"}
            </h2>
        </div>
    );
};

export default Header;