
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';

import { removeFromOrder, clearCart } from '../Redux/Order';
import CustomButton from './CustomButton';

export default function Table({ data = [], handleRemoveItem, className = '' }) {

    const deleteButton = (info) => <><CustomButton severity="danger" id={info.name} label='Remove' onClick={() => handleRemoveItem(info)} /></>

    return (
        <div className={"card " + className}>
            <DataTable value={data} size='small' tableStyle={{ minWidth: '50rem' }}>
                {/* <Column field="code" header="Code"></Column> */}
                <Column field="name" header="Name"></Column>
                <Column field="price" header="Price"></Column>
                <Column body={deleteButton}></Column>
            </DataTable>
        </div>
    );
}
