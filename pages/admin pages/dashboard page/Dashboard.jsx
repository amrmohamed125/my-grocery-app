import React from 'react';
import Orders from '../orders/Orders';

const STATS_DATA = [
    {
        id: 1,
        title: 'Total Orders',
        value: '434',
        bgColor: 'bg-orange-50!',
        textColor: 'text-orange-600!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5!">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        )
    },
    {
        id: 2,
        title: 'Total Users',
        value: '882',
        bgColor: 'bg-[#fff5f0]!',
        textColor: 'text-[#ff6a39]!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5!">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.75-2.906m-.179-1.94a5 5 0 1 0-7.143 0M3 18.72a9.094 9.094 0 0 1 3.741-.479 3 3 0 0 1-4.682-2.72m.94 3.198.002.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 0 12 21c3.47 0 6.642-1.617 8.71-4.19m-1.161-2.02a5.025 5.025 0 1 1-2.243-4.077" />
            </svg>
        )
    },
    {
        id: 3,
        title: 'Total Products',
        value: '25',
        bgColor: 'bg-orange-50!',
        textColor: 'text-orange-600!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5!">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        )
    },
    {
        id: 4,
        title: 'Out of Stock',
        value: '6',
        bgColor: 'bg-[#fff1f1]!',
        textColor: 'text-red-500!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5!">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
        )
    }
];

const RECENT_ORDERS = [
    { id: '#C4D33C', name: 'Saksham', email: 'saksham104@gmail.com', items: 1, total: '$243.00', status: 'Confirmed', date: '7/15/2026' },
    { id: '#31DD1E', name: 'Saksham', email: 'saksham104@gmail.com', items: 2, total: '$734.40', status: 'Placed', date: '7/15/2026' },
    { id: '#F04E38', name: 'this', email: 'this@gmail.com', items: 3, total: '$475.20', status: 'Confirmed', date: '7/15/2026' },
    { id: '#6F9B45', name: 'serge', email: 'lukongserge35@gmail.com', items: 4, total: '$216.00', status: 'Placed', date: '7/14/2026' },
    { id: '#5518E8', name: 'Ramesh', email: 'ramesh27@gmail.com', items: 1, total: '$47.52', status: 'Confirmed', date: '7/14/2026' },
    { id: '#A8F29C', name: 'John Doe', email: 'john.doe@example.com', items: 2, total: '$120.00', status: 'Placed', date: '7/13/2026' },
    { id: '#B5D39E', name: 'Sarah Connor', email: 'sarah.c@gmail.com', items: 5, total: '$350.00', status: 'Assigned', date: '7/13/2026' },
    { id: '#E9C41A', name: 'Alex Mercer', email: 'alex.m@outlook.com', items: 1, total: '$85.00', status: 'Assigned', date: '7/12/2026' }
];

function Dashboard({ onOrders }) {
    return (
        <div className="w-full! flex! flex-col! gap-8!">
            
            {/* 📊 الجزء الأول: الـ 4 كروت العلوية (Stats Grid) */}
            <div className="grid! grid-cols-1 sm:grid-cols-2! lg:grid-cols-4! gap-5!">
                {STATS_DATA.map((card) => (
                    <div 
                        key={card.id} 
                        className="bg-white! border! border-zinc-100! rounded-2xl! p-5! flex! items-center! justify-between! shadow-[0_2px_8px_rgba(0,0,0,0.01)]!"
                    >
                        <div className="flex! flex-col! gap-1!">
                            <span className="text-xl! font-bold! text-zinc-900!">{card.value}</span>
                            <span className="text-[11px]! font-bold! text-zinc-400!">{card.title}</span>
                        </div>
                        <div className={`size-9! rounded-xl! flex! items-center! justify-center! ${card.bgColor} ${card.textColor}`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* 📋 الجزء الثاني: جدول Recent Orders */}
            <div className="bg-white! border! border-zinc-100! rounded-2xl! p-6! shadow-[0_2px_8px_rgba(0,0,0,0.01)]!">
                
                <div className="flex! items-center! justify-between! mb-6!">
                    <h2 className="text-sm! font-bold! text-zinc-900!">Recent Orders</h2>
                    <button 
                        onClick={onOrders}
                        className="text-xs! font-bold! text-[#ff7214]! hover:text-[#e05e0a]! bg-transparent! border-0! cursor-pointer! transition-colors! flex! items-center! gap-1!"
                    >
                        View All <span className="text-[10px]!">→</span>
                    </button>
                </div>

                <div className="overflow-x-auto! [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <table className="w-full! text-left! border-collapse!">
                        <thead>
                            <tr className="border-b! border-zinc-100!">
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Order ID</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Customer</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Items</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Total</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Status</th>
                                <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y! divide-zinc-50!">
                            
                            {RECENT_ORDERS.map((order, index) => (
                                <tr key={index}>
                                    <td className="py-4.5! text-xs! font-bold! text-zinc-400!">{order.id}</td>
                                    <td className="py-4.5!">
                                        <div className="flex! flex-col!">
                                            <span className="text-xs! font-bold! text-zinc-800!">{order.name}</span>
                                            <span className="text-[10px]! text-zinc-400! font-medium!">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4.5! text-xs! font-bold! text-zinc-500!">{order.items} {order.items === 1 ? 'item' : 'items'}</td>
                                    <td className="py-4.5! text-xs! font-bold! text-zinc-900!">{order.total}</td>
                                    <td className="py-4.5!">
                                        {(() => {
                                            let statusStyles = 'bg-blue-50! text-blue-600!';

                                            if (order.status === 'Placed') {
                                                statusStyles = 'bg-purple-50! text-purple-600!';
                                            } else if (order.status === 'Assigned') {
                                                statusStyles = 'bg-zinc-50! text-zinc-600!';
                                            }

                                            return (
                                                <span className={`px-2.5! py-1! text-[9px]! font-bold! rounded-md! ${statusStyles}`}>
                                                    {order.status}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td className="py-4.5! text-xs! font-bold! text-zinc-500!">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;