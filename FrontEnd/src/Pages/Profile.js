import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { POST } from "../Setup/Api";
import { setLoadingTrue, setLoadingFalse, setUser } from "../Redux/User";
import CONSTANTS from "../Setup/Constants.json";
import CustomerTextField from '../Components/InputField';
import CustomButton from '../Components/CustomButton';

export default function Profile() {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [role, setRole] = useState(user.role);
    const [number, setNumber] = useState(user.number);


    useEffect(() => {
        setName(user.name);
        setUsername(user.username);
        setRole(user.role);
        setNumber(user.number);
    }, [user]);


    const handleUpdate = async () => {

        dispatch(setLoadingTrue());
        const data = await POST(CONSTANTS.UPDATE, { name, username, role, number });

        if (data) {
            alert(data);
            dispatch(setUser({ name, number, role, username }));
        }

        dispatch(setLoadingFalse());
    };


    return (
        <div className="card">
            <CustomerTextField id='name' label='Name' value={name} setter={setName} />
            <CustomerTextField id='username' label='Username' disabled={true} value={username} setter={setUsername} />
            <CustomerTextField id='number' label='Mobile Number' value={number} setter={setNumber} />
            <CustomerTextField id='role' label='Role' disabled={true} value={role} setter={setRole} />

            <CustomButton label='Update' onClick={handleUpdate} />
        </div>
    )
}
