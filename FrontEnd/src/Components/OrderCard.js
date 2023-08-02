import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux';

import CustomButton from './CustomButton';
import CustomSingleSelect from './CustomSingleSelect';
import CustomInputField from './CustomInputField';
import CustomTable from './CustomTable';
import CONSTANTS from '../Setup/Constants.json';
import { POST } from '../Setup/Api';

export default function OrderCard({ data, note, dstatus, dfeedback, date, username, className = '', showpop, id,
    getAllOrders, ...rest }) {

    const user = useSelector(_ => _.user);

    const [readOnly, setReadOnly] = useState(true);
    const [status, setStatus] = useState({ name: dstatus });
    const [feedback, setFeedback] = useState('');

    const dd = date.slice(0, 10);
    const tt = new Date(date).toLocaleTimeString().substring(0, 5);
    const totalPrice = data.reduce((acc, ele) => ele.price + acc, 0);

    const customerColumns = [{ field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' }];

    const statusArray = [{ name: 'Preparing', code: 'Preparing' },
    { name: 'Prepared', code: 'Prepared' },
    { name: 'Delivered', code: 'Delivered' }]

    const handleEdit = () => {
        setReadOnly(!readOnly);
    }


    const updateStatus = async ({ st }) => {
        const sts = st ? st : status?.name;
        const feedback1 = feedback ? feedback : undefined;
        const data = await POST(CONSTANTS.UPDATE_STATUS, { id, status: sts, feedback: feedback1 });
        if (data) {
            alert(data);
            setReadOnly(true);
            getAllOrders();
        }
    }


    const footer = (info) => (
        <>
            {!readOnly ? <CustomSingleSelect options={statusArray} value={status} setter={setStatus} id='status' label='Status'
                style={{ minWidth: '100%' }} /> : <></>}

            {!dfeedback && user.role === 'Customer' && dstatus === 'Delivered' ?
                <CustomInputField id='feedback' label='Feedback' value={feedback} setter={setFeedback}
                    className={'input'} style={{ width: '100%' }} />
                : <></>}

            <div id={'buttondiv' + info.id} className="flex flex-wrap justify-content-end button" >

                {user.role === 'Staff' && dstatus === 'Placed' ? <CustomButton id={'buttondecling' + info.id} label={'Decline'}
                    icon="pi pi-check" onClick={() => updateStatus({ st: 'Declined' })} severity='warning' size='small' /> : <></>}

                {user.role === 'Staff' && dstatus !== 'Delivered' && dstatus !== 'Declined' ? <CustomButton id={'buttonedit' + info.id} label={readOnly ? "Edit Status" : 'Cancel'}
                    icon="pi pi-check" onClick={handleEdit} className='marginLeft5p' severity='danger' size='small' /> : <></>}

                {!readOnly ? <CustomButton id={'savebutton' + info.id} label="Update" icon="pi pi-check" onClick={updateStatus}
                    className='marginLeft5p' size='small' /> : <></>}

                {user.role === 'Customer' && dstatus === 'Delivered' && !dfeedback ?
                    <CustomButton id={'savebutton' + info.id} label="Update" icon="pi pi-check" onClick={updateStatus}
                        className='marginLeft5p' size='small' /> : <></>}
            </div >
        </>
    );

    useEffect(() => {
        setStatus({ name: dstatus });
    }, [dstatus])


    return (
        <div id={id} className="col-4">
            <Card id='orderCard' title={username} subTitle={'Order Status: ' + dstatus} className={className} footer={footer} {...rest}>

                <div><span>Date: {dd} </span><span style={{ marginLeft: '10px' }}></span><span>  Time: {tt}</span></div>

                <hr />

                <CustomTable data={data} columnHeaders={customerColumns} className='col-12' />
                <div className='flex flex-row-reverse' style={{ fontWeight: 'bold' }}>
                    <div style={{ width: '15%' }}></div>Total: {totalPrice}£</div>

                <hr />

                {note ? <div className='button'>Note: {note}</div> : <></>}
                {dfeedback ? <div className='button'>Feedback: {dfeedback}</div> : <></>}
            </Card>
        </div >
    )
}
