"use client"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator
} from "@/components/ui/menubar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Info, CheckCircle2, AlertTriangle, XCircle, Loader2, Mail, Search, Eye, EyeOff, Bell } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { addDays } from "date-fns"

export default function TestPage() {
  return (
    <div className="p-8 grid grid-cols-3 gap-4">
      {/* Button Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Button Demo</h2>
        <div className="space-y-2">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="space-x-2 mt-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="space-x-2 mt-2">
          <Button disabled>Disabled</Button>
          <Button disabled aria-busy="true">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            With Icon
          </Button>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button className="w-full mt-2">Full Width</Button>
        </div>
        <div className="space-x-2 mt-2">
          <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">Custom Color</Button>
        </div>
      </div>
      {/* Alert Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Alert Demo</h2>
        {/* 通常のお知らせ */}
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>お知らせ</AlertTitle>
          <AlertDescription>
            これはshadcn/uiのAlertコンポーネントの基本的な使い方です。
          </AlertDescription>
        </Alert>
        {/* 成功メッセージ */}
        <Alert className="border-green-500 text-green-700">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <AlertTitle>成功しました</AlertTitle>
          <AlertDescription>
            データの保存に成功しました。
          </AlertDescription>
        </Alert>
        {/* 警告メッセージ */}
        <Alert className="border-yellow-500 text-yellow-700">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <AlertTitle>ご注意ください</AlertTitle>
          <AlertDescription>
            入力内容に不備があります。再度ご確認ください。
          </AlertDescription>
        </Alert>
        {/* エラーメッセージ */}
        <Alert className="border-red-500 text-red-700">
          <XCircle className="h-5 w-5 text-red-500" />
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>
            サーバーとの通信に失敗しました。時間をおいて再度お試しください。
          </AlertDescription>
        </Alert>
        {/* アイコンなし */}
        <Alert>
          <AlertTitle>アイコンなし</AlertTitle>
          <AlertDescription>
            アイコンを表示しないAlertの例です。
          </AlertDescription>
        </Alert>
        {/* 長文・カスタム色 */}
        <Alert className="border-blue-500 text-blue-700">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle>長文のお知らせ</AlertTitle>
          <AlertDescription>
            これは非常に長い説明文が入るAlertの例です。複数行にわたる内容や、詳細な説明を含めることができます。<br />
            例えば、注意事項や利用規約などをここに記載できます。
          </AlertDescription>
        </Alert>
      </div>
      {/* Input Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Input Demo</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">通常のテキスト入力</label>
            <Input placeholder="名前を入力してください" />
          </div>
          <div>
            <label className="block mb-1 font-medium">パスワード入力</label>
            <div className="flex items-center gap-2">
              <Input type="password" placeholder="パスワード" />
              <Eye className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">無効状態</label>
            <Input disabled placeholder="入力できません" />
          </div>
          <div>
            <label className="block mb-1 font-medium">エラー例</label>
            <Input className="border-red-500" placeholder="エラーがあります" />
            <span className="text-red-500 text-xs">入力内容に誤りがあります</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">説明文付き</label>
            <Input placeholder="メールアドレス" />
            <span className="text-gray-500 text-xs">ご連絡用のメールアドレスを入力してください</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">アイコン付き</label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <Input className="pl-8" placeholder="メールアドレス" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">ReadOnly</label>
            <Input readOnly value="読み取り専用" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Success例</label>
            <Input className="border-green-500" placeholder="成功しています" />
            <span className="text-green-500 text-xs">入力内容は正しいです</span>
          </div>
        </div>
      </div>
      {/* Switch Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Switch Demo</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Switch id="switch-default" />
            <label htmlFor="switch-default" className="font-medium">デフォルト</label>
          </div>
          <div className="flex items-center gap-4">
            <Switch id="switch-checked" defaultChecked />
            <label htmlFor="switch-checked" className="font-medium">初期ON</label>
          </div>
          <div className="flex items-center gap-4">
            <Switch id="switch-disabled" disabled />
            <label htmlFor="switch-disabled" className="font-medium text-gray-400">無効状態</label>
          </div>
          <div className="flex items-center gap-4">
            <label className="font-medium">ラベル左</label>
            <Switch id="switch-label-left" />
          </div>
          <div className="flex items-center gap-4">
            <Switch id="switch-custom-color" className="data-[state=checked]:bg-pink-500" />
            <label htmlFor="switch-custom-color" className="font-medium text-pink-500">カスタム色</label>
          </div>
          <div className="flex items-center gap-4">
            <Switch id="switch-small" className="h-4 w-8" />
            <label htmlFor="switch-small" className="font-medium">小サイズ</label>
          </div>
        </div>
      </div>
      {/* Select Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Select Demo</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">都道府県を選択</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tokyo">東京都</SelectItem>
                <SelectItem value="osaka">大阪府</SelectItem>
                <SelectItem value="hokkaido">北海道</SelectItem>
                <SelectItem value="fukuoka">福岡県</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium">無効状態</label>
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択できません" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dummy">ダミー</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium">選択肢が多い例</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"].map((pref, i) => (
                  <SelectItem key={i} value={pref}>{pref}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium">エラー例</label>
            <Select>
              <SelectTrigger className="w-full border-red-500">
                <SelectValue placeholder="エラーがあります" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">エラー</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-red-500 text-xs">選択内容に誤りがあります</span>
          </div>
        </div>
      </div>
      {/* Textarea Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Textarea Demo</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">通常のテキストエリア</label>
            <Textarea placeholder="ご意見・ご感想を入力してください" />
          </div>
          <div>
            <label className="block mb-1 font-medium">無効状態</label>
            <Textarea disabled placeholder="入力できません" />
          </div>
          <div>
            <label className="block mb-1 font-medium">エラー例</label>
            <Textarea className="border-red-500" placeholder="エラーがあります" />
            <span className="text-red-500 text-xs">入力内容に誤りがあります</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">説明文付き</label>
            <Textarea placeholder="詳細を入力してください" />
            <span className="text-gray-500 text-xs">できるだけ詳しくご記入ください</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">ReadOnly</label>
            <Textarea readOnly value="読み取り専用のテキスト" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Success例</label>
            <Textarea className="border-green-500" placeholder="成功しています" />
            <span className="text-green-500 text-xs">入力内容は正しいです</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">複数行（6行）</label>
            <Textarea rows={6} placeholder="6行分のテキストエリア" />
          </div>
        </div>
      </div>
      {/* Checkbox Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Checkbox Demo</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-default" />
            <label htmlFor="checkbox-default" className="font-medium">デフォルト</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-checked" defaultChecked />
            <label htmlFor="checkbox-checked" className="font-medium">初期ON</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-disabled" disabled />
            <label htmlFor="checkbox-disabled" className="font-medium text-gray-400">無効状態</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-error" className="border-red-500" />
            <label htmlFor="checkbox-error" className="font-medium text-red-500">エラー例</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-success" className="border-green-500" defaultChecked />
            <label htmlFor="checkbox-success" className="font-medium text-green-500">成功例</label>
          </div>
          <div>
            <span className="block font-medium mb-1">複数選択例</span>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2">
                <Checkbox id="cb1" />
                <span>選択肢1</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox id="cb2" defaultChecked />
                <span>選択肢2</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox id="cb3" />
                <span>選択肢3</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* RadioGroup Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">RadioGroup Demo</h2>
        <div className="space-y-4">
          <div>
            <span className="block font-medium mb-1">デフォルト</span>
            <RadioGroup>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="a" id="radio-a" />
                <label htmlFor="radio-a" className="font-medium">選択肢A</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="b" id="radio-b" />
                <label htmlFor="radio-b" className="font-medium">選択肢B</label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <span className="block font-medium mb-1">初期選択</span>
            <RadioGroup defaultValue="b">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="a" id="radio2-a" />
                <label htmlFor="radio2-a" className="font-medium">A</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="b" id="radio2-b" />
                <label htmlFor="radio2-b" className="font-medium">B</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="c" id="radio2-c" />
                <label htmlFor="radio2-c" className="font-medium">C</label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <span className="block font-medium mb-1">無効状態</span>
            <RadioGroup defaultValue="a">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="a" id="radio3-a" disabled />
                <label htmlFor="radio3-a" className="font-medium text-gray-400">A（無効）</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="b" id="radio3-b" />
                <label htmlFor="radio3-b" className="font-medium">B</label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <span className="block font-medium mb-1">エラー例</span>
            <RadioGroup>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="error" id="radio4-error" className="border-red-500" />
                <label htmlFor="radio4-error" className="font-medium text-red-500">エラー</label>
              </div>
            </RadioGroup>
            <span className="text-red-500 text-xs">選択内容に誤りがあります</span>
          </div>
          <div>
            <span className="block font-medium mb-1">縦並び</span>
            <RadioGroup>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="1" id="radio5-1" />
                  <span>1番</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="2" id="radio5-2" />
                  <span>2番</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="3" id="radio5-3" />
                  <span>3番</span>
                </label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <span className="block font-medium mb-1">説明文付き</span>
            <RadioGroup>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="radio6-yes" />
                <label htmlFor="radio6-yes" className="font-medium">はい</label>
                <span className="text-xs text-gray-500 ml-2">同意する場合はこちら</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" id="radio6-no" />
                <label htmlFor="radio6-no" className="font-medium">いいえ</label>
                <span className="text-xs text-gray-500 ml-2">同意しない場合はこちら</span>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      {/* Slider Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Slider Demo</h2>
        <div className="space-y-6">
          <div>
            <span className="block font-medium mb-1">デフォルト</span>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div>
            <span className="block font-medium mb-1">範囲指定（0〜200, 10刻み）</span>
            <Slider defaultValue={[100]} max={200} step={10} />
          </div>
          <div>
            <span className="block font-medium mb-1">disabled</span>
            <Slider defaultValue={[30]} max={100} step={1} disabled />
          </div>
          <div>
            <span className="block font-medium mb-1">カスタム色</span>
            <Slider defaultValue={[70]} className="accent-pink-500" />
          </div>
          <div>
            <span className="block font-medium mb-1">ラベル付き</span>
            <label className="block mb-1 text-sm text-gray-600">音量</label>
            <Slider defaultValue={[30]} max={100} step={1} />
          </div>
        </div>
      </div>
      {/* Progress Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Progress Demo</h2>
        <div className="space-y-6">
          <div>
            <span className="block font-medium mb-1">デフォルト（50%）</span>
            <Progress value={50} />
          </div>
          <div>
            <span className="block font-medium mb-1">0%</span>
            <Progress value={0} />
          </div>
          <div>
            <span className="block font-medium mb-1">100%</span>
            <Progress value={100} />
          </div>
          <div>
            <span className="block font-medium mb-1">カスタム色</span>
            <Progress value={70} className="bg-pink-100 [&>div]:bg-pink-500" />
          </div>
          <div>
            <span className="block font-medium mb-1">ラベル付き</span>
            <div className="flex items-center gap-2">
              <Progress value={30} className="w-2/3" />
              <span className="text-sm text-gray-600">30%</span>
            </div>
          </div>
          <div>
            <span className="block font-medium mb-1">アニメーション例</span>
            <Progress value={80} className="transition-all duration-700" />
          </div>
        </div>
      </div>
      {/* Avatar Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Avatar Demo</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">デフォルト</span>
            <Avatar>
              <AvatarImage src="" alt="avatar" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">画像あり</span>
            <Avatar>
              <AvatarImage src="/images/profile/sampleProfileIcon.png" alt="profile" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">イニシャル</span>
            <Avatar>
              <AvatarFallback>YS</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">大サイズ</span>
            <Avatar className="w-16 h-16 text-xl">
              <AvatarImage src="/images/profile/sampleProfileIcon.png" alt="profile" />
              <AvatarFallback>XL</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">枠線付き</span>
            <Avatar className="ring-2 ring-blue-500">
              <AvatarImage src="/images/profile/sampleProfileIcon.png" alt="profile" />
              <AvatarFallback>BR</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">disabled風</span>
            <Avatar className="opacity-50 grayscale">
              <AvatarImage src="/images/profile/sampleProfileIcon.png" alt="profile" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      {/* Badge Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Badge Demo</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">default</span>
            <Badge>Default</Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">secondary</span>
            <Badge variant="secondary">Secondary</Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">destructive</span>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">outline</span>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">カスタム色</span>
            <Badge className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">Custom</Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">アイコン付き</span>
            <Badge>
              <Bell className="w-3 h-3 mr-1" />
              通知
            </Badge>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm mb-1">数字バッジ</span>
            <Badge className="rounded-full px-2">7</Badge>
          </div>
        </div>
      </div>
      {/* Table Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-3">
        <h2 className="text-2xl font-bold mb-4">Table Demo</h2>
        <Table>
          <TableCaption>ユーザー一覧の例</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>役割</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>山田 太郎</TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3 h-3" /> 管理者
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">詳細</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>佐藤 花子</TableCell>
              <TableCell>
                <Badge variant="destructive">Inactive</Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Bell className="w-3 h-3" /> 一般
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">詳細</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>鈴木 次郎</TableCell>
              <TableCell>
                <Badge>Pending</Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Search className="w-3 h-3" /> ゲスト
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline" disabled>詳細</Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>合計ユーザー数</TableCell>
              <TableCell className="text-right">3</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* ScrollArea Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">ScrollArea Demo</h2>
        <div className="space-y-6">
          <div>
            <span className="block font-medium mb-1">縦スクロール（高さ制限）</span>
            <ScrollArea className="h-40 w-64 rounded border">
              <div className="p-2 space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-2 bg-gray-100 rounded">{i + 1} 行目のテキスト</div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <span className="block font-medium mb-1">横スクロール</span>
            <ScrollArea className="w-64 rounded border">
              <div className="flex space-x-4 p-2 min-w-[600px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="p-2 bg-blue-100 rounded w-32 text-center">Item {i + 1}</div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <span className="block font-medium mb-1">画像リスト</span>
            <ScrollArea className="h-32 w-64 rounded border">
              <div className="flex flex-col gap-2 p-2">
                {["/images/profile/sampleProfileIcon.png", "/images/tier/1.png", "/images/tier/2.png", "/images/tier/3.png"].map((src, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={src} alt={`img${i}`} className="w-8 h-8 rounded" />
                    <span>画像 {i + 1}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      {/* StepIndicator Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-2">
        <h2 className="text-2xl font-bold mb-4">StepIndicator Demo</h2>
        <div className="space-y-8">
          {/* パターン1: Tabs風 */}
          <div>
            <span className="block font-medium mb-2">Tabsを使ったステップインジケーター</span>
            <div className="flex border-b">
              {["Step 1", "Step 2", "Step 3"].map((label, idx) => (
                <div
                  key={label}
                  className={`px-6 py-2 cursor-pointer border-b-2 ${idx === 1 ? "border-blue-500 text-blue-600 font-bold" : "border-transparent text-gray-400"}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">2番目のステップがアクティブ</div>
          </div>
          {/* パターン2: Progress＋Badge */}
          <div>
            <span className="block font-medium mb-2">Progressバー＋Badge</span>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-500 text-white">1</Badge>
              <Progress value={33} className="w-32" />
              <Badge className="bg-blue-500 text-white">2</Badge>
              <Progress value={66} className="w-32" />
              <Badge className="bg-blue-500 text-white">3</Badge>
            </div>
            <div className="mt-2 text-sm text-gray-600">進捗に応じてバーが伸びる</div>
          </div>
          {/* パターン3: Badge＋チェックアイコン */}
          <div>
            <span className="block font-medium mb-2">Badge＋チェックアイコン</span>
            <div className="flex items-center gap-6">
              <Badge className="bg-blue-500 text-white flex items-center gap-1">
                1
                <CheckCircle2 className="w-4 h-4 ml-1 text-white" />
              </Badge>
              <Badge className="bg-blue-500 text-white flex items-center gap-1">
                2
                <CheckCircle2 className="w-4 h-4 ml-1 text-white" />
              </Badge>
              <Badge className="bg-gray-300 text-gray-500">3</Badge>
            </div>
            <div className="mt-2 text-sm text-gray-600">完了したステップはチェック付き</div>
          </div>
          {/* パターン4: Button＋Badgeでナビゲーション */}
          <div>
            <span className="block font-medium mb-2">Button＋Badgeでナビゲーション</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                <Badge className="mr-1">1</Badge> 基本情報
              </Button>
              <Button size="sm" variant="default">
                <Badge className="mr-1">2</Badge> 詳細設定
              </Button>
              <Button size="sm" variant="outline" disabled>
                <Badge className="mr-1">3</Badge> 完了
              </Button>
            </div>
            <div className="mt-2 text-sm text-gray-600">ボタンでステップを切り替え</div>
          </div>
        </div>
      </div>
      {/* Card Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-3">
        <h2 className="text-2xl font-bold mb-4">Card Demo</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* 基本カード */}
          <Card>
            <CardHeader>
              <CardTitle>基本カード</CardTitle>
              <CardDescription>シンプルな情報表示</CardDescription>
            </CardHeader>
            <CardContent>
              <p>これはshadcn/uiのCardコンポーネントの基本例です。</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">詳細</Button>
            </CardFooter>
          </Card>
          {/* 画像付きカード */}
          <Card>
            <CardHeader>
              <CardTitle>画像付き</CardTitle>
              <CardDescription>画像＋テキスト</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/images/profile/sampleProfileIcon.png" alt="profile" className="w-16 h-16 rounded mb-2" />
              <p>ユーザーのプロフィール画像と説明文を表示できます。</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="default">プロフィール</Button>
            </CardFooter>
          </Card>
          {/* Badge/Avatar入りカード */}
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/images/profile/sampleProfileIcon.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  ユーザー
                  <Badge className="ml-2">NEW</Badge>
                </span>
              </CardTitle>
              <CardDescription>アバター＋バッジ</CardDescription>
            </CardHeader>
            <CardContent>
              <p>複数のUI要素を組み合わせてカードを装飾できます。</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">メッセージ</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* Sheet Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Sheet Demo (サイドパネル)</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default">サイドパネルを開く</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px]">
            <SheetHeader>
              <SheetTitle>サイドパネルのタイトル</SheetTitle>
              <SheetDescription>
                これはshadcn/uiのSheetコンポーネントを使ったサイドピーク（サイドパネル）の例です。
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <Input placeholder="ここに入力できます" />
              <Button variant="secondary" className="w-full">アクション</Button>
            </div>
            <SheetFooter>
              <Button variant="outline">閉じる</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="mt-2 text-sm text-gray-600">
          「サイドパネルを開く」ボタンを押すと、右側からパネルがスライドインします。
        </div>
      </div>
      {/* Popover Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Popover Demo (PopUp)</h2>
        <div className="flex flex-col gap-6">
          {/* 基本Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default">PopUpを開く</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="font-bold mb-2">Popoverの内容</div>
              <div className="mb-2 text-sm text-gray-600">shadcn/uiのPopoverは、クリックで開く小さなパネル（PopUp）を簡単に実装できます。</div>
              <Input placeholder="ここに入力" className="mb-2" />
              <Button size="sm" variant="secondary">アクション</Button>
            </PopoverContent>
          </Popover>
          {/* 右側に表示 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">右側にPopUp</Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-48">
              <div className="font-bold mb-2">右側Popover</div>
              <div className="text-xs text-gray-500">side="right"で右側に表示</div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          ボタンをクリックするとPopUp（Popover）が表示されます。
        </div>
      </div>
      {/* Dialog Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Dialog Demo</h2>
        <div className="flex flex-col gap-6">
          {/* 基本Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Dialogを開く</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ダイアログのタイトル</DialogTitle>
                <DialogDescription>
                  これはshadcn/uiのDialogコンポーネントを使ったモーダルダイアログの例です。
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <Input placeholder="ここに入力" className="mb-2" />
              </div>
              <DialogFooter>
                <Button variant="secondary">OK</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* キャンセル/OKボタン付き */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">確認ダイアログ</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>本当に削除しますか？</DialogTitle>
                <DialogDescription>
                  この操作は元に戻せません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button variant="destructive">削除</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          ボタンをクリックするとDialog（モーダルダイアログ）が表示されます。
        </div>
      </div>
      {/* Accordion Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Accordion Demo</h2>
        <div className="space-y-8">
          {/* 単一開閉 */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>セクション1</AccordionTrigger>
              <AccordionContent>セクション1の内容です。</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>セクション2</AccordionTrigger>
              <AccordionContent>セクション2の内容です。</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>セクション3</AccordionTrigger>
              <AccordionContent>セクション3の内容です。</AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* 複数同時開閉 */}
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-a">
              <AccordionTrigger>複数開閉A</AccordionTrigger>
              <AccordionContent>複数同時に開けるアコーディオンA</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-b">
              <AccordionTrigger>複数開閉B</AccordionTrigger>
              <AccordionContent>複数同時に開けるアコーディオンB</AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* アイコン付き */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-x">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Bell className="w-4 h-4" /> 通知
                </span>
              </AccordionTrigger>
              <AccordionContent>通知の詳細内容</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* Menubar Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Menubar Demo</h2>
        <div className="space-y-8">
          {/* シンプル */}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>ファイル</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>新規作成</MenubarItem>
                <MenubarItem>開く</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>保存</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>編集</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>元に戻す</MenubarItem>
                <MenubarItem>やり直し</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          {/* ドロップダウン＋アイコン */}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <span className="flex items-center gap-1">
                  <Bell className="w-4 h-4" /> 通知
                </span>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>すべて既読</MenubarItem>
                <MenubarItem>設定</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>ヘルプ</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>FAQ</MenubarItem>
                <MenubarItem>お問い合わせ</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      {/* Breadcrumb Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-1">
        <h2 className="text-2xl font-bold mb-4">Breadcrumb Demo</h2>
        <div className="space-y-8">
          {/* シンプル */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">商品</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products/123">詳細</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* アイコン付き */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Bell className="w-4 h-4 inline mr-1" />
                  ホーム
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/settings">設定</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* 階層多め */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">TOP</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/a">A</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/a/b">B</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/a/b/c">C</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* Calendar Demo */}
      <div className="bg-white p-8 shadow-md rounded-lg col-span-3">
        <h2 className="text-2xl font-bold mb-4">Calendar Demo</h2>
        <div className="grid grid-cols-4 gap-8">
          {/* 単一日付選択 */}
          <div>
            <span className="block font-medium mb-2">単一日付選択</span>
            <CalendarDemoSingle />
          </div>
          {/* 範囲選択 */}
          <div>
            <span className="block font-medium mb-2">範囲選択</span>
            <CalendarDemoRange />
          </div>
          {/* disabled日 */}
          <div>
            <span className="block font-medium mb-2">一部日付を選択不可</span>
            <CalendarDemoDisabled />
          </div>
          {/* カスタムヘッダー */}
          <div>
            <span className="block font-medium mb-2">カスタムヘッダー</span>
            <CalendarDemoCustomHeader />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Calendar Demo Components ---

function CalendarDemoSingle() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

function CalendarDemoRange() {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={value => setRange(value)}
      className="rounded-md border"
    />
  )
}

function CalendarDemoDisabled() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  // 例: 今日と明日を選択不可
  const disabled = [new Date(), addDays(new Date(), 1)]
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disabled}
      className="rounded-md border"
    />
  )
}

function CalendarDemoCustomHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div>
      <div className="mb-2 font-bold text-blue-600">カスタムヘッダー例</div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  )
}
