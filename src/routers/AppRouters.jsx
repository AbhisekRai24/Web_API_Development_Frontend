import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login_page' // adjust path based on your folder structure
import Home from '../pages/home_page' // adjust path based on your folder structure
import Register from '../pages/register_page' // adjust path based on your folder structure


function App() {
    return (
        <Router>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                

            </Routes>
        </Router>
    );
}

export default App;