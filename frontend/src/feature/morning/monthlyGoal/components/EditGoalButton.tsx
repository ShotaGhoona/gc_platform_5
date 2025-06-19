type EditGoalButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const EditGoalButton = ({ onClick, disabled }: EditGoalButtonProps) => (
  <button
    className="px-8 py-2 rounded bg-[#5F7392] text-white font-bold"
    onClick={onClick}
    disabled={disabled}
  >
    FeedBack Edit
  </button>
);
