import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import TabMenu from '../Components/TabMenu';
import { useState } from "react";


export default function Main() {

    const user = useSelector(_ => _.user);

    const [tab, setTab] = useState(0);

    if (!user?.username) {
        return <Navigate to="/login" replace={true} />;
    }

    return (<>
        <TabMenu tab={tab} setTab={setTab} />

    </>);
}