"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  BarChart,
  Settings,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center px-6 h-16 border-b border-gray-200">
      <Link href="/" className="flex items-center">
          <Image
            src="/logo/Spiveslogo coloured.svg"
            alt="Spives Logo"
            width={150}
            height={50}
            className="h-4 border w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-blue-900'
                    : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                }`}
              >
                <div className={`mr-2 transition-all duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-500'
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-black">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
} 