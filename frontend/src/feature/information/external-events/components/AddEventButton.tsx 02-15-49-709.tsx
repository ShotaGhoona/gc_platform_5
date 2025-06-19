import { FaPlus } from "react-icons/fa";

type AddEventButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const AddEventButton = ({ onClick, disabled }: AddEventButtonProps) => (
  <button className="bg-[#5D6B80] text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={onClick} disabled={disabled}>
    <FaPlus />
      Add Event
    </button>
);
