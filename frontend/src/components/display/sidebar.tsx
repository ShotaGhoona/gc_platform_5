'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';
import { groups } from "@/components/constants/routes";
import { IoIosSettings } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';
import { MdEmojiEvents, MdCalendarMonth, MdSpaceDashboard } from 'react-icons/md';
import { FaLightbulb } from 'react-icons/fa';
import { PiCardholderFill } from 'react-icons/pi';
import { GiGoalKeeper } from 'react-icons/gi';
import { PiRankingFill } from 'react-icons/pi';
import { IoHome } from 'react-icons/io5';
import { BiSolidParty } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';

const iconMap: Record<string, React.ReactElement<{ size?: number }>> = {
  IoHome: <IoHome />,
  MdSpaceDashboard: <MdSpaceDashboard />,
  PiRankingFill: <PiRankingFill />,
  MdCalendarMonth: <MdCalendarMonth />,
  BiSolidParty: <BiSolidParty />,
  GiGoalKeeper: <GiGoalKeeper />,
  PiCardholderFill: <PiCardholderFill />, 
  BsFire: <BsFire />,
  FaLightbulb: <FaLightbulb />,
  MdEmojiEvents: <MdEmojiEvents />,
  RiTeamFill: <RiTeamFill />,
  IoIosSettings: <IoIosSettings />,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[64px] hover:w-[200px] min-h-screen h-full bg-sidebar-bg text-sidebar-text transition-all duration-300 ease-in-out group shadow-[10px_0_10px_rgba(0,0,0,0.1)] relative">
      <div className="flex flex-col gap-2 p-[8px]">
        <div className="flex items-center gap-2 h-[75px] p-[4px]">
          <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-[30px] h-[30px]" />
          <span className="font-bold text-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Ghoona Camp</span>
        </div>
      </div>

      <nav>
        {groups.map((g) => (
          <div key={g.title} className="border-b border-sidebar-border p-[8px]">
            {g.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'flex items-center p-[8px] rounded-lg text-sm transition-colors',
                  pathname === l.href
                    ? 'bg-sidebar-hover text-sidebar-active'
                    : 'hover:bg-sidebar-hover'
                )}
              >
                <div
                  className={clsx(
                    "w-[24px] h-[24px] transition-colors",
                    pathname !== l.href 
                      ? "text-sidebar-text"
                      : "text-sidebar-active"
                  )}
                >
                  {iconMap[l.icon] && React.cloneElement(iconMap[l.icon], { size: 24 })}
                </div>
                <span
                  className={clsx(
                    "ml-[12px] text-[15px] opacity-0 group-hover:opacity-100 font-semibold transition-opacity delay-100 whitespace-nowrap",
                    pathname === l.href
                      ? "text-sidebar-active"
                      : "text-sidebar-text"
                  )}
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
