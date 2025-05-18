'use client';
import { useState, useEffect } from "react";
import { StepIndicator } from "../components/StepIndicator";
import { BasicProfileForm } from "./BasicProfileForm";
import { DetailProfileForm } from "./DetailProfileForm";
import { ConfirmationView } from "./ConfirmationView";
import { useProfileForm } from "../hooks/useProfileForm";
import { useUser } from "@clerk/nextjs";
import { ProfileUpdateRequest } from "../types/profile";
import { ProfilePreview } from "../components/Preview";
import { supabase } from "../services/supabaseClient";
type Step = "basic" | "detail" | "confirm";

export default function ProfileSetting() {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const {
    profile,
    isLoading,
    error,
    save,
    setAvatar,
    avatarFile,
    refetch,
  } = useProfileForm(user?.id || "");

  // interest/coreSkill選択状態
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedCoreSkills, setSelectedCoreSkills] = useState<number[]>([]);

  // BasicProfileFormの編集値
  const [basicForm, setBasicForm] = useState<Partial<ProfileUpdateRequest>>({});

  // profile取得時に初期選択状態・初期値を反映
  useEffect(() => {
    if (profile) {
      setSelectedInterests(
        Array.isArray(profile.interests)
          ? profile.interests.map((i: any) => typeof i === "object" ? i.id : i)
          : []
      );
      setSelectedCoreSkills(
        Array.isArray(profile.coreSkills)
          ? profile.coreSkills.map((s: any) => typeof s === "object" ? s.id : s)
          : []
      );
      setBasicForm({
        username: profile.username,
        bio: profile.bio,
        one_line_profile: profile.oneLine ?? "",
        background: profile.background ?? "",
        avatar_image_url: profile.avatarImageUrl ?? "",
      });
    }
  }, [profile]);

  const handleNextStep = () => {
    if (currentStep === "basic") setCurrentStep("detail");
    else if (currentStep === "detail") setCurrentStep("confirm");
  };
  const handlePrevStep = () => {
    if (currentStep === "detail") setCurrentStep("basic");
    else if (currentStep === "confirm") setCurrentStep("detail");
  };

  // BasicProfileFormのonChange
  const handleBasicFormChange = (fields: Partial<ProfileUpdateRequest>) => {
    setBasicForm((prev) => ({ ...prev, ...fields }));
  };

  // プレビュー用データ
  const formData = {
    id: profile?.id || "",
    userId: profile?.userId || "",
    username: basicForm.username || profile?.username || "",
    bio: basicForm.bio || profile?.bio || "",
    oneLine: basicForm.one_line_profile || profile?.oneLine || "",
    background: basicForm.background || profile?.background || "",
    interests: selectedInterests.map(id => String(id)),
    coreSkills: selectedCoreSkills.map(id => String(id)),
    websiteUrl: profile?.websiteUrl || "",
    xUrl: profile?.xUrl || "",
    instagramUrl: profile?.instagramUrl || "",
    linkedinUrl: profile?.linkedinUrl || "",
    createdAt: profile?.createdAt || "",
    updatedAt: profile?.updatedAt || "",
    avatarImageUrl: avatarFile
      ? URL.createObjectURL(avatarFile)
      : basicForm.avatar_image_url || profile?.avatarImageUrl || "",
  };

  // 確認画面で保存
  const handleSave = async () => {
    let avatarUrl = basicForm.avatar_image_url || profile?.avatarImageUrl || '';
  
    if (avatarFile) {
      const ext      = avatarFile.name.split('.').pop()?.toLowerCase() || 'png';
      const filePath = `avatars/${user?.id}_${Date.now()}.${ext}`;
  
      const { error, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });
  
      if (error) {
        alert('画像アップロードに失敗しました: ' + error.message);
        return;
      }
  
      avatarUrl = supabase
        .storage
        .from('avatars')
        .getPublicUrl(data.path).data.publicUrl;
    }
  
    await save({
      ...basicForm,
      interests: selectedInterests,
      core_skills: selectedCoreSkills,
      avatar_image_url: avatarUrl,
    });
  };

  return (
    <div className="flex h-full gap-10">
      {/* 左側：フォーム */}
      <div className="w-1/2 p-8 bg-white rounded-lg h-full flex flex-col shadow-lg">
        {/* ステップインジケーター */}
        <div className="border-b-5 border-[#f9f9f9]">
          <StepIndicator currentStep={currentStep} />
        </div>
        {/* フォームコンテンツ */}
        <div className="mt-8 flex-1">
          {currentStep === "basic" && (
            <BasicProfileForm
              profile={profile}
              isLoading={isLoading}
              error={error}
              setAvatar={setAvatar}
              avatarFile={avatarFile}
              form={basicForm}
              onChange={handleBasicFormChange}
            />
          )}
          {currentStep === "detail" && (
            <DetailProfileForm
              profile={profile}
              selectedInterests={selectedInterests}
              selectedCoreSkills={selectedCoreSkills}
              onChangeInterests={setSelectedInterests}
              onChangeCoreSkills={setSelectedCoreSkills}
              isLoading={isLoading}
              error={error}
            />
          )}
          {currentStep === "confirm" && (
            <ConfirmationView
              // profile={profile}
              // isLoading={isLoading}
              // error={error}
              // onSave={handleSave}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            {currentStep !== "basic" && (
              <button type="button" onClick={handlePrevStep} className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold" >戻る</button>
            )}
          </div>
          {currentStep !== "confirm" && (
            <div className="mt-4">
              <button type="button" className="bg-[#D68897] text-white px-6 py-2 rounded font-semibold" onClick={handleNextStep}>次へ</button>
            </div>
          )}
          {currentStep == "confirm" && (
            <div className="mt-4">
              <button type="button" className="bg-[#D68897] text-white px-6 py-2 rounded font-semibold" onClick={handleSave}>保存</button>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      {/* 右側：プレビュー */}
      <div className="w-1/2 h-full flex flex-col z-0">
        <h1 className="text-5xl font-bold text-center text-gray-300">Preview</h1>
        <div className="flex flex-col gap-5 h-full justify-center items-center">
          <ProfilePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
