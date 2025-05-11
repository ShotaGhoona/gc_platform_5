'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMonthlyGoals } from '../hooks/useMonthlyGoals';
import { FiTrash2 } from 'react-icons/fi';

type EditFbModalProps = {
  onClose: () => void;
  addMonth?: string; // 編集対象の月（YYYY-MM形式）
};

type LocalGoal = {
  id: number;
  fb: string;
  isEditing?: boolean;
  toDelete?: boolean;
};

export const EditFbModal = ({ onClose, addMonth }: EditFbModalProps) => {
  const { user } = useUser();
  const userId = user?.id;
  const {
    goals,
    isLoading,
    error,
    editGoal,
    removeGoal,
    refetch,
  } = useMonthlyGoals(userId, addMonth);

  // ローカル編集用状態
  const [localGoals, setLocalGoals] = useState<LocalGoal[]>([]);
  const [saving, setSaving] = useState(false);

  // 初期化: goalsが変わったらローカルも更新
  useEffect(() => {
    setLocalGoals(
      goals.map((g) => ({
        id: g.id,
        fb: g.fb || "",
        isEditing: false,
        toDelete: false,
      }))
    );
  }, [goals]);

  // 編集開始
  const startEdit = (idx: number) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, isEditing: true } : { ...g, isEditing: false }
      )
    );
  };

  // 編集内容変更
  const updateFb = (idx: number, value: string) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, fb: value } : g
      )
    );
  };

  // 編集確定
  const confirmEdit = (idx: number) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, isEditing: false } : g
      )
    );
  };

  // 目標削除（フラグのみ）
  const deleteLocalGoal = (idx: number) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, toDelete: true } : g
      )
    );
  };

  // 目標復元
  const restoreLocalGoal = (idx: number) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, toDelete: false } : g
      )
    );
  };

  // 保存
  const handleSave = async () => {
    setSaving(true);
    // 削除
    for (let i = 0; i < goals.length; i++) {
      const g = goals[i];
      const local = localGoals.find((lg) => lg.id === g.id);
      if (local && local.toDelete) {
        await removeGoal(g.id);
      }
    }
    // FB更新
    for (let i = 0; i < goals.length; i++) {
      const g = goals[i];
      const local = localGoals.find((lg) => lg.id === g.id);
      if (local && !local.toDelete && local.fb !== (g.fb || "")) {
        await editGoal(g.id, g.goal_text, g.is_public, g.monthly_start_date, local.fb);
      }
    }
    await refetch();
    setSaving(false);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="border-l-4 border-[#5F7392] mr-3 pl-2">
          {addMonth
            ? `${parseInt(addMonth.split("-")[1])}月のフィードバック`
            : "今月のFB編集"}
        </span>
      </h2>
      <div className="flex-1 flex flex-col gap-3 mb-8">
        {localGoals.length === 0 && <div className="text-gray-400">目標がありません</div>}
        {localGoals.map((goal, idx) =>
          goal.toDelete ? (
            <div
              key={goal.id}
              className="flex items-center rounded-lg px-6 py-3 bg-gray-200 opacity-50"
            >
              <span className="flex-1 text-lg font-bold text-gray-400 line-through">削除予定</span>
              <button
                className="ml-2 text-blue-400 hover:text-blue-600"
                onClick={() => restoreLocalGoal(idx)}
              >
                取消
              </button>
            </div>
          ) : (
            <div key={goal.id} className="flex w-full justify-between rounded-lg px-6 py-3 bg-gray-100 min-h-[150px]">
              <div className="w-full">
                <span className="flex-1 flex text-2xl border-b-2 border-gray-200 w-full font-bold text-gray-600 p-2">
                  {goals.find((g) => g.id === goal.id)?.goal_text}
                </span>
                {goal.isEditing ? (
                  <>
                    <textarea
                      className="flex-1 p-2 w-full"
                      value={goal.fb}
                      onChange={(e) => updateFb(idx, e.target.value)}
                      onBlur={() => confirmEdit(idx)}
                      autoFocus
                      rows={3}
                    />
                  </>
                ) : (
                  <div>
                    <span
                      className="flex-1 text-gray-500 cursor-pointer p-2 w-full"
                      onClick={() => startEdit(idx)}
                    >
                      {goal.fb || "FBを入力"}
                    </span>
                  </div>
                )}
              </div>
              <button
                className="ml-2 text-gray-400 hover:text-red-500"
                onClick={() => deleteLocalGoal(idx)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          )
        )}
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-2 rounded-full text-lg font-bold ${
            saving
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#5F7392] text-white hover:bg-[#4D5B70]'
          }`}
        >
          保存
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
};
