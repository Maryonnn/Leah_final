import { Table, Container } from 'react-bootstrap';
import supabase from '../Supabase_Client/SBClient.js';
import UserNavbar from "./UserNavbar.js";
import { useState, useEffect, useCallback } from 'react';

function FormatDate(dateString){
    const dateObject = new Date(dateString);
    const options = {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        year: 'numeric'
    };
    return dateObject.toLocaleDateString(undefined, options);
};

function UserPurchase(){
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const customer_name = localStorage.getItem('customer_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
          const { data, error } = await supabase
            .from('purchase')
            .select('*')
            .eq('customer_name', customer_name);

            if (error) {
                throw error;
            } 
            setPurchaseHistory(data);
        } catch (error) {
          console.error('Error during fetching purchase history:', error.message);
        }
    }, [customer_name]);
    
    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return(
        <>
            <UserNavbar />
            <Container className='mt-5'>
                <Table responsive="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th>CAR</th>
                            <th>COLOR</th>
                            <th>ENGINE</th>
                            <th>PRICE</th>
                            <th>STYLE</th>
                            <th>TRANSMISSION</th>
                            <th>VIN</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr>
                            <td>{purchase.car_name}</td>
                            <td>{purchase.car_color}</td>
                            <td>{purchase.car_engine}</td>
                            <td>{purchase.car_price}</td>
                            <td>{purchase.car_style}</td>
                            <td>{purchase.transmission_type}</td>
                            <td>{purchase.vin}</td>
                            <td>{FormatDate(purchase.created_at)}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserPurchase;