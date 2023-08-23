
import { InputText } from "primereact/inputtext";


export default function CustomInputField({ id, label, disabled = false, readOnly = false, value, setter
    , tooltip, customElement, className, type = 'text', ...rest }) {

    return (
        <div className={"card flex justify-content-center " + className}>
            {customElement ? customElement
                : <span className="p-float-label" {...rest}>
                    <InputText id={id} type={type} disabled={disabled} readOnly={readOnly}
                        value={value} onChange={(e) => setter(e.target.value)} {...rest}
                        tooltip={tooltip}  tooltipOptions={{ showOnDisabled: true }}
                    />
                    <label htmlFor={id}>{label}</label>
                </span>}
        </div>
    )
}
