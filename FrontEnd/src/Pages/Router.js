
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';


import NavBar from "../Components/NavBar";
import Login from './Login';
import Register from './Register';
import Main from './Main';

export default function MainRouter() {
    const user = useSelector(state => state.user);

    return <Router>
        <NavBar />
        {user.loading ?
            <div className='flex align-items-center justify-content-center marginTop10p'>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div> : <>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Main />} />
                    <Route path="*" element={<Main />} />
                </Routes>
            </>
        }
    </Router >
}