export type VisionChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type VisionIdea = {
  id: string;
  text: string;
  stage: "idea" | "save" | "deleted";
};
