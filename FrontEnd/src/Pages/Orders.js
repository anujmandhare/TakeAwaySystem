import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONSTANTS from '../Setup/Constants.json';
import { GET } from '../Setup/Api';
import OrderCard from '../Components/OrderCard';

export default function Orders() {

    const username = useSelector(_ => _.user.username);

    const [orders, setOrders] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [showVisible, setShowVisible] = useState(false);

    const getAllOrders = async () => {
        const data = await GET(CONSTANTS.GET_ALL_ORDERS + '?username=' + username);

        if (data) {
            setOrders(data);
            setErrorMsg('');
        } else {
            setErrorMsg('Place your first order!');
        }

    };


    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div id='ordersContainer' className="card">

            {
                orders.length ?
                    <>
                        <div id='orders' className="grid" style={{ overflowX: 'auto' }}>
                            {orders.map((_, i) => (<div key={i}></div>))}
                        </div>
                    </>
                    :
                    <>{ErrorMsg}</>
            }

        </div>
    )
}
