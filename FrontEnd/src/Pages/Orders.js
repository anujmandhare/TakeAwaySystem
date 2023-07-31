import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONSTANTS from '../Setup/Constants.json';
import { GET } from '../Setup/Api';
import MenuItemCard from '../Components/MenuItemCard';

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
        <div className="card">

            {
                orders.length ?
                    <>
                        <div className="grid" style={{ overflowX: 'auto' }}>
                            {orders.map((_, i) => <MenuItemCard id={_.name + i} name={_.name} price={_.price} ingredients={_.ingredients} showpop={setShowVisible} />)}
                        </div>
                    </>
                    :
                    <>{ErrorMsg}</>
            }

        </div>
    )
}
