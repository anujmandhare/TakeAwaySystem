import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeFromOrder, clearCart } from '../Redux/Order';
import { setLoadingTrue, setLoadingFalse } from '../Redux/User';
import CONSTANTS from '../Setup/Constants';
import { POST } from '../Setup/Api';
import CustomTable from '../Components/CustomTable';
import CustomButton from '../Components/CustomButton';
import CustomInputField from '../Components/CustomInputField';
import CustomCalendar from '../Components/CustomCalendar';
import CustomPopup from '../Components/CustomPopup';

export default function OrderPreview({ name, price, ingredients, className = '', ...rest }) {
    const username = useSelector(_ => _.user.username);
    const order = useSelector(_ => _.order);
    const dispatch = useDispatch();

    const [data, setData] = useState(order);
    const [note, setNote] = useState('');
    const [dateTime, setDateTime] = useState('');

    const [popup, setPopup] = useState(false);
    const openPopup = async () => {
        if (!data.length) {
            alert('Please add items to place an order');
            return;
        }

        setPopup(true);
    }

    const handlePlaceOrder = async () => {
        const newDate = dateTime ? new Date(dateTime) : new Date();

        const response = await POST(CONSTANTS.PLACE_ORDER, { note, data, date: newDate, status: dateTime ? 'Scheduled' : 'Placed', username });
        dispatch(setLoadingTrue());
        if (response) {
            dispatch(clearCart());
            setNote('');
            setDateTime('');
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
        setDateTime('');
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
    { field: 'quantity', header: 'Quantity' },
    { field: 'price', header: 'Price' },
    { field: '', header: '', body: deleteButton }];

    useEffect(() => { setData(order) }, [order]);

    return (
        <div className="col-11">
            <div className='flex'>
                <CustomInputField id='note' label='Add Note' value={note} setter={setNote} style={{ width: '1000px' }}
                    tooltip={CONSTANTS.TOOLTIPS.NOTE} tooltipOptions={{ position: 'top' }} />

                <CustomButton id='placeOrder' label='Place Order' onClick={openPopup} className='marginLeft5p'
                    tooltip={CONSTANTS.TOOLTIPS.PLACE_ORDER} tooltipOptions={{ position: 'left' }}
                />

                <CustomButton id='clearCard' label='Clear Cart' onClick={handleClearCart} severity="danger"
                    className='marginLeft5p'
                    tooltip={CONSTANTS.TOOLTIPS.CLEAR} tooltipOptions={{ position: 'left' }}
                />
            </div>

            <div className='flex'>
                <CustomCalendar showTime={true} hourFormat={'24'} value={dateTime} setter={setDateTime}
                    id='dateTime' label='Future Order Date & Time' style={{ minWidth: '300px' }}
                />
            </div>

            <CustomTable data={data} columnHeaders={customerPreviewColumns} className={'button'} />
            <CustomPopup header='Confirmation' message="Do you want to proceed and place the order?"
                singleButton={false} callback={handlePlaceOrder} visible={popup} toggle={setPopup}
            />
        </div >
    )
}
