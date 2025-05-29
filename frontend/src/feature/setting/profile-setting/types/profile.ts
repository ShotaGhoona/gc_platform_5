export type SnsUpdateRequest = {
  id: number;
  link: string;
};

export type ProfileUpdateRequest = {
  username: string;
  bio?: string;
  one_line_profile?: string;
  background?: string;
  avatar_image_url?: string;
  personal_color?: string;
  interests?: number[];
  core_skills?: number[];
  sns?: SnsUpdateRequest[];
};
export type ProfileResponse = {
  id: string;
  userId: string;
  username: string;
  bio: string;
  oneLine: string;
  background: string;
  personalColor: string;
  interests: any[];
  coreSkills: any[];
  websiteUrl: string;
  xUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  createdAt: string;
  updatedAt: string;
  avatarImageUrl: string;
  sns: {
    id: number;
    name: string;
    link: string;
    description?: string;
  }[];
};
