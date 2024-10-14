import React, { useState } from 'react';
import { Search, Eye, Trash2, CheckCircle, Bell } from 'lucide-react';

interface Order {
    id: number;
    jobType: string; // Field for job type
    price: number; // Field for price
    date: string;
    customerName: string; // New field for customer name
    isFinished: boolean; // New field to track if order is finished
    paperSize?: string; // Optional field for paper size
    numberOfCopies?: number; // Optional field for number of copies
    colorOption?: string; // Optional field for color option
    additionalNote?: string; // Optional field for additional note
    filePath?: string; // Optional field for file path
}

const sampleOrders: Order[] = [
    { id: 7, jobType: 'Business Card Printing', price: 300, date: 'May 24, 2024', customerName: 'Bob Brown', isFinished: false },
    { id: 6, jobType: 'Flyer Printing', price: 600, date: 'May 25, 2024', customerName: 'Charlie White', isFinished: false },
    { id: 5, jobType: 'Brochure Printing', price: 1200, date: 'May 26, 2024', customerName: 'Dave Black', isFinished: false },
    { id: 4, jobType: 'Poster Printing', price: 800, date: 'May 27, 2024', customerName: 'Eva Green', isFinished: true },
    { id: 3, jobType: 'Sticker Printing', price: 450, date: 'May 28, 2024', customerName: 'Frank Blue', isFinished: false },
    { id: 2, jobType: 'Canvas Printing', price: 2000, date: 'May 29, 2024', customerName: 'Grace Red', isFinished: false },
    { id: 1, jobType: 'Mug Printing', price: 900, date: 'May 30, 2024', customerName: 'Hank Yellow', isFinished: false },
    // Add more sample orders as needed
];

interface OrderDashboardProps {
    onLogout: () => void;
}

const OrderDashboard: React.FC<OrderDashboardProps> = ({ }) => {
    const [orders, setOrders] = useState<Order[]>(sampleOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [notificationCount, setNotificationCount] = useState<number>(0); // State to track notifications
    const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
    const ordersPerPage = 20; // Updated to show 20 orders per page

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
        }
    };

    const handleFinishOrder = (id: number) => {
        if (window.confirm('Are you sure you want to finish this order?')) {
            setOrders((prevOrders) =>
                prevOrders.map(order => order.id === id ? { ...order, isFinished: true } : order)
            );
        }
    };

    const filteredOrders = orders.filter(order =>
        order.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage); // Total pages based on filtered orders
    const startIndex = (currentPage - 1) * ordersPerPage; // Calculate start index for current page
    const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage); // Orders for current page

    const toggleDetails = (id: number) => {
        setSelectedOrderId(selectedOrderId === id ? null : id);
    };

    // Example function to simulate receiving a new order
    const receiveNewOrder = () => {
        const newOrder: Order = {
            id: orders.length + 1,
            jobType: 'New Order',
            price: 600,
            date: new Date().toLocaleDateString(),
            customerName: 'New Customer',
            isFinished: false,
            paperSize: 'A4',
            numberOfCopies: 10,
            colorOption: 'Full Color',
            additionalNote: '',
            filePath: '/path/to/newfile.pdf',
        };

        // Add new order at the beginning and keep existing orders
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        setNotificationCount((prevCount) => prevCount + 1); // Increase notification count
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 overflow-hidden">
                <div className="p-8 overflow-y-auto h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Order Dashboard</h2>
                        <div className="relative">
                            <button 
                                className="flex items-center justify-center p-2 bg-white border rounded-full shadow hover:bg-gray-200"
                                onClick={receiveNewOrder} // Simulate receiving a new order
                                aria-label="Notification"
                            >
                                <Bell size={24} className="text-gray-700" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search job types or customer names..."
                            className="w-full md:w-1/2 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="hidden md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Order ID', 'Customer Name', 'Job Type', 'Price', 'Date', 'Status', 'Actions'].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentOrders.length > 0 ? (
                                        currentOrders.map((order) => (
                                            <React.Fragment key={order.id}>
                                                <tr className="hover:bg-gray-50 transition duration-200 cursor-pointer" onClick={() => toggleDetails(order.id)}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.jobType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₱{order.price.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${order.isFinished ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                            {order.isFinished ? 'Finished' : 'In Progress'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button
                                                            onClick={() => handleFinishOrder(order.id)}
                                                            className="text-green-600 hover:text-green-900 mr-2"
                                                            aria-label="Finish Order"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            aria-label="Delete Order"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                                {selectedOrderId === order.id && (
                                                    <tr>
                                                        <td colSpan={7} className="px-6 py-4">
                                                            <div className="text-sm text-gray-700">
                                                                <strong>Paper Size:</strong> {order.paperSize}<br />
                                                                <strong>Number of Copies:</strong> {order.numberOfCopies}<br />
                                                                <strong>Color Option:</strong> {order.colorOption}<br />
                                                                <strong>Additional Note:</strong> {order.additionalNote}<br />
                                                                <strong>File Path:</strong> {order.filePath}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Responsive table for smaller screens */}
                        <div className="md:hidden">
                            {currentOrders.map((order) => (
                                <div key={order.id} className="bg-white border-b last:border-b-0 p-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.jobType}</div>
                                            <div className="text-sm text-gray-500">{order.customerName}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">₱{order.price.toFixed(2)}</div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-xs text-gray-400">{order.date}</div>
                                        <div className="mt-1 flex space-x-4">
                                            <button className="text-blue-600 hover:text-blue-900" aria-label="View Order">
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleFinishOrder(order.id)}
                                                className="text-green-600 hover:text-green-900"
                                                aria-label="Finish Order"
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="text-red-600 hover:text-red-900"
                                                aria-label="Delete Order"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex justify-center">
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-l"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded mx-1`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-r"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDashboard;
