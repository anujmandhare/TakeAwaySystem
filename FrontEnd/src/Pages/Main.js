import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from "../Components/CustomButton";
import { deleteUser } from "../Redux/User";


export default function Main() {

    const user = useSelector(_ => _.user);
    console.log(user);
    const dispatch = useDispatch();


    if (!user?.username) {
        return <Navigate to="/login" replace={true} />;
    }

    const handleLogout = () => {
        dispatch(deleteUser());
    }

    return (<>Home
        <CustomButton onClick={handleLogout} label='logout' id='logout' />
    </>);
}