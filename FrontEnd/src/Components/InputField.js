
import { InputText } from "primereact/inputtext";


export default function InputField({ id, type = 'text', label, value, setter, customElement }) {

    return (
        <div className="card flex justify-content-center">
            {customElement ? customElement
                : <span className="p-float-label">
                    <InputText id={id} type={type} value={value} onChange={(e) => setter(e.target.value)} />
                    <label htmlFor={id}>{label}</label>
                </span>}
        </div>
    )
}
