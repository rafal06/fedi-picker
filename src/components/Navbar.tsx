import BsNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Navbar() {
    return (
        <BsNavbar expand="md" className="bg-body-tertiary">
            <Container fluid="xl">
                <BsNavbar.Brand>Fedi Picker</BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">About</Nav.Link>
                        <Nav.Link href="#">Source Code</Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}
