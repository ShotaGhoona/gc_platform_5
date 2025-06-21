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
  interests?: string[];
  core_skills?: string[];
  sns?: SnsUpdateRequest[];
};
export type ProfileResponse = {
  id: string;
  userId: string;
  username: string;
  bio: string;
  oneLine: string;
  background: string;
  interests: string[];
  coreSkills: string[];
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
