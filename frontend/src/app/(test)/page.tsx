import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Button Demo</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Alert Demo</h2>
        <Alert>
          <AlertTitle>お知らせ</AlertTitle>
          <AlertDescription>
            これはshadcn/uiのAlertコンポーネントのデモです。
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
} 