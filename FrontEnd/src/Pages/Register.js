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

        if(!name){
            alert('Please enter a valid name!');
            return
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
                    <CustomInputField id='name' label='Name' value={name} setter={setName}
                        tooltip={CONSTANTS.TOOLTIPS.NAME} required
                    />

                    <CustomInputField id='username' label='Username' value={username} setter={setUsername} className={'input'}
                        tooltip={'Enter ' + CONSTANTS.TOOLTIPS.EMAIL} required
                    />
                    <CustomInputField id='password' type="password" label='Password' value={password} setter={setPassword}
                        className={'input'} tooltip={CONSTANTS.TOOLTIPS.PASSWORD} required
                    />

                    <CustomInputField id='number' label='Mobile Number' value={number} setter={setNumber} className={'input'}
                        tooltip={CONSTANTS.TOOLTIPS.NUMBER}
                    />

                    <CustomRadioButton labels={['Customer', 'Staff', 'Admin']} value={role} setter={setRole}
                        tooltip={'Select ' + CONSTANTS.TOOLTIPS.ROLE} required
                    />

                    <CustomButton label='Register' onClick={handleSubmit} tooltip={CONSTANTS.TOOLTIPS.REGISTER} />
                    <LinkButton label='login' link='login' className={'input'} />
                </div>
            </div>
        </>
    );
}