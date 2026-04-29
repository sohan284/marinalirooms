"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  Heart,
  CheckCircle2,
  Menu,
  X,
  ShieldCheck,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const pages = [
    { name: "Home", href: "/admin/content/home", icon: Home },
    { name: "Thank You", href: "/admin/content/thank-you", icon: Heart },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const NavLink = ({ href, icon: Icon, children, exact = false }: any) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
          ${isActive
            ? 'bg-blue-50 text-blue-900 shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
        `}
      >
        <Icon size={18} className={isActive ? "text-blue-500" : "text-slate-400"} />
        {children}
      </Link>
    );
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Mobile Header */}
      <header className="md:hidden p-4 bg-white border-b flex justify-between items-center z-50 sticky top-0">
        <h1 className="font-bold text-lg">Marinali Admin</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
            <LogOut size={20} />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 w-72 bg-white border-r shadow-sm z-40 transition-all duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20'}
        md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className={`font-bold text-xl transition-opacity duration-300 ${!isSidebarOpen ? 'md:opacity-0' : 'opacity-100'}`}>
            Marinali Admin
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex cursor-pointer p-1.5 -ml-20 z-20 shadow border rounded-lg text-slate-400"
          >
            {isSidebarOpen ? <ChevronDown className="rotate-90" size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {/* <NavLink href="/admin" icon={LayoutDashboard} exact={true}>
            {isSidebarOpen && "Dashboard"}
          </NavLink> */}

          {/* Manage Content Direct Link */}
          <div className="mt-2">
            <Link
              href="/admin/content/home"
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${pathname.startsWith('/admin/content') ? 'bg-blue-50 text-blue-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <FileText size={18} className={pathname.startsWith('/admin/content') ? "text-blue-500" : "text-slate-400"} />
              {isSidebarOpen && "Manage Content"}
            </Link>

            {/* Subpages (Only shown when sidebar is open and on a content route) */}
            {isSidebarOpen && pathname.startsWith('/admin/content') && (
              <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-slate-100 pl-2">
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className={`
                      px-4 py-2 rounded-lg text-sm transition-all
                      ${pathname === page.href
                        ? 'text-blue-900 font-semibold bg-blue-50/50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
                    `}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink href="/admin/settings" icon={Settings} exact={true}>
            {isSidebarOpen && "Settings"}
          </NavLink>

          <NavLink href="/admin/settings/security" icon={ShieldCheck}>
            {isSidebarOpen && "Security"}
          </NavLink>

          <div className="mt-auto pt-4 border-t border-slate-100 space-y-1">
            <Link
              href="/en"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-blue-900 hover:bg-blue-50 transition-all"
            >
              <Globe size={18} />
              {isSidebarOpen && "View Live Site"}
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              {isSidebarOpen && "Logout"}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
