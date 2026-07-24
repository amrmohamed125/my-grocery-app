import React, { useState } from 'react';

const INITIAL_ORDERS = [
    { id: '#c4d33c', date: '7/15/2026, 12:08:10 PM', customer: 'Saksham', email: 'saksham104@gmail.com', total: '$243.00', partner: null, status: 'Placed' },
    { id: '#31dd1e', date: '7/15/2026, 12:07:20 PM', customer: 'Saksham', email: 'saksham104@gmail.com', total: '$734.40', partner: null, status: 'Placed' },
    { id: '#f04e38', date: '7/15/2026, 9:06:54 AM', customer: 'this', email: 'this@gmail.com', total: '$475.20', partner: null, status: 'Placed' },
    { id: '#6f9b45', date: '7/14/2026, 3:12:12 PM', customer: 'serge', email: 'lukongserge35@gmail.com', total: '$216.00', partner: null, status: 'Placed' },
    { id: '#5518e8', date: '7/14/2026, 10:41:52 AM', customer: 'Ramesh', email: 'hgupta27a@gmail.com', total: '$47.52', partner: null, status: 'Confirmed' },
    { id: '#5d1e94', date: '5/19/2026, 10:12:27 AM', customer: 'wqedwedewqd', email: 'siraj97864@hidevok.com', total: '$81.00', partner: null, status: 'Delivered' },
    { id: '#f6495c', date: '5/19/2026, 7:25:04 AM', customer: 'Matt', email: 'mattj.reynolds@bigpond.com', total: '$151.20', partner: null, status: 'Packed' },
    { id: '#426205', date: '6/9/2026, 8:52:41 AM', customer: 'suresh', email: 'suresh@gmail.com', total: '$151.20', partner: null, status: 'Cancelled' },
    { id: '#8df4a1', date: '6/8/2026, 9:37:25 PM', customer: 'test', email: 'testemail@gmail.com', total: '$37.80', partner: null, status: 'Cancelled' },
    { id: '#1ed162', date: '6/7/2026, 3:26:01 PM', customer: 'jm', email: 'jm@gmail.com', total: '$59.40', partner: null, status: 'Delivered' },
    { id: '#f05963', date: '6/6/2026, 5:50:10 PM', customer: 'jithin', email: 'jithinkondeit944@gmail.com', total: '$75.60', partner: null, status: 'Delivered' },
    { id: '#523d64', date: '6/6/2026, 10:54:06 AM', customer: 'Safal Pandey', email: 'safal@gmail.com', total: '$59.40', partner: null, status: 'Cancelled' },
    { id: '#6db0c2', date: '6/6/2026, 10:45:33 AM', customer: 'dd', email: 'dhritig07@gmail.com', total: '$140.40', partner: null, status: 'Cancelled' },
    { id: '#1e3f00', date: '6/6/2026, 10:01:40 AM', customer: 'Gsh', email: 'hwuwj@gmail.com', total: '$561.60', partner: null, status: 'Delivered' },
    { id: '#1d8557', date: '5/19/2026, 9:27:49 PM', customer: 'Chandan', email: 'chandangulati571@gmail.com', total: '$37.80', partner: null, status: 'Placed' },
    { id: '#a4c090', date: '5/18/2026, 8:25:01 PM', customer: 'Moe', email: 'moee@gmail.com', total: '$496.80', partner: null, status: 'Placed' },
    { id: '#23b0e3', date: '5/18/2026, 7:48:00 PM', customer: 'aa', email: 'mahnnooranwar191@gmail.com', total: '$151.20', partner: null, status: 'Placed' },
    { id: '#1991c0', date: '5/18/2026, 7:29:24 PM', customer: 'diva', email: 'diva@gmail.com.com', total: '$37.80', partner: null, status: 'Placed' },
    { id: '#b8aefe', date: '5/18/2026, 1:47:39 PM', customer: 'Dharmik', email: 'dharmik@gmail.com', total: '$221.40', partner: null, status: 'Delivered' },
    { id: '#6d90f3', date: '5/17/2026, 8:43:14 PM', customer: 'Priya Satpathy', email: 'priyasatpathy429@gmail.com', total: '$383.40', partner: null, status: 'Confirmed' },
    { id: '#9f1e8a', date: '5/15/2026, 4:12:05 PM', customer: 'Omar Aly', email: 'omar.aly@yahoo.com', total: '$180.00', partner: null, status: 'Confirmed' },
    { id: '#7b2c9d', date: '5/14/2026, 2:34:12 PM', customer: 'Zainab Ali', email: 'zainab.ali@gmail.com', total: '$95.20', partner: null, status: 'Delivered' },
    { id: '#4a8e3f', date: '5/12/2026, 11:15:00 AM', customer: 'Mostafa', email: 'mostafa.creative@gmail.com', total: '$320.00', partner: null, status: 'Packed' },
    { id: '#2d9c8b', date: '5/10/2026, 9:05:40 AM', customer: 'Sherif', email: 'sherif.dev@gmail.com', total: '$112.50', partner: null, status: 'Placed' },
    { id: '#5f6e1d', date: '5/09/2026, 8:12:30 PM', customer: 'Hassan', email: 'hassan.m@gmail.com', total: '$64.00', partner: null, status: 'Confirmed' },
    { id: '#8c7d3a', date: '5/08/2026, 3:45:12 PM', customer: 'Laila', email: 'laila.art@hotmail.com', total: '$410.00', partner: null, status: 'Delivered' },
    { id: '#3b2a9e', date: '5/07/2026, 1:20:50 PM', customer: 'Kareem', email: 'kareem.salem@gmail.com', total: '$78.00', partner: null, status: 'Packed' },
    { id: '#9d8e7c', date: '5/06/2026, 12:10:15 PM', customer: 'Youssef', email: 'youssef.allam@gmail.com', total: '$145.00', partner: null, status: 'Cancelled' },
    { id: '#6a5b4c', date: '5/05/2026, 10:30:22 AM', customer: 'Nour', email: 'nour.design@gmail.com', total: '$89.00', partner: null, status: 'Placed' },
    { id: '#1f2e3d', date: '5/04/2026, 9:15:05 AM', customer: 'Farida', email: 'farida.f@gmail.com', total: '$210.00', partner: null, status: 'Confirmed' }
];

const ALL_STATUSES = ['Placed', 'Confirmed', 'Packed', 'Delivered', 'Cancelled'];
const DELIVERY_PARTNERS = [
    { id: 1, name: 'Avinash', vehicle: 'Bike', phone: '9876543210' }
];

function Orders() {
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedPartner, setSelectedPartner] = useState(null);
    
    const [activeDropdownId, setActiveDropdownId] = useState(null);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        setActiveDropdownId(null);
    };

    const handleOpenAssignModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleAssignPartner = () => {
        if (!selectedPartner) return;
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === selectedOrderId ? { ...order, partner: selectedPartner.name } : order
            )
        );
        setIsModalOpen(false);
        setSelectedOrderId(null);
        setSelectedPartner(null);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-amber-100! text-amber-800!';
            case 'Packed':
                return 'bg-cyan-100! text-cyan-800!';
            case 'Delivered':
                return 'bg-emerald-100! text-emerald-800!';
            case 'Cancelled':
                return 'bg-red-100! text-red-800!';
            case 'Placed':
            default:
                return 'bg-blue-100! text-blue-800!';
        }
    };

    return (
        <div className="relative!">
            <div className="bg-white! border! border-zinc-100! rounded-2xl! p-6! shadow-[0_2px_8px_rgba(0,0,0,0.01)]!">
                <h2 className="text-lg! font-bold! text-zinc-900! mb-6!">Orders</h2>
                
                <div className="overflow-x-auto!">
                    <table className="w-full! text-left! border-collapse!">
                        <thead>
                            <tr className="border-b! border-zinc-100!">
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Order Details</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Customer</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Total</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Delivery Partner</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y! divide-zinc-50!">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50/30! transition-colors!">
                                    {/* تفاصيل الطلب */}
                                    <td className="py-4.5!">
                                        <div className="flex! flex-col!">
                                            <span className="text-xs! font-bold! text-zinc-800!">{order.id}</span>
                                            <span className="text-[10px]! text-zinc-400! font-medium!">{order.date}</span>
                                        </div>
                                    </td>

                                    {/* بيانات العميل */}
                                    <td className="py-4.5!">
                                        <div className="flex! flex-col!">
                                            <span className="text-xs! font-bold! text-zinc-800!">{order.customer}</span>
                                            <span className="text-[10px]! text-zinc-400! font-medium!">{order.email}</span>
                                        </div>
                                    </td>

                                    {/* السعر الإجمالي */}
                                    <td className="py-4.5! text-xs! font-bold! text-zinc-800!">{order.total}</td>

                                    <td className="py-4.5!">
                                        {order.partner ? (
                                            <span className="text-xs! font-bold! text-zinc-700!">{order.partner}</span>
                                        ) : (
                                            <button 
                                                onClick={() => handleOpenAssignModal(order.id)}
                                                className="bg-blue-50! hover:bg-blue-100! text-blue-600! text-[10px]! font-bold! py-1.5! px-3! rounded-lg! flex! items-center! gap-1! border-0! cursor-pointer! transition-all!"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3!">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.847-13.56A1.125 1.125 0 0 0 19.338 3.5H15m-1.5 15.25a3.9 3.9 0 0 1-3-3V15m0 0H7.5m3 0H13.5m-6-3V7.5a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v3" />
                                                </svg>
                                                Assign
                                            </button>
                                        )}
                                    </td>

                                    <td className="py-4.5! relative!">
                                        <div className="inline-block! relative!">
                                            {/* زر عرض الحالة الحالي */}
                                            <button
                                                onClick={() => setActiveDropdownId(activeDropdownId === order.id ? null : order.id)}
                                                className={`cursor-pointer! text-[10px]! font-bold! py-1.5! pl-3! pr-7! rounded-full! border-0! outline-none! transition-all! duration-200! flex! items-center! gap-1! ${getStatusStyle(order.status)}`}
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd' /></svg>")`,
                                                    backgroundPosition: 'right 8px center',
                                                    backgroundSize: '12px',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                            >
                                                {order.status}
                                            </button>

                                            {/* القائمة المنسدلة المخصصة*/}
                                            {activeDropdownId === order.id && (
                                                <>
                                                    <div className="fixed! inset-0! z-10!" onClick={() => setActiveDropdownId(null)}></div>
                                                    
                                                    <div className="absolute! right-0! mt-1! w-28! bg-white! border! border-zinc-100! rounded-xl! shadow-lg! py-1! z-20! overflow-hidden! animate-in! fade-in! slide-in-from-top-1! duration-150!">
                                                        {ALL_STATUSES.map((status) => (
                                                            <button
                                                                key={status}
                                                                onClick={() => handleStatusChange(order.id, status)}
                                                                className={`w-full! text-left! px-3! py-2! text-[10px]! font-bold! border-0! bg-transparent! cursor-pointer! transition-colors! flex! items-center! justify-between! ${
                                                                    order.status === status 
                                                                        ? 'bg-zinc-50! text-zinc-900!' 
                                                                        : 'text-zinc-600! hover:bg-zinc-50/50!'
                                                                }`}
                                                            >
                                                                <span className="flex! items-center! gap-1.5!">
                                                                    <span className={`size-1.5! rounded-full! ${
                                                                        status === 'Confirmed' ? 'bg-amber-500!' :
                                                                        status === 'Packed' ? 'bg-cyan-500!' :
                                                                        status === 'Delivered' ? 'bg-emerald-500!' :
                                                                        status === 'Cancelled' ? 'bg-red-500!' : 'bg-blue-500!'
                                                                    }`}></span>
                                                                    {status}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🚪 بوب اب Assign Delivery Partner */}
            {isModalOpen && (
                <div className="fixed! inset-0! bg-white/80! backdrop-blur-[5px]! flex! items-center! justify-center! z-50!">
                    <div className="bg-white! rounded-2xl! p-6! w-full! max-w-[440px]! shadow-xl! mx-4! relative!">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute! top-5! right-5! text-zinc-400! hover:text-zinc-600! bg-transparent! border-0! cursor-pointer!"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4.5!">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-sm! font-bold! text-zinc-950! mb-4!">Assign Delivery Partner</h3>

                        <div className="space-y-3! mb-6!">
                            {DELIVERY_PARTNERS.map((partner) => (
                                <label 
                                    key={partner.id}
                                    onClick={() => setSelectedPartner(partner)}
                                    className={`flex! items-center! justify-between! p-4! border! rounded-xl! cursor-pointer! transition-all! ${
                                        selectedPartner?.id === partner.id 
                                            ? 'border-[#1c3021]! bg-zinc-50/50!' 
                                            : 'border-zinc-100! hover:bg-zinc-50/30!'
                                    }`}
                                >
                                    <div className="flex! items-center! gap-3!">
                                        <input 
                                            type="radio" 
                                            name="delivery_partner" 
                                            checked={selectedPartner?.id === partner.id}
                                            onChange={() => setSelectedPartner(partner)}
                                            className="accent-[#1c3021]! size-4! cursor-pointer!"
                                        />
                                        <div className="size-8! bg-[#152e1c]! text-white! rounded-full! flex! items-center! justify-center! text-[11px]! font-bold!">
                                            {partner.name.charAt(0)}
                                        </div>
                                        <div className="flex! flex-col!">
                                            <span className="text-xs! font-bold! text-zinc-800!">{partner.name}</span>
                                            <span className="text-[10px]! text-zinc-400! font-medium!">{partner.vehicle} • {partner.phone}</span>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="flex! gap-3!">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1! py-2.5! bg-zinc-100! hover:bg-zinc-200! text-zinc-700! text-xs! font-bold! rounded-xl! transition-colors! border-0! cursor-pointer!"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAssignPartner}
                                disabled={!selectedPartner}
                                className={`flex-1! py-2.5! text-xs! font-bold! rounded-xl! transition-colors! border-0! cursor-pointer! ${
                                    selectedPartner 
                                        ? 'bg-[#4b5a4d]! hover:bg-[#39473b]! text-white!' 
                                        : 'bg-zinc-200! text-zinc-400! cursor-not-allowed!'
                                }`}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;