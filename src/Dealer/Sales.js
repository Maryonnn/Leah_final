import { Table, Container, Button } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from '../Supabase_Client/SBClient.js';
import { useState, useEffect, useCallback } from 'react';

function UserPurchase(){
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [topCars, setTopCars] = useState([]);
    const dealer_name = localStorage.getItem('dealer_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
          const { data, error } = await supabase
            .from('sales')
            .select('*')
            .eq('dealer_name', dealer_name);

            if (error) {
                throw error;
            } 
            setPurchaseHistory(data);
        } catch (error) {
          console.error('Error during fetching purchase history:', error.message);
        }
    }, [dealer_name]);

    const handleShowTopCars = () => {
        const carCountMap = {};
        purchaseHistory.forEach((purchase) => {
            carCountMap[purchase.car_name] = (carCountMap[purchase.car_name] || 0) + 1;
        });
        const sortedCars = Object.keys(carCountMap).sort((a, b) => carCountMap[b] - carCountMap[a]).slice(0, 3);
        const topCarsData = sortedCars.map((carName) => ({
            carName,
            count: carCountMap[carName],
        }));
        setTopCars(topCarsData);
    };
    
    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return(
        <>
            <DealerNavbar />
            <Container className='mt-5'>
                <Table responsive="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>CUSTOMER</th>
                            <th>CAR</th>
                            <th>STYLE</th>
                            <th>COLOR</th>
                            <th>ENGINE</th>
                            <th>PRICE</th>
                            <th>TRANSMISSION</th>
                            <th>VIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr>
                                <td>{purchase.customer_name}</td>
                                <td>{purchase.car_name}</td>
                                <td>{purchase.car_style}</td>
                                <td>{purchase.car_color}</td>
                                <td>{purchase.car_engine}</td>
                                <td>{purchase.car_price}</td>
                                <td>{purchase.transmission_type}</td>
                                <td>{purchase.vin}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button
                    onClick={handleShowTopCars}
                    className="mb-1 mt-5"
                    style={{
                        backgroundColor: '#d2b48c',
                        borderColor: '#CCB3A3',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Show Top 3 Cars
                </Button>
            </Container>
            <Container className='mt-1'>
                <Table responsive="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>VEHICLE MODEL</th>
                            <th>SALES COUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCars.map((car) => (
                            <tr key={car.carName}>
                                <td>{car.carName}</td>
                                <td>{car.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserPurchase;