import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, ShoppingBag, User, BarChart, QrCode, Menu, FileText, File, Settings } from 'lucide-react';

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/'); // Redirect to login if no user data found
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev); // Toggle sidebar visibility
    };

    return (
        <div className="relative flex">
            <div className="md:hidden">
                <button
                    className={`p-2 ${!isOpen ? 'text-black' : 'text-gray-100'}`}
                    onClick={toggleSidebar}
                >
                    <Menu />
                </button>
            </div>
            <div className={`bg-gray-900 text-gray-100 w-64 min-h-screen p-4 flex flex-col transition-transform duration-300 fixed top-0 left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>
                    <button className="md:hidden p-2" onClick={toggleSidebar}>
                        <Menu className="text-gray-100" />
                    </button>
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/OrderDashboard"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/OrderDashboard' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <ShoppingBag className="mr-3" />
                                <span>Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AnalyticsDashboard"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/AnalyticsDashboard' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <BarChart className="mr-3" />
                                <span>Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/QRPAGE"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/QRPAGE' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <QrCode className="mr-3" />
                                <span>Generate QR</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Services"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/Services' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <FileText className="mr-3" />
                                <span>Services</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AuditLog"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/AuditLog' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <File className="mr-3" />
                                <span>Audit Log</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/ContactSupport"
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === '/ContactSupport' ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800 hover:text-blue-400'}`}
                            >
                                <User className="mr-3" />
                                <span>Help And Support</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {user && (
                    <div className="mb-4 p-3 bg-gray-800 rounded-lg shadow-inner">
                        <div className="flex items-center space-x-3">
                            <User className="text-blue-400" />
                            <p className="text-sm">
                                Logged in as: <strong>{user.name}</strong>
                            </p>
                        </div>
                    </div>
                )}
                <div className="mt-auto">
                    <button
                        onClick={onLogout}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                    >
                        <LogOut className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    onClick={toggleSidebar} 
                />
            )}
        </div>
    );
};

export default Sidebar;
