import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux';

import CustomButton from './CustomButton';
import CustomSingleSelect from './CustomSingleSelect';
import CustomInputField from './CustomInputField';
import CustomTable from './CustomTable';
import CONSTANTS from '../Setup/Constants.json';
import { POST } from '../Setup/Api';
import { Tooltip } from 'primereact/tooltip';
import CustomPopup from '../Components/CustomPopup';

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
    { field: 'quantity', header: 'Quantity' },
    { field: 'price', header: 'Price' }];

    const statusArray = [{ name: 'Preparing', code: 'Preparing' },
    { name: 'Prepared', code: 'Prepared' },
    { name: 'Delivered', code: 'Delivered' }]

    const handleEdit = () => {
        setReadOnly(!readOnly);
    }

    const [popup, setPopup] = useState(false);
    const openPopup = async () => {
        setPopup(true);
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
            {!readOnly ?
                <CustomSingleSelect options={statusArray} value={status} setter={setStatus} id='status' label='Status'
                    style={{ minWidth: '100%' }} tooltip="Order Status"
                />
                :
                <></>
            }

            {!dfeedback && user.role === 'Customer' && dstatus === 'Delivered' ?
                <CustomInputField id='feedback' label='Feedback' value={feedback} setter={setFeedback}
                    className={'input'} style={{ width: '100%' }}
                    tooltip="Customer Feedback"
                />
                :
                <></>
            }

            <div id={'buttondiv' + info.id} className="flex flex-wrap justify-content-end button" >

                {user.role === 'Staff' && dstatus === 'Placed' ?
                    <CustomButton id={'buttondecling' + info.id} label={'Decline'}
                        onClick={() => updateStatus({ st: 'Declined' })} severity='danger' size='small'
                        tooltip={CONSTANTS.TOOLTIPS.DECLINE}
                    />
                    :
                    <></>
                }

                {user.role === 'Staff' && dstatus !== 'Delivered' && dstatus !== 'Declined' && dstatus !== 'Cancelled' && dstatus !== 'Scheduled' ?
                    <CustomButton id={'buttonedit' + info.id} label={readOnly ? "Edit Status" : 'Cancel'}
                        i onClick={handleEdit} className='marginLeft5p' severity={readOnly ? "Primary" : 'warning'} size='small'
                        tooltip={readOnly ? CONSTANTS.TOOLTIPS.EDIT : CONSTANTS.TOOLTIPS.CANCEL}
                    />
                    :
                    <></>
                }

                {!readOnly ?
                    <CustomButton id={'savebutton' + info.id} label="Update" onClick={updateStatus}
                        className='marginLeft5p' size='small'
                        tooltip={CONSTANTS.TOOLTIPS.UPDATE}
                    />
                    :
                    <></>
                }

                {user.role === 'Customer' && dstatus === 'Delivered' && !dfeedback ?
                    <CustomButton id={'savebutton' + info.id} label="Submit" onClick={updateStatus}
                        className='marginLeft5p' size='small' tooltip={CONSTANTS.TOOLTIPS.UPDATE}
                    />
                    :
                    <></>
                }

                {user.role === 'Customer' && (dstatus === 'Placed' || dstatus === 'Scheduled') ?
                    <CustomButton id={'buttoncancel' + info.id} label={'Cancel Order'}
                        onClick={openPopup} severity='warning' size='small'
                        tooltip={CONSTANTS.TOOLTIPS.CANCEL}
                    />
                    :
                    <></>
                }
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
                <div className='flex flex-row-reverse' style={{ fontWeight: 'bolder' }}>
                    <div style={{ width: '15%' }}></div>Total: {totalPrice}£</div>

                <hr />


                <Tooltip target={'#displaynote' + id} position='top'>Order Note: {note}</Tooltip>
                {note ? <div id={'displaynote' + id} className='button'>Note: {note}</div> : <></>}

                <Tooltip target={'#displayfeedback' + id} position='top'>Customer Feedback: {dfeedback}</Tooltip>
                {dfeedback ? <div id={'displayfeedback' + id} className='button'>Feedback: {dfeedback}</div> : <></>}
            </Card>

            <CustomPopup header='Confirmation' message="Are you sure you want to cancel the Order?"
                singleButton={false} callback={() => updateStatus({ st: 'Cancelled' })} visible={popup} toggle={setPopup}
            />
        </div >
    )
}
