import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ThemeChangeButton from '../shared/ui/Button/ThemeChangeButton';
import "../App.css";

const NavMenu = () => {
    return (
        <Navbar expand="xxl" className="bg-body-tertiary container-3">
            <Container fluid>
                <Navbar.Brand href="#">Contact Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-2"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/contacts">Contact List</Nav.Link>
                        <NavDropdown title="Action" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/contacts/createContact">Create new contact</NavDropdown.Item>
                            <NavDropdown.Item href="/contacts/updateContact">
                                Update contact
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/contacts/deleteContact">
                                Delete contact
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/about">
                            About
                        </Nav.Link>
                    </Nav>
                    <span style={{display: "flex" }}>
                        <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        
                    </Form>
                    <ThemeChangeButton style='btn' />
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;