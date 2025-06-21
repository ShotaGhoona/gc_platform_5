'use client';
import { useState, useEffect } from "react";
import { StepIndicator } from "../components/StepIndicator";
import { BasicProfileForm } from "./BasicProfileForm";
import { DetailProfileForm } from "./DetailProfileForm";
import { SnsForm, SNS_TYPES } from "./SnsForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { useProfileFormValidation } from "../hooks/useProfileFormValidation";
import { useInterestCoreskillTags } from "../hooks/useInterestCoreskillTags";
import { useUser } from "@clerk/nextjs";
import { ProfileUpdateRequest } from "../types/profile";
import { ProfilePreview } from "../components/Preview";
import { useAuth } from "@clerk/nextjs";
import { getSupabaseWithAuth, getSimpleSupabase } from "../services/supabaseClientWithAuth";
import { useRouter } from "next/navigation";

import CommonButton from "@/components/common/commonButton";
import { FaBackward, FaForward, FaSave } from "react-icons/fa";


type Step = "basic" | "detail" | "sns" ;

export default function ProfileSetting() {
  const { user } = useUser();
  const { getToken } = useAuth();
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

  // interest/coreSkillタグ一覧取得
  const { interests, coreSkills } = useInterestCoreskillTags();

  // interest/coreSkill選択状態
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedCoreSkills, setSelectedCoreSkills] = useState<number[]>([]);
  
  // カスタム項目
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [customCoreSkills, setCustomCoreSkills] = useState<string[]>([]);

  // BasicProfileFormの編集値
  const [basicForm, setBasicForm] = useState<Partial<ProfileUpdateRequest>>({});
  // バリデーション
  const {
    formError,
    validateAll,
    setFormError,
  } = useProfileFormValidation();

  // profile取得時に初期選択状態・初期値を反映
  useEffect(() => {
    if (profile && interests.length > 0 && coreSkills.length > 0) {
      // 名前配列をID配列に変換
      const interestIds = Array.isArray(profile.interests)
        ? profile.interests.map((name: string) => {
            const interest = interests.find(i => i.name === name);
            return interest ? interest.id : null;
          }).filter((id: any) => id !== null)
        : [];
      
      const coreSkillIds = Array.isArray(profile.coreSkills)
        ? profile.coreSkills.map((name: string) => {
            const skill = coreSkills.find(s => s.name === name);
            return skill ? skill.id : null;
          }).filter((id: any) => id !== null)
        : [];

      setSelectedInterests(interestIds as number[]);
      setSelectedCoreSkills(coreSkillIds as number[]);
      setBasicForm({
        username: profile.username,
        bio: profile.bio,
        one_line_profile: profile.oneLine ?? "",
        background: profile.background ?? "",
        avatar_image_url: profile.avatarImageUrl ?? "",
      });
    }
  }, [profile?.username, profile?.bio, profile?.oneLine, profile?.background, profile?.avatarImageUrl]);

  const handleNextStep = () => {
    if (currentStep === "basic") setCurrentStep("detail");
    else if (currentStep === "detail") setCurrentStep("sns");
  };
  const handlePrevStep = () => {
    if (currentStep === "detail") setCurrentStep("basic");
    else if (currentStep === "sns") setCurrentStep("detail");
  };

  // BasicProfileFormのonChange
  const handleBasicFormChange = (fields: Partial<ProfileUpdateRequest>) => {
    setBasicForm((prev) => ({ ...prev, ...fields }));
  };

  // SNSリスト管理
  const [snsList, setSnsList] = useState<{ type: string; link: string; description: string }[]>([]);
  useEffect(() => {
    if (profile && Array.isArray(profile.sns)) {
      console.log("profile.sns初期値:", profile.sns);
      setSnsList(
        profile.sns.map((sns: any) => ({
          type: SNS_TYPES.find(t => t.id === sns.id)?.value || "",
          link: sns.link || "",
          description: sns.description || "",
        }))
      );
    }
  }, [profile]);

  // プレビュー用データ
  const formData = {
    id: profile?.id || "",
    userId: profile?.userId || user?.id || "",
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
    sns: snsList,
  };
  const router = useRouter();
  // 確認画面で保存
  const handleSave = async () => {
    // バリデーション
    if (!validateAll(basicForm)) {
      setFormError("入力内容にエラーがあります。修正してください。");
      return;
    }

    let avatarUrl = basicForm.avatar_image_url || profile?.avatarImageUrl || '';
  
    if (avatarFile) {
      try {
        // まずは簡単なSupabaseクライアントでテスト
        const supabase = getSimpleSupabase();
        const ext      = avatarFile.name.split('.').pop()?.toLowerCase() || 'png';
        const filePath = `avatars/${user?.id}_${Date.now()}.${ext}`;
    
        console.log('アップロード開始:', filePath);
        
        const { error, data } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });
    
        if (error) {
          console.error('アップロードエラー:', error);
          alert('画像アップロードに失敗しました: ' + error.message);
          return;
        }
    
        console.log('アップロード成功:', data);
        
        avatarUrl = supabase
          .storage
          .from('avatars')
          .getPublicUrl(data.path).data.publicUrl;
          
        console.log('パブリックURL:', avatarUrl);
      } catch (error) {
        console.error('予期しないエラー:', error);
        alert('予期しないエラーが発生しました: ' + error);
        return;
      }
    }
  
    // SNS_TYPESのidでidを割り当てる
    const snsTypeToId = (type: string) => {
      const found = SNS_TYPES.find(t => t.value === type);
      return found ? found.id : 0;
    };

    // ID配列を名前配列に変換し、カスタム項目と統合
    const interestNames = [
      ...selectedInterests.map(id => {
        const interest = interests.find(i => i.id === id);
        return interest ? interest.name : '';
      }).filter(name => name),
      ...customInterests
    ];

    const coreSkillNames = [
      ...selectedCoreSkills.map(id => {
        const skill = coreSkills.find(s => s.id === id);
        return skill ? skill.name : '';
      }).filter(name => name),
      ...customCoreSkills
    ];

    // バリデーションOK時のみAPI送信
    await save({
      ...basicForm,
      interests: interestNames,
      core_skills: coreSkillNames,
      avatar_image_url: avatarUrl,
      sns: snsList
        .filter(s => s.type && s.link)
        .map(s => ({
          id: snsTypeToId(s.type),
          link: s.link,
          description: s.description,
        })),
    });
    // if (!error && !formError) {
    //   router.push(`/member`);
    // }
  };

  return (
    <div className="flex h-full gap-10 p-5">
      <div className="w-1/2 h-full flex flex-col">
        <StepIndicator currentStep={currentStep} />
        <div className="flex-1 w-full p-8 bg-white rounded-lg flex flex-col shadow-lg">
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
                customInterests={customInterests}
                customCoreSkills={customCoreSkills}
                onChangeInterests={setSelectedInterests}
                onChangeCoreSkills={setSelectedCoreSkills}
                onChangeCustomInterests={setCustomInterests}
                onChangeCustomCoreSkills={setCustomCoreSkills}
                isLoading={isLoading}
                error={error}
              />
            )}
            {currentStep === "sns" && (
              <SnsForm
                snsList={snsList}
                setSnsList={setSnsList}
              />
            )}
          </div>
          <div className="flex justify-between">
            <div className="mt-4">
              {currentStep !== "basic" && (
                <CommonButton
                  onClick={handlePrevStep}
                  icon={<FaBackward className="text-gray-500" />}
                  label="戻る"
                  className="bg-gray-100 text-gray-500"
                />
              )}
            </div>
            {currentStep !== "sns" && (
              <div className="mt-4">
                <CommonButton
                  onClick={handleNextStep}
                  icon={<FaForward className="text-white" />}
                  label="次へ"
                  className="bg-[#D68897] text-white"
                />
              </div>
            )}
            {currentStep == "sns" && (
              <div className="mt-4">
                <CommonButton
                  onClick={handleSave}
                  icon={<FaSave className="text-white" />}
                  label={isLoading ? "保存中..." : "保存"}
                  className="bg-[#D68897] text-white"
                />
              </div>
            )}
          </div>
          {formError && <div className="text-red-500 mt-2">{formError}</div>}
          {error && <div className="text-red-500 mt-2 bg-red-100 p-2 rounded-md">{error}</div>}
        </div>
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
