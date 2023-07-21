
import { RadioButton } from "primereact/radiobutton";

export default function CustomRadioButton({ labels, value, setter, ...rest }) {

    return (
        <div className="card flex justify-content-center input">
            <div className="flex flex-wrap gap-3">
                {labels.map(_ => {
                    return <div className="flex align-items-center">
                        <RadioButton inputId={_} name={_} value={_} onChange={(e) => setter(e.value)} checked={value === _}
                            {...rest} />
                        <label htmlFor={_} className="ml-2">{_}</label>
                    </div>
                })
                }
            </div>
        </div>
    );
}
