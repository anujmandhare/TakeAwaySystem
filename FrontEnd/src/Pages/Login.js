import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'


import { POST } from "../Setup/Api";
import { setUser, setLoadingTrue, setLoadingFalse } from "../Redux/User";
import CONSTANTS from "../Setup/Constants.json";
import TextField from "../Components/InputField";
import LinkButton from "../Components/LinkButton";
import CustomButton from "../Components/CustomButton";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const user = useSelector(_ => _.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        if (!emailPattern.test(username)) {
            alert("Please enter valid email address");
            return;
        }

        dispatch(setLoadingTrue());
        const data = await POST(CONSTANTS.LOGIN, { username, password });

        if (data && data.username) {
            dispatch(setUser({ ...data }));
        }
        dispatch(setLoadingFalse());
    };

    if (user?.username) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <>
            <TextField id='username' label='Username' value={username} setter={setUsername} />
            <TextField id='password' type="password" label='Password' value={password} setter={setPassword} />

            <CustomButton label='Login' onClick={handleSubmit} />
            <LinkButton label="Register" link='register' />
        </>
    );
}