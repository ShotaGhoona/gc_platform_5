type AddGoalButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const AddGoalButton = ({ onClick, disabled }: AddGoalButtonProps) => (
  <button
    className="px-8 py-2 rounded bg-gray-200 text-gray-500 font-bold"
    onClick={onClick}
    disabled={disabled}
  >
    Goal Edit
  </button>
);
