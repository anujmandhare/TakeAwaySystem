import { useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';

import Profile from '../Pages/Profile';
import Orders from '../Pages/Orders';
import OrderPreview from '../Pages/OrderPreview';
import Menu from '../Pages/Menu';
import PreviousOrders from '../Pages/PreviousOrders';

export default function CustomTabMenu({ tab, setTab }) {

    const role = useSelector(_ => _.user.role);

    return (
        <div id='TabView' className="card">
            <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                <TabPanel header="Profile">
                    <Profile />
                </TabPanel>
                <TabPanel header="Menu">
                    <Menu />
                </TabPanel>
                {role === 'Customer' ?
                    <TabPanel header="Order Preview">
                        <OrderPreview />
                    </TabPanel>
                    :
                    <></>}
                <TabPanel header="Current Orders">
                    <Orders />
                </TabPanel>
                <TabPanel header="Previous Orders">
                    <PreviousOrders />
                </TabPanel>
            </TabView>
        </div>
    )
}
