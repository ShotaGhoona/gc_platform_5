import { MorningEventListItem } from "../services/morningEventService";
type Props = {
  events: MorningEventListItem[];
  openSidePeak: (eventId: string) => void;
};

export default function MorningEventGalleryView({ events, openSidePeak }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {events.map((event) => (
        <div
          key={event.id}
          className={`flex flex-col gap-2 p-3 rounded-lg cursor-pointer relative shadow-md ${
            event.is_participating ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => openSidePeak(event.id)}
        >
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <p
                key={tag.id}
                className="text-[10px] text-gray-500 rounded-full px-4 py-1"
                style={{ backgroundColor: tag.color || "#f3f4f6" }}
              >
                {tag.name}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 bg-white rounded-lg px-2 py-1">
              {(() => {
                // duration計算
                try {
                  const { calcDuration, durationLabel } = require("../utils/timeUtils");
                  const min = calcDuration(event.start_at, event.end_at);
                  return durationLabel(min);
                } catch {
                  return "";
                }
              })()}
            </span>
            <p className="text-sm text-gray-500">{event.start_at.replace("T", " ").slice(5, 16)}</p>
          </div>
          
          <div className="flex gap-2 items-center">
            <img
              src={event.host_avatar_image_url}
              alt=""
              className="w-5 h-5 rounded-full"
            />
            <h2 className="text-lg font-bold">{event.title}</h2>
          </div>
          <div className="absolute top-0 right-0">
            {event.is_participating === true && (
              <p
                className="text-sm text-gray-500 w-20 h-15 rounded-tr-lg flex items-start justify-end p-3 font-bold"
                style={{ backgroundColor: "#5D6B80", color: "white", clipPath: "circle(75% at 67% 3%)" }}
              >
                Joined
              </p>
            )}
          </div>
          {/* <p className="text-sm text-gray-500">{event.description}</p> */}
        </div>
      ))}
    </div>
  );
}
