import { Table, Container } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from '../Supabase_Client/SBClient.js';
import { useState, useEffect, useCallback } from 'react';

function UserPurchase(){
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const dealer_name = localStorage.getItem('dealer_name');
    const [topCars, setTopCars] = useState([]);

    const fetchPurchaseHistory = useCallback(async () => {
        try {
          const { data, error } = await supabase
            .from('sales')
            .select('*')
            .eq('dealer_name', dealer_name)
            .order('car_name', { descending: false });

            if (error) {
                throw error;
            } 
            setPurchaseHistory(data);
        } catch (error) {
          console.error('Error during fetching purchase history:', error.message);
        }
    }, [dealer_name]);

    const handleShowTopCars = useCallback(async () => {
        try {
            const dealer_name = localStorage.getItem("dealer_name");
            console.log(dealer_name);
            const { data, error } = await supabase
                .rpc('fetch_vehicle_sales', {dealer_name: dealer_name});
                console.log(data);

            if (error) {
                throw error;
            }
            setTopCars(data);
        } catch (error) {
            console.error('Error during fetching top cars:', error.message);
        }
    }, []);
    
    useEffect(() => {
        handleShowTopCars();
        fetchPurchaseHistory();
    }, [handleShowTopCars, fetchPurchaseHistory]);

    return (
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
                        {purchaseHistory.map((purchase, index) => (
                            <tr key={index}>
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
            </Container>
            <Container className='mt-5'>
                <Table responsive="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>VEHICLE MODEL</th>
                            <th>SALES COUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCars.slice(0,3).map((car, index) => (
                            <tr key={index}>
                                <td>{car.car_name}</td>
                                <td>{car.sales_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserPurchase;