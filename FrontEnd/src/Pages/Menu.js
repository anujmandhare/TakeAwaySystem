import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import MenuItemCard from '../Components/MenuItemCard';
import CONSTANTS from '../Setup/Constants';
import CustomButton from '../Components/CustomButton';
import { menuItems } from '../dummyData';
import MenuPopup from '../Components/MenuPopup';
import { GET } from '../Setup/Api';
import { removeMenuItem } from '../Redux/Data';
import CustomTag from '../Components/CustomTag';


export default function Menu() {
    const user = useSelector(_ => _.user);
    const order = useSelector(_ => _.order);
    const [cartValue, setCartValue] = useState(getCartValue());

    const dispatch = useDispatch();

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

    function getCartValue() {
        return order.reduce((acc, ele) => Number(ele.price) + Number(acc), 0);
    }

    const handleOpenClose = (booleanValue) => {
        dispatch(removeMenuItem());
        setShowVisible(booleanValue);
    };


    useEffect(() => {
        getAllMenuItems();
        setCartValue(getCartValue());
    }, [order]);

    return (
        <>
            {
                user.role === 'Admin' ?
                    <div className='flex-row marginBottom10p'>
                        <CustomButton id='addMenuItem' label='Add Menu Item' size="large" onClick={() => handleOpenClose(true)}
                            tooltip={CONSTANTS.TOOLTIPS.ADD_TO_MENU}
                        />
                    </div>
                    :
                    <></>
            }

            {
                menuItemList.length ?
                    <>
                        {user.role === 'Customer' ? <div className='flex flex-row-reverse '>
                            <CustomTag children={'Cart Value: ' + cartValue + '£'} tooltip={CONSTANTS.TOOLTIPS.CART + ' ' + cartValue + '£'}></CustomTag>
                        </div> : <></>}
                        <div className="grid" style={{ overflowX: 'auto' }}>
                            {menuItemList.map((_, i) => <MenuItemCard key={'menuCard' + i} id={_.name + i} _id={_._id}
                                name={_.name} price={_.price} ingredients={_.ingredients} showpop={setShowVisible} />)}
                        </div>
                    </>
                    :
                    <>{ErrorMsg}</>
            }

            <MenuPopup visible={showVisible} close={handleOpenClose} getAllMenuItems={getAllMenuItems} />
        </>
    )
}
