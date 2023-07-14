import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import TextField from "../Components/InputField";
import CustomButton from '../Components/CustomButton';
import LinkButton from "../Components/LinkButton";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(_ => _.user);

    if (user?.username) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <>
            <TextField id='username' label='Username' value={username} setter={setUsername} />
            <TextField id='password' type="password" label='Password' value={password} setter={setPassword} />
            {/* <CustomButton label='Register' onClick={handleSubmit} /> */}
            <LinkButton label='login' link='login' />
        </>
    );
}