"use client";
import { useState, useEffect } from "react";
import VisionSettingChatContainer from "./VisionSettingChatContainer";
import SaveVisionContainer from "./SaveVisionContainer";
import VisionIdeaContainer from "./VisionIdeaContainer";
import { useVisionSettingChat } from "../hooks/useVisionSettingChat";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VisionSettingWaySelectPopUpChildren from "../components/VisionSettingWaySelectPopUpChildren";
import VisionPageExplainPopUpChildren from "../components/VisionPageExplainPopUpChildren";
import VisionConfirmPopUpChildren from "../components/VisionConfirmPopUpChildren";
import { VisionIdea } from "../types/visionSettingType";

export default function IndexPage() {
  const {
    messages,
    input,
    setInput,
    loading,
    error,
    mode,
    setMode,
    handleSend,
  } = useVisionSettingChat();

  // Dialog state management
  const [isWayDialogOpen, setIsWayDialogOpen] = useState(false);
  const [isExplainDialogOpen, setIsExplainDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
  const handleOpenExplainDialog = () => {
    setIsExplainDialogOpen(true);
  };

  const [ideas, setIdeas] = useState<VisionIdea[]>([]);
  const handleSendWithIdeas = async () => {
    const { mode: resultMode, ideas: newIdeas } = await handleSend(mode);
    if (resultMode === "vision" && newIdeas && newIdeas.length > 0) {
      setIdeas([
        ...ideas,
        ...newIdeas.map((idea) => ({
          ...idea,
          stage: "idea" as const,
        })),
      ]);
    }
  };

  const handleGood = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, stage: "save" } : idea
      )
    );
  };

  const handleBad = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, stage: "deleted" } : idea
      )
    );
  };

  useEffect(() => {
    setIsWayDialogOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col px-15 pt-15 pb-5">
        <div className="flex-1 w-full flex flex-col gap-5">
        <div className="flex gap-5 w-full h-full items-center justify-center">
          <div className="w-1/3 h-full">
            <VisionSettingChatContainer
              messages={messages}
              input={input}
              setInput={setInput}
              loading={loading}
              error={error}
              mode={mode}
              setMode={setMode}
              onSend={handleSendWithIdeas}
            />
          </div>
          <div className="w-2/3 h-full flex flex-col gap-5 items-center justify-between min-h-0">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <VisionIdeaContainer
                ideas={ideas.filter((idea) => idea.stage === "idea")}
                onGood={handleGood}
                onBad={handleBad}
              />
            </div>
            <SaveVisionContainer 
              ideas={ideas.filter((idea) => idea.stage === "save")}
              onBad={handleBad}
            />
          </div>
        </div>
        </div>
        <button className="text-gray-300 text-sm font-bold" onClick={handleOpenExplainDialog}>
          使い方をもう一度見る
        </button>
      </div>
      {/* Way Selection Dialog */}
      <Dialog open={isWayDialogOpen} onOpenChange={setIsWayDialogOpen}>
        <DialogContent>
          <VisionSettingWaySelectPopUpChildren
            onSelectAI={() => {
              setIsWayDialogOpen(false);
              setIsExplainDialogOpen(true);
            }}
            onSelectManual={() => {
              setIsWayDialogOpen(false);
              setIsConfirmDialogOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Explain Dialog */}
      <Dialog open={isExplainDialogOpen} onOpenChange={setIsExplainDialogOpen}>
        <DialogContent>
          <VisionPageExplainPopUpChildren
            onClose={() => setIsExplainDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <VisionConfirmPopUpChildren text="" />
        </DialogContent>
      </Dialog>
    </>
  );
}
