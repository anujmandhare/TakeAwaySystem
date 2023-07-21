import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'


import { POST } from "../Setup/Api";
import { setLoadingTrue, setLoadingFalse } from "../Redux/User";
import CustomInputField from "../Components/CustomInputField";
import CONSTANTS from "../Setup/Constants.json";
import CustomButton from '../Components/CustomButton';
import CustomRadioButton from "../Components/CustomRadioButton";
import LinkButton from "../Components/LinkButton";
import validator from "../Setup/Validation";

export default function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer');
    const [number, setNumber] = useState('');


    const user = useSelector(_ => _.user);

    const dispatch = useDispatch();

    if (user?.username) {
        return <Navigate to="/home" replace={true} />;
    }

    const handleSubmit = async (e) => {
        if (!(validator({ type: CONSTANTS.EMAIL, stringToTest: username }) && validator({ type: CONSTANTS.NUMBER, stringToTest: number }))) {
            return;
        }

        dispatch(setLoadingTrue());
        const data = await POST(CONSTANTS.REGISTER, { name, username, password, role, number });

        if (data) {
            setName('');
            setUsername('');
            setNumber('');
            setPassword('');
            alert(data);
        }

        dispatch(setLoadingFalse());
    };


    return (
        <>
            <div className="flex align-items-center justify-content-center marginTop10p">
                <div className="">
                    <CustomInputField id='name' label='Name' value={name} setter={setName} />
                    <CustomInputField id='username' label='Username' value={username} setter={setUsername} />
                    <CustomInputField id='password' type="password" label='Password' value={password} setter={setPassword} />
                    <CustomInputField id='number' label='Mobile Number' value={number} setter={setNumber} />
                    <CustomRadioButton labels={['Customer', 'Staff', 'Admin']} value={role} setter={setRole} />

                    <CustomButton label='Register' onClick={handleSubmit} />
                    <LinkButton label='login' link='login' />
                </div>
            </div>
        </>
    );
}