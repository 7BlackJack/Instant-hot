'use client'
import React, { useState, FC } from 'react';
import DashboardContent from './dashboard/dashBoard';
import HotTopics from './hotspot/hotspot';

const COMPONENTS_MAP: { [key: string]: FC } = {
  'Dashboard': DashboardContent,
  'Hotspot': HotTopics,
  // ...其他组件可以在此处添加
};

interface SidebarNavProps {
  items: string[];
  activeItem: string;
  onActiveItemChange: (item: string) => void;
}

const SidebarNav: FC<SidebarNavProps> = ({ items, activeItem, onActiveItemChange }) => (
  <nav>
    {items.map((item) => (
      <span 
        key={item} 
        className={`block py-2.5 px-4 rounded transition duration-200 cursor-pointer ${item === activeItem ? 'bg-purple-700 text-white' : 'hover:bg-purple-700 hover:text-white'}`}
        onClick={() => onActiveItemChange(item)}
      >
        {item}
      </span>
    ))}
  </nav>
);

const Dashboard: FC = () => {
  const mainNavItems = ['Dashboard', 'Hotspot', 'Team', 'Projects', 'Calendar', 'Documents', 'Reports'];
  const teamNavItems = ['Heroicons', 'Tailwind Labs', 'Workcation'];

  const [activeItem, setActiveItem] = useState('Dashboard');
  const ActiveComponent = COMPONENTS_MAP[activeItem] || null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white w-64 px-6 py-4 shadow-md">
        <SidebarNav items={mainNavItems} activeItem={activeItem} onActiveItemChange={setActiveItem} />
        <div className="mt-10">
          <h5 className="text-lg font-semibold mb-3">Your teams</h5>
          <SidebarNav items={teamNavItems} activeItem={activeItem} onActiveItemChange={setActiveItem} />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
