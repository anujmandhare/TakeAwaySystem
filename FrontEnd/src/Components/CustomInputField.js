
import { InputText } from "primereact/inputtext";


export default function CustomInputField({ id, type = 'text', label, disabled = false, readOnly = false, value, setter, customElement, className, ...rest }) {

    return (
        <div className={"card flex justify-content-center " + className}>
            {customElement ? customElement
                : <span className="p-float-label" {...rest}>
                    <InputText id={id} type={type} disabled={disabled} readOnly={readOnly}
                        value={value} onChange={(e) => setter(e.target.value)} {...rest} />
                    <label htmlFor={id}>{label}</label>
                </span>}
        </div>
    )
}
