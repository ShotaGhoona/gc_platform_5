import { FaFilter } from "react-icons/fa";

type FilterButtonProps = {
    onClick: () => void;
    disabled?: boolean;
  };
  
  export const FilterButton = ({ onClick, disabled }: FilterButtonProps) => (
    <button
      className="px-8 py-2 rounded bg-white text-gray-500 font-bold flex items-center gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      <FaFilter />
      Filter
    </button>
  );
  