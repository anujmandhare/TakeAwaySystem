import { useDispatch, useSelector } from 'react-redux';

import MenuItemCard from '../Components/MenuItemCard';
import CONSTANTS from '../Setup/Constants.json';
import CustomButton from '../Components/CustomButton';
import { menuItems } from '../dummyData';
import MenuPopup from '../Components/MenuPopup';
import { useEffect, useState } from 'react';
import { GET } from '../Setup/Api';


export default function Menu() {
    const user = useSelector(_ => _.user);
    const [showVisible, setShowVisible] = useState(false);
    const [menuItemList, setMenuItemList] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');

    const getAllMenuItems = async () => {
        const data = await GET(CONSTANTS.GET_ALL_MENU_ITEMS);

        if (data) {
            setMenuItemList(data);
            setErrorMsg('');
        } else {
            setErrorMsg('No menu items available, please add new menu items.');
        }

    };

    const handleAddItem = () => {

    };


    useEffect(() => {
        getAllMenuItems();
    }, []);

    return (
        <>
            {
                user.role === 'Admin' ?
                    <div className='flex-row'>
                        <CustomButton id='addMenuItem' label='Add Menu Item' size="large" onClick={() => setShowVisible(true)} />
                    </div>
                    :
                    <></>
            }

            {
                menuItemList.length ?
                    <div className="grid" style={{ overflowX: 'auto' }}>
                        {menuItemList.map(_ => <MenuItemCard title={_.name} price={_.price} ingredients={_.ingredients} showPopup={setShowVisible} />)}
                    </div>
                    :
                    <>{ErrorMsg}</>
            }

            <MenuPopup visible={showVisible} close={setShowVisible} />
        </>
    )
}
