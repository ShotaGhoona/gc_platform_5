import { ProfileUpdateRequest, ProfileResponse } from '../types/profile';

export const profileService = {
  // プロフィールの取得
  async getProfile(userId: string): Promise<ProfileResponse | null> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/detail/${userId}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('プロフィールの取得に失敗しました');
      }
      const data = await response.json();
      // スネークケース→キャメルケース変換
      return {
        id: data.user_id,
        userId: data.user_id,
        username: data.username,
        bio: data.bio,
        oneLine: data.one_line_profile ?? "",
        background: data.background,
        personalColor: data.personal_color ?? "",
        interests: data.interests ?? [],
        coreSkills: data.core_skills ?? [],
        websiteUrl: data.website_url ?? "",
        xUrl: data.x_url ?? "",
        instagramUrl: data.instagram_url ?? "",
        linkedinUrl: data.linkedin_url ?? "",
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        avatarImageUrl: data.avatar_image_url ?? "",
        sns: Array.isArray(data.sns)
          ? data.sns.map((sns: any) => ({
              id: sns.id,
              name: sns.name,
              link: sns.link,
              description: sns.description,
            }))
          : [],
      };
    } catch (error) {
      console.error('プロフィール取得エラー:', error);
      throw error;
    }
  },

  // プロフィールの更新・保存（画像アップロード対応・FormData統一版）
  async saveProfile(userId: string, data: Partial<ProfileUpdateRequest> & { avatarFile?: File }): Promise<ProfileResponse> {
    const formData = new FormData();

    // アバター画像ファイルがあれば追加
    if (data.avatarFile) {
      formData.append('avatar', data.avatarFile);
    }
    // その他のデータ（avatarFile以外）をJSON文字列で送信
    const profileData = { ...data };
    delete profileData.avatarFile;
    formData.append('data', JSON.stringify(profileData));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/${userId}/profile`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'プロフィール保存に失敗しました');
    }

    return response.json();
  },

  // プロフィール新規作成
  async createProfile(userId: string, data: Partial<ProfileUpdateRequest> & { avatarFile?: File }): Promise<ProfileResponse> {
    const formData = new FormData();

    if (data.avatarFile) {
      formData.append('avatar', data.avatarFile);
    }
    const profileData = { ...data };
    delete profileData.avatarFile;
    formData.append('data', JSON.stringify(profileData));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/${userId}/profile`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'プロフィール新規作成に失敗しました');
    }

    return response.json();
  }
};
