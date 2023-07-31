import React from 'react';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';

import { setMenuItem } from '../Redux/Data';
import { addToOrder } from '../Redux/Order';
import CustomButton from './CustomButton';

export default function MenuItemCard({ name, price, ingredients, className = '', showpop, id, ...rest }) {

    const user = useSelector(_ => _.user);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setMenuItem({ name, price, ingredients }));
        showpop(true);
    }

    const addItem = () => {
        dispatch(addToOrder({ name, price }));
        // alert('Item added');
    }

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (info) => (
        <div id={'buttondiv' + info.id} className="flex flex-wrap justify-content-end gap-2" >
            {user.role === 'Admin' ? <CustomButton id={'buttonedit' + info.id} label="Edit" icon="pi pi-check" onClick={handleEdit} /> : <></>}
            {user.role === 'Customer' ? <CustomButton id={'buttonadd' + info.id} label="Add to order" icon="pi pi-check" onClick={addItem} /> : <></>}
        </div >
    );

    return (
        <div id={id} className="col-4">
            <Card id={id} title={name} subTitle={price + ' £'} className={className} footer={footer} {...rest}>
                <p id={id} className="m-0">
                    {ingredients}
                </p>
            </Card>
        </div>
    )
}
