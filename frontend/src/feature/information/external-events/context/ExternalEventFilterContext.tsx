import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchExternalEventTags, ExternalEventTag } from "../services/externalEventService";

type ExternalEventFilterContextType = {
  selectedTagNames: string[];
  setSelectedTagNames: (names: string[]) => void;
  tags: ExternalEventTag[];
  setTags: (tags: ExternalEventTag[]) => void;
  // ID↔名前変換ヘルパー
  getTagNameById: (id: number) => string;
  getTagIdByName: (name: string) => number | null;
};

const ExternalEventFilterContext = createContext<ExternalEventFilterContextType | undefined>(undefined);

export function ExternalEventFilterProvider({ children }: { children: ReactNode }) {
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
  const [tags, setTags] = useState<ExternalEventTag[]>([]);

  useEffect(() => {
    fetchExternalEventTags().then(setTags);
  }, []);

  // ID↔名前変換ヘルパー関数
  const getTagNameById = (id: number): string => {
    const tag = tags.find(t => t.id === id);
    return tag ? tag.name : '';
  };

  const getTagIdByName = (name: string): number | null => {
    const tag = tags.find(t => t.name === name);
    return tag ? tag.id : null;
  };

  return (
    <ExternalEventFilterContext.Provider value={{ 
      selectedTagNames, 
      setSelectedTagNames, 
      tags, 
      setTags,
      getTagNameById,
      getTagIdByName
    }}>
      {children}
    </ExternalEventFilterContext.Provider>
  );
}

export function useExternalEventFilter() {
  const ctx = useContext(ExternalEventFilterContext);
  if (!ctx) throw new Error("useExternalEventFilter must be used within ExternalEventFilterProvider");
  return ctx;
}
