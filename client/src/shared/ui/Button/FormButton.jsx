import { React, useState } from "react";
import ContactCreationForm from "../../../features/ContactCreationForm";
import Button from "./Button";

const FormButton = ({ style, margin, addContact, btnTextBefore, btnTextAfter }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const buttonText = isFormVisible
        ? (btnTextAfter || "Отменить")
        : (btnTextBefore || "Добавить")

    return (
        <div>
            <Button
                style={style}
                margin={margin}
                btnFunction={toggleFormVisibility}
            >
                {buttonText}
            </Button>

            {isFormVisible && (
                <ContactCreationForm
                    submitted={addContact}
                    visible={toggleFormVisibility}
                />
            )}
        </div>
    );
};

export default FormButton;
