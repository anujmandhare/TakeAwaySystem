s
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import CONSTANTS from '../Setup/Constants.json';
import { deleteUser } from '../Redux/User';
import CustomButton from './CustomButton';
import { Menubar } from 'primereact/menubar';

export default function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(_ => _.user);


    const handleLogout = () => {
        dispatch(deleteUser());
    }


    const start = <div style={{ fontSize: 36, fontStyle: 'italic', fontWeight: 'bold', color: '#6366F1' }}>Easy Go</div>;
    const end = user.username ? <CustomButton onClick={handleLogout} label='logout' id='logout'
        tooltip={CONSTANTS.TOOLTIPS.LOGOUT} tooltipOptions={{ position: 'left' }}
    />
        :
        <></>;

    return (
        <div id='NavBar' className="card">
            <Menubar start={start} end={end} />
        </div>
    )
}
