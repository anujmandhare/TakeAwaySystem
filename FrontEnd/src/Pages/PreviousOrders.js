import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CONSTANTS from '../Setup/Constants.json';
import { GET } from '../Setup/Api';
import OrderCard from '../Components/OrderCard';

export default function Orders() {

    const username = useSelector(_ => _.user.username);

    const [orders, setOrders] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');

    const getAllOrders = async () => {
        const data = await GET(CONSTANTS.GET_ALL_ORDERS + '?username=' + username);

        if (data) {
            const ndata = data.filter(ele => ele.status === 'Delivered' || ele.status === 'Cancelled');
            setOrders(ndata);
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
                            {orders.map((_, i) => (<OrderCard key={i} note={_.note} data={_.data} username={_.username}
                                date={_.date} dstatus={_.status} id={_._id} dfeedback={_.feedback} getAllOrders={getAllOrders} />))}
                        </div>
                    </>
                    :
                    <>{ErrorMsg}</>
            }

        </div>
    )
}
