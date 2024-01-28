import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#d2b48c' }}>
            <Container>
                <Navbar.Brand href="/userhome" style={{
                    fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                }}>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '60px', height: '60px' }}
                        alt="logo"
                        className='ms-3'
                    />
                    AmoreeDrive
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" variant="underline">
                        <Nav.Link href="/userhome" className='mx-2 text-white fw-bold'>
                            Vehicles
                        </Nav.Link>

                        <Nav.Link href="/userpurchase" className='mx-2 text-white fw-bold'>
                            Purchases
                        </Nav.Link>

                        <Nav.Link href="/profile" className='mx-2 text-white fw-bold'>
                            Profile
                        </Nav.Link>

                        <Button variant='outline-light' className='ms-2 fw-bold' onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default UserNavbar;
