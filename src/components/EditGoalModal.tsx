'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMonthlyGoals } from '../hooks/useMonthlyGoals';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { GoalList } from '../components/GoalList';
type EditGoalModalProps = {
  onClose: () => void;
  addMonth?: string; // 追加対象の月（YYYY-MM形式）
};

type LocalGoal = {
  id?: number;
  text: string;
  isPublic: boolean;
  isEditing?: boolean;
  toDelete?: boolean;
};

export const EditGoalModal = ({ onClose, addMonth }: EditGoalModalProps) => {
  const { user } = useUser();
  const userId = user?.id;
  const {
    goals,
    isLoading,
    error,
    addGoal,
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
        text: g.goal_text,
        isPublic: g.is_public,
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
  const updateGoal = (idx: number, field: 'text' | 'isPublic', value: string | boolean) => {
    setLocalGoals((prev) =>
      prev.map((g, i) =>
        i === idx ? { ...g, [field]: value } : g
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

  // 目標追加
  const addLocalGoal = () => {
    setLocalGoals((prev) => [
      ...prev,
      { text: '', isPublic: true, isEditing: true },
    ]);
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
    // 削除: 既存goalsに存在し、localGoalsでtoDeleteがtrueのもののみ
    for (let i = 0; i < goals.length; i++) {
      const g = goals[i];
      const local = localGoals.find((lg) => lg.id === g.id);
      if (local && local.toDelete) {
        await removeGoal(g.id);
      }
    }
    // 更新: 既存goalsに存在し、toDeleteでなく内容が変わったもの
    for (let i = 0; i < goals.length; i++) {
      const g = goals[i];
      const local = localGoals.find((lg) => lg.id === g.id);
      if (local && !local.toDelete && (local.text !== g.goal_text || local.isPublic !== g.is_public)) {
        await editGoal(g.id, local.text, local.isPublic, g.monthly_start_date);
      }
    }
    // 新規追加: idなし、toDeleteでなく、テキストあり
    for (let i = 0; i < localGoals.length; i++) {
      const lg = localGoals[i];
      if (!lg.id && !lg.toDelete && lg.text.trim()) {
        // 新規追加時はaddMonthの1日をセット
        let monthly_start_date: string;
        if (addMonth) {
          monthly_start_date = `${addMonth}-01`;
        } else {
          const now = new Date();
          monthly_start_date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        }
        await addGoal(lg.text, lg.isPublic, monthly_start_date);
      }
    }
    await refetch();
    setSaving(false);
    onClose();
  };

  // メンバーの目標リスト表示状態
  const [showGoalList, setShowGoalList] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className='flex h-full'>
      {showGoalList && 
        <div className='w-[40%] h-full min-h-0 rounded-lg p-5 flex flex-col bg-gray-100'>
          <GoalList />
        </div>
      }

      
      <div className="flex-1 h-full flex flex-col justify-between px-8 py-8">
        {/* タイトル */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="border-l-4 border-[#5F7392] mr-3 pl-2">
            {addMonth
              ? `${parseInt(addMonth.split("-")[1])}月の目標設定`
              : "今月の目標設定"}
          </span>
        </h2>
        {/* ビジョン */}
        <div className="w-full border border-gray-300 rounded-lg p-5 flex flex-col mb-4 bg-white">
          <p className="text-sm text-gray-400 mb-2">将来なりたい姿・ビジョン</p>
          <p className="text-2xl font-bold text-center flex items-center justify-center text-[#9B5B6B]">
            <span className="text-[#9B5B6B]">AIの民主化によって世界を、生活を、1段階進化させる</span>
          </p>
        </div>
        {/* 目標リスト */}
        <div className="flex-1 w-full flex flex-col gap-3 mb-8">
          <div className="flex justify-end pr-5 text-xs text-gray-500">公開</div>
          {localGoals.map((goal, idx) =>
            goal.toDelete ? (
              <div
                key={idx}
                className="flex items-center rounded-lg px-6 py-3 bg-gray-200 opacity-50"
              >
                <span className="flex-1 text-lg font-bold text-gray-400 line-through">{goal.text}</span>
                <button
                  className="ml-2 text-blue-400 hover:text-blue-600"
                  onClick={() => restoreLocalGoal(idx)}
                >
                  取消
                </button>
              </div>
            ) : (
              <div
                key={idx}
                className={`flex items-center rounded-lg px-6 py-3 bg-gray-100 ${goal.isEditing ? 'ring-2 ring-[#5F7392]' : ''}`}
              >
                {goal.isEditing ? (
                  <>
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-lg font-bold outline-none"
                      value={goal.text}
                      onChange={(e) => updateGoal(idx, 'text', e.target.value)}
                      onBlur={() => confirmEdit(idx)}
                      autoFocus
                    />
                    <button
                      className="ml-2 text-gray-400 hover:text-red-500"
                      onClick={() => deleteLocalGoal(idx)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="mr-3 text-gray-400 hover:text-[#5F7392] focus:outline-none"
                      onClick={() => startEdit(idx)}
                      tabIndex={-1}
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <span className="flex-1 text-lg font-bold text-gray-600">{goal.text}</span>
                    <button
                      className="ml-2 text-gray-400 hover:text-red-500"
                      onClick={() => deleteLocalGoal(idx)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </>
                )}
                {/* 公開設定（常時表示） */}
                <input
                  type="checkbox"
                  className="ml-4 w-5 h-5 accent-[#5F7392]"
                  checked={goal.isPublic}
                  onChange={(e) => updateGoal(idx, 'isPublic', e.target.checked)}
                />
              </div>
            )
          )}
          {/* 追加ボタン */}
          <button
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-400 font-bold text-lg mt-2 cursor-pointer hover:bg-gray-200"
            onClick={addLocalGoal}
          >
            <FiPlus size={22} />
            目標を追加
          </button>
        </div>
        {/* 保存ボタン */}
        <div className="flex justify-between mt-8">
          {/* メンバーの目標を見るボタン */}
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={() => setShowGoalList((prev) => !prev)}
          >
            {showGoalList ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
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
        {/* エラーメッセージ */}
        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
};
