import BsNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {useContext} from "preact/hooks";
import {ComponentRouterContext} from "./ComponentRouter.tsx";
import Form from "./Form.tsx";
import AboutPage from "./AboutPage.tsx";

export default function Navbar() {
    const { setComponentRoute } = useContext(ComponentRouterContext);

    return (
        <BsNavbar expand="md" className="bg-body-tertiary">
            <Container fluid="xl">
                <BsNavbar.Brand href="#" onClick={() => setComponentRoute(<Form />)}>Fedi Picker</BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setComponentRoute(<AboutPage />)}>About</Nav.Link>
                        <Nav.Link href="#">Source Code</Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}
