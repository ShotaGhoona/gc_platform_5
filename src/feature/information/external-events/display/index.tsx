"use client";
import { FilterButton } from "@/feature/information/external-events/components/FilterButton";
import { AddEventButton } from "@/feature/information/external-events/components/AddEventButton";
import EventList from "@/feature/information/external-events/display/EventList";
import { ExternalEventFilterProvider } from "@/feature/information/external-events/context/ExternalEventFilterContext";
import SelectedTagChips from "@/feature/information/external-events/components/SelectedTagChips";
import { PopUp } from "@/components/display/PopUp";
import { useState } from "react";
import { AddEventModal } from "@/feature/information/external-events/components/AddEventModal";
import { FilterModal } from "@/feature/information/external-events/components/FilterModal";


export default function IndexPage() {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  return (
    <ExternalEventFilterProvider>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center">
            <SelectedTagChips />
          </div>
          <div className="flex gap-2">
            <FilterButton onClick={() => setShowFilterModal(true)} />
            <AddEventButton onClick={() => setShowAddEventModal(true)} />
          </div>
        </div>
        <EventList />

        {/* モーダル */}
        <PopUp isOpen={!!showAddEventModal} onClose={() => setShowAddEventModal(false)}>
          {showAddEventModal && (
            <AddEventModal
              onClose={() => setShowAddEventModal(false)}
            />
          )}
        </PopUp>
        <PopUp isOpen={!!showFilterModal} onClose={() => setShowFilterModal(false)}>
          {showFilterModal && (
            <FilterModal
              onClose={() => setShowFilterModal(false)}
            />
          )}
        </PopUp>
      </div>
    </ExternalEventFilterProvider>
  );
}
