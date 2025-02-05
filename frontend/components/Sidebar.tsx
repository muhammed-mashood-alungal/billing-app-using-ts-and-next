import React from 'react';
import { Home, DollarSign, Users, FileText, Settings, PieChart  } from 'lucide-react';
import Link from 'next/link';

 const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: Home, href: '/' },
    { title: 'Products', icon: FileText, href: '/products' },
    { title: 'Billing Desk', icon: DollarSign, href: '/billing' },
    { title: 'Customers', icon: Users, href: '/customers' },
    { title: 'Reports', icon: PieChart, href: '/reports' },
    { title: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">BillPro</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link 
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar