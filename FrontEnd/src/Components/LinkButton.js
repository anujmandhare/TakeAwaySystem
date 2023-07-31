import { Navigate, Link } from "react-router-dom";
import { Button } from 'primereact/button';

export default function LinkButton({ id, label, link, className = '', ...rest }) {

    return (
        <div className={"card flex flex-wrap justify-content-center gap-3 button " + className} {...rest}>
            <Link id={id} to={"/" + link}>{label}</Link>
        </div>
    )
}
