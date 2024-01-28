import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.clear();
        navigate("/");
    }; 

    return (
        <Navbar expand="lg" sticky="top" style={{
            backgroundColor: '#d2b48c'
        }}>
            <Container>
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: '60px', height: '60px'}}
                    alt="logo"
                    className='ms-3'
                />
                <Navbar.Brand href="/dealerhome" style={{
                    fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                }}>
                    AmoreeDrive
                </Navbar.Brand>

                <Navbar.Offcanvas bplacement="end">
                    <Offcanvas.Body>
                        <Nav variant="underline" className="justify-content-end flex-grow-1 pe-3 mx-3">
                            <Nav.Link href="/dealerhome" className='mx-2 text-white fw-bold'>
                                Company Cars
                            </Nav.Link>

                            <Nav.Link href="/dealerinventory" className='mx-2 text-white fw-bold'>
                                Inventory
                            </Nav.Link>

                            <Nav.Link href="/dealersales" className='mx-2 text-white fw-bold'>
                                Sales
                            </Nav.Link>

                            <Button variant='outline-light' className='ms-2 fw-bold' onClick={logout}>Logout</Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default UserNavbar;