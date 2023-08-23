
import { Button } from 'primereact/button';

export default function CustomButton({ id, label, onClick, loading, className = '', tooltip, ...rest }) {

    return (
        <div className={"card flex flex-wrap justify-content-center gap-3 " + className} >
            <Button id={id} label={label} icon="pi pi-check" loading={loading} onClick={onClick}
                tooltip={tooltip}
                {...rest}
            />
        </div>
    )
}
