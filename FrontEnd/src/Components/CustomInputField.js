
import { InputText } from "primereact/inputtext";


export default function CustomInputField({ id, label, disabled = false, readOnly = false, value, setter
    , tooltip, customElement, className, type = 'text', required, ...rest }) {

    const tooltipOptions = { ...rest.tooltipOptions };

    return (
        <div className={"card flex justify-content-center " + className}>
            {customElement ? customElement
                : <span className="p-float-label" {...rest}>
                    <InputText id={id} type={type} disabled={disabled} readOnly={readOnly}
                        value={value} onChange={(e) => setter(e.target.value)} {...rest} required={required}
                        tooltip={tooltip} tooltipOptions={{ showOnDisabled: true, ...tooltipOptions }}
                    />
                    <label htmlFor={id} required={required}>{label + ' '}{required ? <span className="required">*</span> : ''}</label>
                </span>}
        </div>
    )
}
