import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import OrderDashboard from './components/OrderDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import QRPAGE from './components/QRPAGE';
import OrderForm from './components/OrderForm'; 
import Auditlog from './components/AuditLog';
import Sidebar from './components/Sidebar';
import Services from './components/Services';
import HelpSupport from './components/HelpSupport';
const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(() => {
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!userData); 
        setLoading(false); 

        // Don't navigate to login if the user is accessing the order-form
        if (!userData && !location.pathname.startsWith('/order-form')) {
            navigate('/'); 
        }
    }, [navigate, location]);

    const handleLogin = (username: string) => {
        if (username === 'Admin') {
            const user = { name: username };
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoggedIn(true);
            navigate('/OrderDashboard'); 
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/'); 
    };

    const hasAccessToOrderForm = () => {
        const params = new URLSearchParams(location.search);
        return params.has('access'); // Check if the access query parameter exists
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>; 
    }

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex h-screen">
                    <Sidebar onLogout={handleLogout} />
                    <div className="flex-1 overflow-y-auto">
                        <Routes>
                            <Route path="/" element={<Navigate to="/OrderDashboard" replace />} />
                            <Route path="/OrderDashboard" element={<OrderDashboard onLogout={function (): void {
                                throw new Error('Function not implemented.');
                            } } />} />
                            <Route path="/AnalyticsDashboard" element={<AnalyticsDashboard />} />
                            <Route path="/QRPAGE" element={<QRPAGE />} />
                            <Route path="/Services" element={<Services/>} />
                            <Route path="/Auditlog" element={<Auditlog/>} />
                            <Route path="/ContactSupport" element={<HelpSupport />} />
                            <Route path="/order-form" element={hasAccessToOrderForm() ? <OrderForm /> : <Navigate to="/" replace />} />
                            <Route path="*" element={<Navigate to="/OrderDashboard" replace />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/order-form" element={hasAccessToOrderForm() ? <OrderForm /> : <Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
