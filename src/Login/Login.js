import supabase from '../Supabase_Client/SBClient.js';
import { Container, Row, Col, Card, Button, Form, InputGroup, FloatingLabel, Spinner } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const Customer = async () => {
        try {
            const { data } = await supabase
                .from('customer')
                .select('*')
                .eq('email', email)
                .single();

            if (data && data.password === password) {
                console.log('Login successful');
                console.log(data);
                const user = data.user_name;
                localStorage.setItem('user_name', user);
                console.log(user);
                navigate("/userhome");
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const Dealer = async () => {
        try {
            const { data } = await supabase
                .from('dealer')
                .select('*')
                .eq('email', email)
                .single();

            if (data && data.password === password) {
                const dealer = data.dealer_name;
                localStorage.setItem('dealer_name', dealer);
                navigate("/dealerhome")
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleClick = () => {
        if (userType === "customer") {
            Customer(); 
        } 
        else {
           Dealer();
        }
        setLoading(true);
    }

    return (
        <Container className="p-5 my-3">
            <Card style={{ 
                padding: '50px 50px', 
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
            }}>
                <Row>
                    <Col md='6'>
                        <Card.Body className='d-flex flex-column'>
                            <div className="text-center">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: '185px' }}
                                    alt="logo"
                                />
                                <h4 className="mt-1 mb-5 pb-1">Welcome to AmoreeDrive</h4>
                            </div>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><MdOutlineAlternateEmail /></InputGroup.Text>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                                </FloatingLabel>    
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><RiLockPasswordFill/></InputGroup.Text>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                </FloatingLabel>
                            </InputGroup>

                            <Row className="g-2">
                                <Col sm={4}>
                                    <FloatingLabel label="Login as :">
                                        <Form.Select value={userType} onChange={(e)=>setUserType(e.target.value)} aria-label="Floating label select example">
                                            <option value="customer">Customer</option>
                                            <option value="dealer">Dealer</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col>
                                    <Button onClick={handleClick} style={{
                                        width: '341px ', 
                                        height: '57px',
                                        background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
                                    }}>
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </>
                                        ) : "Login"}
                                    </Button>
                                </Col>

                                <div className="d-flex mb-4 mt-5 justify-content-center">
                                    <p>Don't have an account?</p>
                                    <a href='#register' className='mx-2' style={{
                                        textDecoration: 'none',
                                        backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        display: 'inline-block'
                                    }}>
                                        Create New
                                    </a>
                                </div>
                            </Row>
                        </Card.Body>
                    </Col>

                    <Col md='6'>
                        <div className="d-flex flex-column justify-content-center h-100 mb-4" style={{
                            background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            height: '100vh !important'
                        }}>
                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 className="mb-4">We're more than just a car company</h4>
                                <p className="small mb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Login;
