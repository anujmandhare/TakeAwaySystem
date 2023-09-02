
import { Calendar } from 'primereact/calendar';

export default function CustomCalendar({ value, setter, id, label, className, tooltip, tooltipOptions, hourFormat, showTime, ...rest }) {

    return (
        <div className="card flex justify-content-center input" {...rest}>
            <span className="p-float-label" {...rest}>
                <Calendar id={id} value={value} onChange={(e) => setter(e.value)} showTime={showTime} hourFormat={hourFormat}
                    tooltip={tooltip} tooltipOptions={{ ...tooltipOptions }} {...rest}
                />
                <label htmlFor={id}>{label}</label>
            </span>
        </div>
    )
}
