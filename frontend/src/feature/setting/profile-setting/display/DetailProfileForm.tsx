'use client';

import { useState } from "react";
import { useInterestCoreskillTags } from "../hooks/useInterestCoreskillTags";
import { ProfileResponse } from "../types/profile";

type Props = {
  profile: ProfileResponse | null;
  selectedInterests: number[];
  selectedCoreSkills: number[];
  customInterests: string[];
  customCoreSkills: string[];
  onChangeInterests: (ids: number[]) => void;
  onChangeCoreSkills: (ids: number[]) => void;
  onChangeCustomInterests: (items: string[]) => void;
  onChangeCustomCoreSkills: (items: string[]) => void;
  isLoading: boolean;
  error: string | null;
};

export const DetailProfileForm = ({
  profile,
  selectedInterests,
  selectedCoreSkills,
  customInterests,
  customCoreSkills,
  onChangeInterests,
  onChangeCoreSkills,
  onChangeCustomInterests,
  onChangeCustomCoreSkills,
  isLoading,
  error,
}: Props) => {
  const { interests, coreSkills } = useInterestCoreskillTags();
  const [newInterest, setNewInterest] = useState("");
  const [newCoreSkill, setNewCoreSkill] = useState("");

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

  const addCustomInterest = () => {
    if (newInterest.trim() && !customInterests.includes(newInterest.trim())) {
      onChangeCustomInterests([...customInterests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeCustomInterest = (item: string) => {
    onChangeCustomInterests(customInterests.filter(i => i !== item));
  };

  const addCustomCoreSkill = () => {
    if (newCoreSkill.trim() && !customCoreSkills.includes(newCoreSkill.trim())) {
      onChangeCustomCoreSkills([...customCoreSkills, newCoreSkill.trim()]);
      setNewCoreSkill("");
    }
  };

  const removeCustomCoreSkill = (item: string) => {
    onChangeCustomCoreSkills(customCoreSkills.filter(s => s !== item));
  };

  return (
    <div className="space-y-8">
      {/* What I'm Into */}
      <div className="space-y-4">
        <label className="block text-base font-bold text-gray-700">
          What I'm Into
        </label>
        
        {/* 予定の選択肢 */}
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

        {/* カスタム項目表示 */}
        {customInterests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customInterests.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-pink-500 text-white flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeCustomInterest(item)}
                  className="text-white hover:text-pink-200 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 自由入力 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
            placeholder="独自の興味・関心を追加"
            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-pink-500"
            maxLength={20}
          />
          <button
            type="button"
            onClick={addCustomInterest}
            className="px-3 py-1 bg-pink-500 text-white rounded text-sm hover:bg-pink-600 transition-colors"
          >
            追加
          </button>
        </div>
      </div>
      {/* Core Skill Set */}
      <div className="space-y-4">
        <label className="block text-base font-bold text-gray-700">
          Core Skill Set
        </label>
        
        {/* 予定の選択肢 */}
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

        {/* カスタム項目表示 */}
        {customCoreSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customCoreSkills.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-blue-500 text-white flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeCustomCoreSkill(item)}
                  className="text-white hover:text-blue-200 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 自由入力 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCoreSkill}
            onChange={(e) => setNewCoreSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomCoreSkill()}
            placeholder="独自のスキルを追加"
            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            maxLength={20}
          />
          <button
            type="button"
            onClick={addCustomCoreSkill}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            追加
          </button>
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
    </div>
  );
};
