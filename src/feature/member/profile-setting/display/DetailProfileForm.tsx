'use client';

import { useInterestCoreskillTags } from "../hooks/useInterestCoreskillTags";
import { ProfileResponse } from "../types/profile";

type Props = {
  profile: ProfileResponse | null;
  selectedInterests: number[];
  selectedCoreSkills: number[];
  onChangeInterests: (ids: number[]) => void;
  onChangeCoreSkills: (ids: number[]) => void;
  isLoading: boolean;
  error: string | null;
};

export const DetailProfileForm = ({
  profile,
  selectedInterests,
  selectedCoreSkills,
  onChangeInterests,
  onChangeCoreSkills,
  isLoading,
  error,
}: Props) => {
  const { interests, coreSkills } = useInterestCoreskillTags();

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      onChangeInterests(selectedInterests.filter((i) => i !== id));
    } else {
      onChangeInterests([...selectedInterests, id]);
    }
  };

  const toggleCoreSkill = (id: number) => {
    if (selectedCoreSkills.includes(id)) {
      onChangeCoreSkills(selectedCoreSkills.filter((i) => i !== id));
    } else {
      onChangeCoreSkills([...selectedCoreSkills, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* What I'm Into */}
      <div className="space-y-4">
        <label className="block text-base font-bold text-gray-700">
          What I'm Into
        </label>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedInterests.includes(interest.id)
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-800 hover:bg-pink-200"
              }`}
            >
              {interest.name}
            </button>
          ))}
        </div>
      </div>
      {/* Core Skill Set */}
      <div className="space-y-4">
        <label className="block text-base font-bold text-gray-700">
          Core Skill Set
        </label>
        <div className="flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => toggleCoreSkill(skill.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCoreSkills.includes(skill.id)
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>
      {/* SNSリンク */}
      {/* <div className="space-y-4">
        <button
          type="button"
          className="flex items-center w-full text-left"
          disabled
        >
          <h3 className="text-base font-bold text-gray-900">SNSリンク（任意）</h3>
          <span className="text-gray-500 ml-2">▶</span>
        </button>
      </div> */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
