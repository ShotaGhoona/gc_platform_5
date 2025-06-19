import React from 'react';

type CommonButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  className?: string;
};

export default function CommonButton({
  onClick,
  icon,
  label,
  disabled = false,
  className = '',
}: CommonButtonProps) {
  return (
    <div className='flex items-center'>

      <button
        type="button"
        className={`rounded-lg px-4 py-2 flex items-center gap-2 shadow-md ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={disabled ? undefined : onClick}
        >
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </button>
    </div>
  );
};
