
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { deleteUser } from '../Redux/User';
import CustomButton from './CustomButton';
import { Menubar } from 'primereact/menubar';

export default function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(_ => _.user);


    const handleLogout = () => {
        dispatch(deleteUser());
    }


    const start = <div style={{ fontSize: 36, fontStyle: 'italic', fontWeight: 'bold' }}>Take Away</div>;
    const end = user.username ? <CustomButton onClick={handleLogout} label='logout' id='logout' /> : <></>;

    return (
        <div className="card">
            <Menubar start={start} end={end} />
        </div>
    )
}
