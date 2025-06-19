import { useState, useEffect } from "react";
import { fetchInterestTags, fetchCoreSkillTags, InterestTag, CoreSkillTag } from "../services/interestCoreskillTagsService";

export function useInterestCoreskillTags() {
  const [interests, setInterests] = useState<InterestTag[]>([]);
  const [coreSkills, setCoreSkills] = useState<CoreSkillTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    Promise.all([fetchInterestTags(), fetchCoreSkillTags()])
      .then(([interests, coreSkills]) => {
        setInterests(interests);
        setCoreSkills(coreSkills);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    interests,
    coreSkills,
    isLoading,
    error,
  };
}
