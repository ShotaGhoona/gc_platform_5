import { getInterestTags, getCoreSkillTags, InterestTag, CoreSkillTag } from "../services/interestCoreskillTagsService";

export function useInterestCoreskillTags() {
  const interests: InterestTag[] = getInterestTags();
  const coreSkills: CoreSkillTag[] = getCoreSkillTags();

  return {
    interests,
    coreSkills,
    isLoading: false,
    error: null,
  };
}