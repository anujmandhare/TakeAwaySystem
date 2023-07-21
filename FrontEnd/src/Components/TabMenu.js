import { useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';

import Profile from '../Pages/Profile';
import Orders from '../Pages/Orders';
import Menu from '../Pages/Menu';

export default function CustomTabMenu({ tab, setTab }) {

    const user = useSelector(_ => _.user);

    return (
        <div className="card">
            <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                <TabPanel header="Profile">
                    <Profile />
                </TabPanel>
                <TabPanel header="Menu">
                    <Menu />
                </TabPanel>
                {user.role === 'Customer' ?
                    <TabPanel header="Order Preview">
                        <Orders />
                    </TabPanel>
                    :
                    <></>}
                <TabPanel header="Orders">
                    <Orders />
                </TabPanel>
            </TabView>
        </div>
    )
}
