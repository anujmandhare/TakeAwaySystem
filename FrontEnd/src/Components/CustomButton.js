
import { Button } from 'primereact/button';

export default function CustomButton({ id, label, onClick, loading, classNames, ...rest }) {

    return (
        <div className={"card flex flex-wrap justify-content-center gap-3 input" + classNames} >
            <Button id={id} label={label} icon="pi pi-check" loading={loading} onClick={onClick} {...rest} />
        </div>
    )
}
