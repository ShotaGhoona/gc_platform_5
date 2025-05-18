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
  interests?: number[];
  core_skills?: number[];
  sns?: SnsUpdateRequest[];
};
export type ProfileResponse = {
  id: string;
  userId: string;
  username: string;
  bio: string;
  oneLine: string | null;
  background: string | null;
  interests: string[];
  coreSkills: string[];
  websiteUrl: string | null;
  xUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  createdAt: string;
  updatedAt: string;
  avatarImageUrl: string;
};
