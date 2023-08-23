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
    const username = useSelector(_ => _.user.username);
    const order = useSelector(_ => _.order);
    const dispatch = useDispatch();

    const [data, setData] = useState(order);
    const [note, setNote] = useState('');

    const handlePlaceOrder = async () => {
        if (!data.length) {
            alert('Please add items to place an order');
            return;
        }
        const response = await POST(CONSTANTS.PLACE_ORDER, { note, data, date: new Date(), status: 'Placed', username });
        dispatch(setLoadingTrue());
        if (response) {
            dispatch(clearCart());
            setNote('');
            alert(response);
        }
        dispatch(setLoadingFalse());
    }

    const handleRemoveItem = (removeItem) => {
        const nstate = data.filter(_ => _.name === removeItem.name ? false : true);
        setData(nstate);
        dispatch(removeFromOrder(nstate));
    }

    const handleClearCart = () => {
        setNote('');
        setData([]);
        dispatch(clearCart());
    }

    const deleteButton = (info) => <div className='flex flex-row-reverse'>
        <CustomButton severity="danger" id={info.name} label='Remove' onClick={() => handleRemoveItem(info)}
            tooltip={CONSTANTS.TOOLTIPS.REMOVE} tooltipOptions={{ position: 'left' }}
        />
    </div>

    const customerPreviewColumns = [{ field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: '', header: '', body: deleteButton }];

    useEffect(() => { setData(order) }, [order]);

    return (
        <div className="col-11">
            <div className='flex'>
                <CustomInputField id='note' label='Add Note' value={note} setter={setNote} style={{ width: '1000px' }}
                    tooltip={CONSTANTS.TOOLTIPS.NOTE} tooltipOptions={{ position: 'top' }} />

                <CustomButton id='placeOrder' label='Place Order' onClick={handlePlaceOrder} className='marginLeft5p'
                    tooltip={CONSTANTS.TOOLTIPS.PLACE_ORDER} tooltipOptions={{ position: 'left' }}
                />

                <CustomButton id='clearCard' label='Clear Cart' onClick={handleClearCart} severity="danger"
                    className='marginLeft5p'
                    tooltip={CONSTANTS.TOOLTIPS.CLEAR} tooltipOptions={{ position: 'left' }}
                />
            </div>

            <CustomTable data={data} columnHeaders={customerPreviewColumns} className={'button'} />
        </div >
    )
}
