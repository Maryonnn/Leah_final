import { useState } from 'react';
import supabase from '../Supabase_Client/SBClient.js';
import UserNavbar from './UserNavbar.js';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

function BuyNow(){
    const [error, setError] = useState(null);
    const [carColor, setCarColor] = useState('Red');
    const [carEngine, setCarEngine] = useState('v4');
    const [transmissionType, setTransmissionType] = useState('Automatic');
    const navigate = useNavigate();

    const customer_name = localStorage.getItem('customer_name');
    const car_name = localStorage.getItem('car_name');
    const car_style = localStorage.getItem('car_style');
    const car_price = localStorage.getItem('price');
    const image_path = localStorage.getItem('image_path');
    const vin = localStorage.getItem('vin');
    const dealer_name = localStorage.getItem('dealer_name');

    const deduct = async () => {
        const car_name = localStorage.getItem('car_name');
        const { data } = await supabase
        .from('inventory')
        .select('*')
        .eq('car_name', car_name)
        .single();

        console.log(data);
        const newstocks = data.stocks;
        localStorage.setItem('newstocks', newstocks);

        try {
            const deductedstocks = localStorage.getItem('newstocks')
            let newStocks = parseInt(deductedstocks) - 1;
            const { data } = await supabase
            .from('inventory')
            .update({ 'stocks': newStocks })    
            .eq('car_name', car_name);
            console.log(data);
            buyconfirm();
        } 
        catch(error) {
            console.error('Error during login:', error.message); 
        }
    }

    const buyconfirm = async () => {
        try {
            const { data } = await supabase
            .from('purchase')
            .insert([
                {
                    customer_name,
                    car_name,
                    car_style,
                    car_price,
                    image_path,
                    car_color: carColor,
                    car_engine: carEngine,
                    transmission_type: transmissionType,
                    vin,
                },
            ])
            .select();
    
            console.log(data);
            alert('Order Successful');
            dealersales();
            navigate('/userpurchase');
        } 
        catch (error) {
          console.error('Error during login:', error.message);
          setError(error.message);
        }
    };

    const dealersales = async () => {
        try {
            const { data } = await supabase
            .from('sales')
            .insert([
                {
                    dealer_name,
                    customer_name,
                    car_name,
                    car_style,
                    car_price,
                    image_path,
                    car_color: carColor,
                    car_engine: carEngine,
                    transmission_type: transmissionType,
                    vin,
                },
            ])
            .select();
    
            console.log(data);
        } 
        catch (error) {
          console.error('Error during login:', error.message);
          setError(error.message);
        }
    };

    return(
        <>
            <UserNavbar />
            <Container>
                <Card className='mt-5' style={{ 
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    padding: '20px 20px'
                }}>
                    <Row>
                        <Col><Card.Img src={image_path}/></Col>
                        <Col>
                            <div>
                                <Card.Title className="mt-3">{dealer_name} {car_name}</Card.Title>
                                <Card.Title className="mt-1">{car_price}</Card.Title><br/>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingSelectGrid"
                                                label="Choose car color : "
                                            >
                                                <Form.Select value={carColor} onChange={(e) => setCarColor(e.target.value)} aria-label="Floating label select example">
                                                    <option value="C1">C1</option>
                                                    <option value="C2">C2</option>
                                                    <option value="C3">C3</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingSelectGrid"
                                                label="Transmission type : "
                                            >
                                                <Form.Select value={carEngine} onChange={(e) => setCarEngine(e.target.value)} aria-label="Floating label select example">
                                                    <option value="Automatic">Automatic</option>
                                                    <option value="Manual">Manual</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Row>
                                            <Col>
                                                <FloatingLabel
                                                    className="mt-3 mb-4"
                                                    controlId="floatingSelectGrid"
                                                    label="Car Engine : "
                                                >
                                                    <Form.Select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)} aria-label="Floating label select example">
                                                        <option value="v4">v4</option>
                                                        <option value="v6">v6</option>
                                                        <option value="v8">v8</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Card.Text>
                                <div style={{
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center'
                                }}>
                                    <Button 
                                        variant="outline-dark" 
                                        className="check-out w-50"
                                        onClick={deduct}
                                        style={{
                                            height: "55px",
                                            borderColor: '#d2b48c',
                                            borderWidth: '3px',
                                            transition: 'background-color 0.3s ease',
                                            fontWeight: 'bold'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2b48c'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                                {error && <p>{error}</p>}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
}

export default BuyNow;