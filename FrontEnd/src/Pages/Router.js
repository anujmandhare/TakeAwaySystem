
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

// import CustomNavBar from "./Components/CustomNavBar";
import Login from './Login';
import Register from './Register';
import Main from './Main';

export default function MainRouter() {
    // const user = useSelector(state => state.user);

    return <Router>
        {/* <CustomNavBar /> */}
        {false ?
            <div className='d-flex justify-content-center align-items-center spinner'>
                {/* <MDBSpinner color='primary' role='status' style={{ width: '3rem', height: '3rem' }} /> */}
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