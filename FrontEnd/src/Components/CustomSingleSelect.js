
import React from "react";
import { Dropdown } from 'primereact/dropdown';

export default function CustomSingleSelect({ id, label, options, value, setter, className = '', ...rest }) {

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={value} onChange={(e) => setter(e.value)} options={options} optionLabel="name"
                placeholder={label} id={id} className="w-full md:w-14rem" {...rest} />
        </div>
    )
}
