import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchExternalEventTags, ExternalEventTag } from "../services/externalEventService";

type ExternalEventFilterContextType = {
  selectedTagIds: number[];
  setSelectedTagIds: (ids: number[]) => void;
  tags: ExternalEventTag[];
  setTags: (tags: ExternalEventTag[]) => void;
};

const ExternalEventFilterContext = createContext<ExternalEventFilterContextType | undefined>(undefined);

export function ExternalEventFilterProvider({ children }: { children: ReactNode }) {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [tags, setTags] = useState<ExternalEventTag[]>([]);

  useEffect(() => {
    fetchExternalEventTags().then(setTags);
  }, []);

  return (
    <ExternalEventFilterContext.Provider value={{ selectedTagIds, setSelectedTagIds, tags, setTags }}>
      {children}
    </ExternalEventFilterContext.Provider>
  );
}

export function useExternalEventFilter() {
  const ctx = useContext(ExternalEventFilterContext);
  if (!ctx) throw new Error("useExternalEventFilter must be used within ExternalEventFilterProvider");
  return ctx;
}
