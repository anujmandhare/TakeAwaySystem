import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'


import { POST } from "../Setup/Api";
import { setUser, setLoadingTrue, setLoadingFalse } from "../Redux/User";
import CONSTANTS from "../Setup/Constants";
import CustomInputField from "../Components/CustomInputField";
import LinkButton from "../Components/LinkButton";
import CustomButton from "../Components/CustomButton";
import validator from "../Setup/Validation";
import { CustomerUser, StaffUser, AdminUser } from "../dummyData";

const data = AdminUser;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const user = useSelector(_ => _.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        if (!validator({ type: CONSTANTS.EMAIL, stringToTest: username })) {
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
            <div className="flex align-items-center justify-content-center marginTop10p">
                <div>
                    <CustomInputField id='username' label='Username' value={username} setter={setUsername} className={'input'}/>
                    <CustomInputField id='password' type="password" label='Password' value={password} setter={setPassword} className={'input'}/>

                    <CustomButton label='Login' onClick={handleSubmit} />
                    <LinkButton label="Register" link='register' classNames={'input'}/>
                </div>
            </div>
        </>
    );
}