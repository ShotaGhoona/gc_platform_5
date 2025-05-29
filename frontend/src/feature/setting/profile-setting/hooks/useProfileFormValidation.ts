import { useState } from "react";
import { ProfileUpdateRequest } from "../types/profile";

export function useProfileFormValidation() {
  const [usernameError, setUsernameError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const [oneLineProfileError, setOneLineProfileError] = useState<string>("");
  const [backgroundError, setBackgroundError] = useState<string>("");

  const validateField = (name: string, value: string) => {
    if (name === "username") {
      const usernameRegex = /^[a-z0-9_.]{3,20}$/;
      if (!value) {
        setUsernameError("ユーザーネームは必須です");
      } else if (!usernameRegex.test(value)) {
        setUsernameError("3〜20文字の英小文字・数字・_・.のみ利用できます");
      } else {
        setUsernameError("");
      }
    }
    if (name === "bio") {
      if (value.length > 15) {
        setBioError("15文字以内で入力してください");
      } else {
        setBioError("");
      }
    }
    if (name === "one_line_profile") {
      if (value.length > 30) {
        setOneLineProfileError("30文字以内で入力してください");
      } else {
        setOneLineProfileError("");
      }
    }
    if (name === "background") {
      if (value.length > 140) {
        setBackgroundError("140文字以内で入力してください");
      } else {
        setBackgroundError("");
      }
    }
  };

  const [formError, setFormError] = useState<string>("");

  // 全体バリデーション（フォーム送信時などに使う場合）
  const validateAll = (form: Partial<ProfileUpdateRequest>) => {
    validateField("username", form.username || "");
    validateField("bio", form.bio || "");
    validateField("one_line_profile", form.one_line_profile || "");
    validateField("background", form.background || "");
    if (
      usernameError ||
      bioError ||
      oneLineProfileError ||
      backgroundError
    ) {
      setFormError("入力内容にエラーがあります。修正してください。");
      return false;
    } else {
      setFormError("");
      return true;
    }
  };

  return {
    usernameError,
    bioError,
    oneLineProfileError,
    backgroundError,
    formError,
    validateField,
    validateAll,
    setFormError,
  };
}
