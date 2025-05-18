'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IoIosSettings } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';
import { MdEmojiEvents, MdCalendarMonth, MdSpaceDashboard } from 'react-icons/md';
import { FaLightbulb, FaSun } from 'react-icons/fa';
import { TbCardsFilled } from 'react-icons/tb';
import { GiGoalKeeper } from 'react-icons/gi';
import { PiRankingFill } from 'react-icons/pi';
import { IoHome } from 'react-icons/io5';
import React from 'react';

const groups: { title: string; links: { href: string; label: string; icon: React.ReactElement }[] }[] = [
  {
    title: 'Home',
    links: [
      { href: '/home', label: 'Home', icon: <IoHome /> },
      { href: '/dashboard', label: 'Dashboard', icon: <MdSpaceDashboard /> },
    ],
  },
  {
    title: 'Morning',
    links: [
      { href: '/ranking', label: 'Ranking', icon: <PiRankingFill /> },
      { href: '/month-analysis', label: 'Month Analysis', icon: <MdCalendarMonth /> },
      { href: '/morning-event', label: 'Morning Event', icon: <FaSun /> },
      { href: '/monthly-goal', label: 'Goal', icon: <GiGoalKeeper /> },
      { href: '/tier-card', label: 'Tier Card', icon: <TbCardsFilled /> },
    ],
  },
  {
    title: 'Knowledge',
    links: [
      { href: '/knowledge/tech', label: 'Technology', icon: <FaLightbulb /> },
      { href: '/knowledge/leadership', label: 'Leadership', icon: <FaLightbulb /> },
      { href: '/knowledge/management', label: 'Management', icon: <FaLightbulb /> },
    ],
  },
  {
    title: 'Information',
    links: [
      { href: '/external-events', label: 'External Events', icon: <MdEmojiEvents /> },
    ],
  },
  {
    title: 'Member',
    links: [
      { href: '/member', label: 'GhoonaCamper', icon: <RiTeamFill /> },
      { href: '/profile-setting', label: 'Settings', icon: <IoIosSettings />}
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[64px] hover:w-[200px] min-h-screen h-full bg-[#5D6B80] text-white transition-all duration-300 ease-in-out group shadow-[10px_0_10px_rgba(0,0,0,0.1)] relative">
      <div className="flex flex-col gap-2 p-[8px]">
        <div className="flex items-center gap-2 h-[75px] p-[4px]">
          <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-[30px] h-[30px]" />
          <span className="font-bold text-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Ghoona Camp</span>
        </div>
      </div>

      <nav>
        {groups.map((g) => (
          <div key={g.title} className="border-b border-[#374559] p-[8px]">
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
                <div
                  className={clsx(
                    "w-[24px] h-[24px] text-white",
                    pathname !== l.href && "opacity-60"
                  )}
                >
                  {React.cloneElement(l.icon as any, { size: 24 })}
                </div>
                <span className="ml-[12px] text-[15px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{l.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
