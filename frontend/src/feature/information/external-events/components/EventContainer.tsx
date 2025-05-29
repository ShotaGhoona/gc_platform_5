import { ExternalEvent } from "../services/externalEventService";

type Props = {
  event: ExternalEvent;
  onClick?: () => void;
};

export default function EventContainer({ event, onClick }: Props) {
  return (
    <div
      className="bg-white min-h-[200px] rounded-lg relative flex flex-col gap-2 cursor-pointer shadow-md transition"
      onClick={onClick}
    >
      <img
        src={event.image || "/images/profile/sampleExternalEvent.png"}
        alt={event.title}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-50"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-100 rounded-lg"></div>
      <div className="h-full flex flex-col justify-between p-5 z-1">
        <div className="flex gap-2 flex-wrap">
            {event.tags.map((tag) => (
              <div
              key={tag.id}
              className="rounded-lg px-2 py-1 text-[10px]"
              style={{ backgroundColor: tag.color || "#eee" }}
              >
                {tag.name}
              </div>
            ))}
        </div>
        <h2 className="text-base font-bold">{event.title}</h2>
        {/* <p className="text-[12px] line-clamp-3 z-5">{event.description}</p> */}
      </div>
    </div>
  );
}
