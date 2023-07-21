import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';

export default function AdvancedDemo({ title, price, ingredients, className, ...rest }) {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch();
        rest.setShowVisible(true);
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
            <Card title={title} subTitle={price + ' £'} className={className} footer={footer} {...rest}>
                <p className="m-0">
                    {ingredients}
                </p>
            </Card>
        </div>
    )
}
