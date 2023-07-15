
import { TabView, TabPanel } from 'primereact/tabview';

import Profile from '../Pages/Profile';
import Orders from '../Pages/Orders';
import Menu from '../Pages/Menu';

export default function CustomTabMenu({ tab, setTab }) {

    return (
        <div className="card">
            <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                <TabPanel header="Profile">
                    <Profile />
                </TabPanel>
                <TabPanel header="Orders">
                    <Orders />
                </TabPanel>
                <TabPanel header="Menu">
                    <Menu />
                </TabPanel>
            </TabView>
        </div>
    )
}
