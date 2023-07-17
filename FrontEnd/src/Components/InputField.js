
import { InputText } from "primereact/inputtext";


export default function InputField({ id, type = 'text', label, disabled = false, readOnly = false, value, setter, customElement }) {

    return (
        <div className="card flex justify-content-center input">
            {customElement ? customElement
                : <span className="p-float-label">
                    <InputText id={id} type={type} disabled={disabled} readOnly={readOnly}
                        value={value} onChange={(e) => setter(e.target.value)} />
                    <label htmlFor={id}>{label}</label>
                </span>}
        </div>
    )
}
