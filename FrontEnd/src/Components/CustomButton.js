
import { Button } from 'primereact/button';

export default function CustomButton({ id, label, onClick, loading, className = '', tooltip, ...rest }) {

    const tooltipOptions = { ...rest.tooltipOptions };

    return (
        <div className={"card flex flex-wrap justify-content-center gap-3 " + className} >
            <Button id={id} label={label} loading={loading} onClick={onClick}
                tooltip={tooltip} tooltipOptions={{ ...tooltipOptions }}
                {...rest}
            />
        </div>
    )
}
