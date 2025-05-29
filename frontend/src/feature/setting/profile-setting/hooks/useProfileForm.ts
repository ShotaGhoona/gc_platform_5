import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";
import { ProfileUpdateRequest, ProfileResponse } from "../types/profile";

/**
 * プロフィール編集フォーム用カスタムフック
 * @param userId ユーザーID
 */
export function useProfileForm(userId: string) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 画像ファイル（未アップロードの一時保存用）
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // プロフィール取得
  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile(userId);
      setProfile(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // プロフィール保存
  const save = useCallback(
    async (formData: Partial<ProfileUpdateRequest>) => {
      setIsLoading(true);
      setError(null);
      try {
        if (!profile) {
          // 新規作成
          await profileService.createProfile(userId, {
            ...formData,
            avatarFile: avatarFile || undefined,
          });
        } else {
          // 更新
          await profileService.saveProfile(userId, {
            ...formData,
            avatarFile: avatarFile || undefined,
          });
        }
        // 保存後に再取得
        await fetchProfile();
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, avatarFile, fetchProfile, profile]
  );

  // 画像ファイルのセット
  const setAvatar = (file: File | null) => {
    setAvatarFile(file);
  };

  return {
    profile,
    isLoading,
    error,
    save,
    setAvatar,
    avatarFile,
    refetch: fetchProfile,
  };
}
