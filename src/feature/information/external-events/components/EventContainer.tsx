import { ExternalEvent } from "../services/externalEventService";

type Props = {
  event: ExternalEvent;
  onClick?: () => void;
};

export default function EventContainer({ event, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-lg p-5 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={event.image || "/images/profile/sampleProfile.png"}
        alt={event.title}
        className="aspect-2/1 object-cover rounded-lg"
      />
      <h2 className="text-base font-bold">{event.title}</h2>
      <p className="text-[12px] line-clamp-3">{event.description}</p>
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
    </div>
  );
}
