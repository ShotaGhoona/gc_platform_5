'use client';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface StepIndicatorProps {
  currentStep: string;
}

 
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

const PROFILE_STEPS = [
  { id: 'basic', number: 1, title: '基本情報' },
  { id: 'detail', number: 2, title: '詳細情報' },
  { id: 'confirm', number: 3, title: '確認' },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {PROFILE_STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* ステップサークル */}
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold relative',
              currentStep === step.id
                ? 'bg-[#D68897] text-white'
                : 'bg-[#374559] text-white'
            )}
          >
            {step.number}
            {/* ステップタイトル */}
            <div className="text-center absolute -bottom-8 w-32">
              <span className="text-sm font-medium text-gray-700">{step.title}</span>
            </div>
          </div>

          {/* 接続線 */}
          {index < PROFILE_STEPS.length - 1 && (
            <div
              className={cn(
                'h-[2px] w-32 mx-4',
                currentStep === PROFILE_STEPS[index + 1].id || currentStep === step.id
                  ? 'bg-[#D68897]'
                  : 'bg-[#374559]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
