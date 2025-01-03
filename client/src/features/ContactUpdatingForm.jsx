import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useContacts from "../shared/hooks/useContacts";

const ContactUpdatingForm = ( props ) => {

    const baseApiUrl = process.env.REACT_APP_API_URL;
    const contactsUrl = `${baseApiUrl}/contacts`;

    const { handleUpdateContact, error } = useContacts(contactsUrl);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(name, value, formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        handleUpdateContact(props.contact.id, formData);

        // Очистка формы
        setFormData({
            name: "",
            email: "",
            phoneNumber: "",
        });
    };

    return (
        <div style={{display: "flex", 
                    flexDirection: "column", 
                    padding: "20px",   
                    gap: "30px", 
                    justifyContent: "center"
                    }}>
            <h1 className="text-success" 
                style={{textAlign: "center"}}
            >
                    Changing Contact <br/> 
                    { props.contact.name }
            </h1>
            <Form onSubmit={handleSubmit}>
                <Accordion defaultActiveKey="0">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Change name</Accordion.Header>
                            <Accordion.Body>
                                <Form.Label>Previous contact name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.contact.name}
                                    aria-label="Disabled input example"
                                    readOnly
                                />
                                <Form.Label>Contact name</Form.Label>
                                <Form.Control type="text" 
                                              name="name"
                                              value={formData.name}
                                              onChange={handleChange} 
                                              placeholder="Enter new name" 
                                               />
                                <Form.Text className="text-muted">
                                    Example: Daniel Smith
                                </Form.Text>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Change phone number</Accordion.Header>
                            <Accordion.Body>
                                <Form.Label>Previous phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.contact.phoneNumber}
                                    aria-label="Disabled input example"
                                    readOnly
                                />
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="phone" 
                                              name="phoneNumber"
                                              value={formData.phoneNumber}
                                              onChange={handleChange}
                                              placeholder="Enter new phone number"
                                              />
                                <Form.Text className="text-muted">
                                    Example: +1 (647) 123-4567
                                </Form.Text>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Change email</Accordion.Header>
                            <Accordion.Body>
                                <Form.Label>Previous email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.contact.email}
                                    aria-label="Disabled input example"
                                    readOnly
                                />
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" 
                                              name="email"                                    value={formData.email}
                                              onChange={handleChange} 
                                              placeholder="Enter new email" 
                                             />
                                <Form.Text className="text-muted">
                                    Example: example123@domain.com
                                </Form.Text>
                            </Accordion.Body>
                        </Accordion.Item>  
                    </Form.Group>

            
                    <Button variant="btn btn-success" type="submit">
                        Обновить контакт
                    </Button>
                </Accordion>
                {
                    error && 
                    <div className="alert alert-danger mt-4">
                        {error}
                    </div>
                }
            </Form>
        </div>
    );
};

export default ContactUpdatingForm;