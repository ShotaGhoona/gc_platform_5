'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const groups: { title: string; links: { href: string; label: string; icon: string }[] }[] = [
  {
    title: 'Home',
    links: [
      { href: '/home', label: 'Home', icon: '/svg/sidebarIcon/home.svg' },
      { href: '/dashboard', label: 'Dashboard', icon: '/svg/sidebarIcon/dashboard.svg' },
    ],
  },
  {
    title: 'Morning',
    links: [
      { href: '/ranking', label: 'Ranking', icon: '/svg/sidebarIcon/ranking.svg' },
      { href: '/month', label: 'Month', icon: '/svg/sidebarIcon/month.svg' },
      { href: '/morning-event', label: 'Morning Event', icon: '/svg/sidebarIcon/externalEvents.svg' },
    ],
  },
  {
    title: 'Knowledge',
    links: [
      { href: '/knowledge/tech', label: 'Technology', icon: '/svg/sidebarIcon/analysis.svg' },
      { href: '/knowledge/leadership', label: 'Leadership', icon: '/svg/sidebarIcon/analysis.svg' },
      { href: '/knowledge/management', label: 'Management', icon: '/svg/sidebarIcon/analysis.svg' },
    ],
  },
  {
    title: 'Information',
    links: [{ href: '/information/events', label: 'Events', icon: '/svg/sidebarIcon/externalEvents.svg' }],
  },
  {
    title: 'Member',
    links: [{ href: '/members', label: 'GhoonaCamper', icon: '/svg/sidebarIcon/analysis.svg' }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[64px] hover:w-[200px] h-screen bg-[#5D6B80] text-white transition-all duration-300 ease-in-out group shadow-[10px_0_10px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-2 p-[8px]">
        <div className="flex items-center gap-2 h-[75px] p-[4px]">
          <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-[30px] h-[30px]" />
          <span className="font-bold text-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Ghoona Camp</span>
        </div>
      </div>

      <nav>
        {groups.map((g) => (
          <div key={g.title} className="border-b border-[#374559] p-[8px]">
            {/* <p className="text-base text-[#374559] font-semibold mb-1 px-2">
              {g.title}
            </p> */}
            {g.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'flex items-center p-[8px] rounded-lg text-sm',
                  pathname === l.href
                    ? 'bg-primary text-white'
                    : 'hover:bg-slate-600'
                )}
              >
                <img src={l.icon} alt={l.label} className="w-[24px] h-[24px] text-[#374559]" />
                <span className="ml-[12px] text-[15px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{l.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
