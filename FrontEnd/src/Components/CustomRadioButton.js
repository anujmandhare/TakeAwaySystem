
import { RadioButton } from "primereact/radiobutton";

export default function CustomRadioButton({ labels = [], value, setter }) {

    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-3">
                <RadioButton inputId={labels} name={labels} value={labels} onChange={(e) => setter(e.value)} checked={value === labels} />
                <label htmlFor={labels} className="ml-2">{labels}</label>
                {labels.map(_ => {
                    return <div className="flex align-items-center">
                        <RadioButton inputId={_} name={_} value={_} onChange={(e) => setter(e.value)} checked={value === _} />
                        <label htmlFor={_} className="ml-2">{_}</label>
                    </div>
                })
                }
            </div>
        </div>
    );
}
