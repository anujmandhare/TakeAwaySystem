import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { POST } from "../Setup/Api";
import { setLoadingTrue, setLoadingFalse, setUser } from "../Redux/User";
import CONSTANTS from "../Setup/Constants.json";
import CustomInputField from '../Components/CustomInputField';
import CustomButton from '../Components/CustomButton';
import validator from "../Setup/Validation";

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

        if (!validator({ type: CONSTANTS.NUMBER, stringToTest: number })) {
            return;
        }

        if (!name) {
            alert('Please enter a valid name!');
            return
        }

        dispatch(setLoadingTrue());
        const data = await POST(CONSTANTS.UPDATE, { name, username, role, number });

        if (data) {
            alert(data);
            dispatch(setUser({ name, number, role, username }));
        }

        dispatch(setLoadingFalse());
    };


    return (
        <div id='profile' className="card marginTop10">

            <CustomInputField id='name' label='Name' value={name} setter={setName}
                tooltip={CONSTANTS.TOOLTIPS.NAME} required style={{ width: '300px' }}
            />

            <CustomInputField id='username' label='Username' disabled={true} value={username} setter={setUsername}
                className={'input'} required style={{ width: '300px' }}
                tooltip={'Disabled field ' + CONSTANTS.TOOLTIPS.EMAIL}
            />

            <CustomInputField id='number' label='Mobile Number' value={number} setter={setNumber} className={'input'}
                tooltip={CONSTANTS.TOOLTIPS.NUMBER} required style={{ width: '300px' }}
            />

            <CustomInputField id='role' label='Role' disabled={true} value={role} setter={setRole} className={'input'}
                tooltip={'Disabled field ' + CONSTANTS.TOOLTIPS.ROLE} required style={{ width: '300px' }}
            />

            <CustomButton label='Update' onClick={handleUpdate} tooltip={CONSTANTS.TOOLTIPS.UPDATE} />
        </div>
    )
}
