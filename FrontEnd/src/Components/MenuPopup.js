
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useSelector } from "react-redux";


import { POST } from '../Setup/Api';
import CONSTANTS from '../Setup/Constants.json';
import CustomInputField from './CustomInputField';
import CustomTextArea from "./CustomTextArea";

export default function FooterDemo({ close, visible, ...rest }) {

    const data = useSelector(_ => _.data);

    const [name, setName] = useState(data?.name ? data.name : '');
    const [price, setPrice] = useState(data?.price ? data.price : '');
    const [ingredients, setIngredients] = useState(data?.ingredients ? data.ingredients : '');

    useEffect(() => {
        setName(data?.name ? data.name : '');
        setPrice(data?.price ? data.price : '');
        setIngredients(data?.ingredients ? data.ingredients : '');
    }, [data]);


    const addMenuItem = async () => {
        try {
            const data = await POST(CONSTANTS.ADD_MENU_ITEM, { name, price, ingredients });
            if (data) {
                alert(data);
                close(false);
            }
        } catch (error) {

        }
    };

    const footerContent = (
        <div>
            <Button label="Discard" icon="pi pi-times" onClick={() => close(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => addMenuItem(false)} autoFocus />
        </div>
    );


    return (
        <div className="card flex justify-content-center">
            <Dialog header="Enter Menu Item Details" visible={visible} style={{ width: '50vw' }} onHide={() => close(false)} footer={footerContent}>
                <CustomInputField id='name' label='Item Name' value={name} setter={setName} />
                <CustomInputField id='price' type='number' label='Item Price' value={price} setter={setPrice} />
                <CustomTextArea id='ingredients' label='Ingredients' rows='5' cols='30' value={ingredients} setter={setIngredients} />
            </Dialog>
        </div>
    )
}
