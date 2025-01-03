import React  from "react";
import useVisibility from "../../hooks/useVisibility";
import ContactCreationForm from "../../../features/ContactCreationForm";
import Button from "./Button";

const FormButton = ({ style, margin, addContact, btnTextBefore, btnTextAfter }) => {

    const { isVisible, toggle } = useVisibility();

    const buttonText = isVisible
        ? (btnTextAfter || "Отменить")
        : (btnTextBefore || "Добавить")

    return (
        <div>
            <Button
                style={style}
                margin={margin}
                btnFunction={toggle}
            >
                {buttonText}
            </Button>

            {isVisible && (
                <ContactCreationForm
                    submitted={addContact}
                    visible={toggle}
                />
            )}
        </div>
    );
};

export default FormButton;
