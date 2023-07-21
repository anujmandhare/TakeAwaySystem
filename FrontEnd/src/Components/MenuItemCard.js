import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';

import { setMenuItem } from '../Redux/Data';

export default function AdvancedDemo({ name, price, ingredients, className, ...rest }) {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setMenuItem({ name, price, ingredients }));
        rest.showPopup(true);
    }

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Edit" icon="pi pi-check" onClick={handleEdit} />
        </div>
    );

    return (
        <div className="col-4">
            <Card title={name} subTitle={price + ' £'} className={className} footer={footer} {...rest}>
                <p className="m-0">
                    {ingredients}
                </p>
            </Card>
        </div>
    )
}
