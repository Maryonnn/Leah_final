import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar.js";
import { Col, Row, Card, Container, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import supabase from '../Supabase_Client/SBClient.js';

function UserProducts(){
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(""); 
    const [maxPrice, setMaxPrice] = useState("");

    const all = async () => {
        try {
            const { data } = await supabase
            .from('inventory')
            .select('*')
            console.log(data);
            setCarData(data);
        } 
        catch (error) {
          console.error('Error during login:', error.message);
        }
    };

    useEffect(() => {
        all();
    }, []); 

    const handleLogin = async (dealer_name) => {
        try {
            if (dealer_name === 'All') {
                all();
            } else {
                const { data } = await supabase
                .from('inventory')
                .select('*')
                .eq('dealer_name', dealer_name)
                setCarData(data);
            }
        } catch (error) {
          console.error('Error during login:', error.message);
        }
    };

    const onClickBuyNow = (car) => {
        const { dealer_name, car_name, car_style, price, vin,image_path } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('vin', vin);
        localStorage.setItem('image_path', image_path);
        navigate('/userconfirm');
    };

    const handleFilterPrices = () => {
        const filtered = carData.filter((car) => {
            const carPrice = parseInt((car.price));
            return carPrice >= parseInt(minPrice) && carPrice <= parseInt(maxPrice);
        });
        setCarData(filtered);
    }

    return(
        <>
            <UserNavbar />
            {error && <p>{error}</p>}
            <Container style={{ display: 'flex' }}>

                <Form className="d-flex justify-content-start mt-5 me-2 w-100" style={{
                    width: '100%'
                }}>
                    <Form.Control
                        type="search"
                        placeholder="Search model. . ."
                        className="me-2 w-50"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                    
                    <div>
                        <FloatingLabel controlId="floatingSelect" label="Select Brand" className="me-3">
                            <Form.Select aria-label="Floating label select example" onChange={e => handleLogin(e.target.value)}>
                                <option onClick={all}>All</option>
                                <option value='Dodge'>Dodge</option>
                                <option value='Nissan'>Nissan</option>
                                <option value='Mercedenz-benz'>Mercedenz-benz</option>
                                <option value='Geely'>Geely</option>
                                <option value='MG'>MG</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                </Form>

                <Form className="d-flex justify-content-end mt-5 w-50">
                    <Form.Control
                        type="text"
                        placeholder="min price"
                        value={minPrice}
                        className="me-2"
                        onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="max price"
                        className="me-3"
                        value={maxPrice}
                        onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                </Form>

                <div className="d-flex justify-content-end mt-5">
                    <Button 
                        variant="outline-dark" 
                        onClick={handleFilterPrices}
                        style={{
                            borderColor: '#d2b48c',
                            borderWidth: '3px',
                            transition: 'background-color 0.3s ease',
                            fontWeight: 'bold'
                        }} 
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2b48c'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        Apply
                    </Button>
                </div>

            </Container>

            {carData && (
                <Container className='mt-4' style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))',
                    gridGap: '10px',
                    justifyItems: 'center',
                    paddingLeft: '60px'
                }}>
                    {carData.filter(car => car.car_name.toLowerCase().includes(searchTerm.toLowerCase())).map((car) => (
                        <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
            )}
        </>
    );

    function CarCard({ car, onClickBuyNow }) {
        const { car_name, price, image_path, stocks, dealer_name } = car;
        
        const handleBuyNowClick = () => {
            onClickBuyNow(car);
        };
      
        return (
            <>
                <Container>
                    <div className="mb-4">
                        <Card style={{ 
                            maxWidth: '540px', 
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                            padding: '20px 20px'
                        }}>
                            <Row>
                                <Col sm={7}>
                                    <Card.Img src={image_path} style={{
                                        height: '200px',
                                        objectFit: 'cover'
                                    }} 
                                />
                                </Col>

                                <Col sm={5}>
                                    <Card.Title className="mt-2 mb-2">{dealer_name} {car_name}</Card.Title>
                                    <Card.Text>Price: {price}<br/>Stocks: {stocks}</Card.Text>
                                    <Button 
                                        variant="outline-dark"
                                        style={{
                                            borderColor: '#d2b48c',
                                            borderWidth: '3px',
                                            transition: 'background-color 0.3s ease',
                                            fontWeight: 'bold'
                                        }} 
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2b48c'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        onClick={handleBuyNowClick}
                                    >
                                        Check out
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Container>
            </>
        );
    }
}
export default UserProducts;