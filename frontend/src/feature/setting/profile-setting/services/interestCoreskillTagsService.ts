export type InterestTag = {
  id: number;
  name: string;
  color?: string;
};

export type CoreSkillTag = {
  id: number;
  name: string;
  color?: string;
  icon?: string;
};

const INTEREST_OPTIONS = [
  "テクノロジー",
  "デザイン", 
  "ビジネス",
  "マーケティング",
  "教育",
  "健康・フィットネス",
  "音楽",
  "アート",
  "読書",
  "旅行",
  "料理",
  "スポーツ",
  "ゲーム",
  "映画・ドラマ",
  "写真",
];

const CORE_SKILL_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Docker",
  "AWS",
  "GCP",
  "Azure",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST API",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Project Management",
  "Data Analysis",
  "Machine Learning",
  "DevOps",
];

export function getInterestTags(): InterestTag[] {
  return INTEREST_OPTIONS.map((name, index) => ({
    id: index + 1,
    name,
    color: "#e3f2fd"
  }));
}

export function getCoreSkillTags(): CoreSkillTag[] {
  return CORE_SKILL_OPTIONS.map((name, index) => ({
    id: index + 1,
    name,
    color: "#e8f5e8"
  }));
}