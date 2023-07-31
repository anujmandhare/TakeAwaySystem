import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeFromOrder, clearCart } from '../Redux/Order';
import { setLoadingTrue, setLoadingFalse } from '../Redux/User';
import CONSTANTS from '../Setup/Constants';
import { POST } from '../Setup/Api';
import CustomTable from '../Components/CustomTable';
import CustomButton from '../Components/CustomButton';
import CustomInputField from '../Components/CustomInputField';

export default function OrderPreview({ name, price, ingredients, className = '', ...rest }) {

    const order = useSelector(_ => _.order);
    const dispatch = useDispatch();

    const [data, setData] = useState(order);
    const [note, setNote] = useState('');

    const handlePlaceOrder = async () => {
        const response = await POST(CONSTANTS.PLACE_ORDER, { note, data, date: new Date(), status: 'placed' });
        dispatch(setLoadingTrue());
        if (response) {
            alert(response);
        }
        dispatch(setLoadingFalse());
    }

    const handleDataChange = (removeItem) => {
        const nstate = data.filter(_ => _.name === removeItem.name ? false : true);
        setData(nstate);
        dispatch(removeFromOrder(nstate));
    }

    const handleClearCart = () => {
        setData([]);
        dispatch(clearCart());
    }

    useEffect(() => { setData(order) }, [order]);

    return (
        <div className="col-11">
            <div className='flex' >
                <CustomInputField id='note' label='Add Note' value={note} setter={setNote} />
                <CustomButton id='placeOrder' label='Place Order' onClick={handlePlaceOrder} className='marginLeft5p' />
                <CustomButton id='clearCard' label='Clear Cart' onClick={handleClearCart} severity="danger" className='marginLeft5p' />
            </div >

            <CustomTable data={data} handleRemoveItem={handleDataChange} className={'button'} />
        </div >
    )
}
