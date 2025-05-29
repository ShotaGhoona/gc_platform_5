import os
from openai import OpenAI
from app.utils.parse_ai_json import parse_ai_vision_response

def generate_vision_ideas(messages, mode_param="chat"):
    """
    OpenAI API（新バージョン）を使って、会話履歴からVision案4つを生成する
    mode: "chat"（会話継続）または"vision"（案生成）をAIに判定させる
    mode_param: "chat" | "suggest"
    """
    api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    if mode_param == "suggest":
        # 提案モード: 必ずmode: vision, ideas: ...のJsonで返す
        system_prompt = (
            "あなたは人生のVisionコーチです。"
            "ユーザーの入力内容をもとに、必ずmode: 'vision'でVision案を4つ提案してください。\n"
            "ここでのVisionとは「自分がなりたい将来像」「人生の理想像」「大切にしたい価値観」「生き方の方向性」など、"
            "抽象的で長期的な人生の目標や理想を指します。"
            "具体的な職業や施策ではなく、抽象的な理想や価値観を中心に案を出してください。\n"
            "例：『人々に勇気を与える存在になる』『自分らしく生きる』『世界に貢献する』『挑戦し続ける人生を歩む』など。\n"
            "返答は必ず以下のJSON形式で返してください：\n"
            "{\n"
            "  \"mode\": \"vision\",\n"
            "  \"reply\": \"会話としての返答文\",\n"
            "  \"ideas\": [\"案1\", \"案2\", \"案3\", \"案4\"]\n"
            "}\n"
        )
    else:
        # 通常の会話モード
        system_prompt = (
            "あなたは人生のVisionコーチです。ユーザーと自然な会話をしながら、"
            "十分な情報が得られるまではmode: 'chat'で質問や深掘りを続け、"
            "十分な情報が得られたと判断したらmode: 'vision'でVision案を4つ提案してください。\n"
            "ここでのVisionとは「自分がなりたい将来像」「人生の理想像」「大切にしたい価値観」「生き方の方向性」など、"
            "抽象的で長期的な人生の目標や理想を指します。"
            "具体的な職業や施策ではなく、抽象的な理想や価値観を中心に案を出してください。\n"
            "例：『人々に勇気を与える存在になる』『自分らしく生きる』『世界に貢献する』『挑戦し続ける人生を歩む』など。\n"
            "返答は必ず以下のJSON形式で返してください：\n"
            "{\n"
            "  \"mode\": \"chat\" または \"vision\",\n"
            "  \"reply\": \"会話としての返答文\",\n"
            "  \"ideas\": [\"案1\", \"案2\", \"案3\", \"案4\"]（mode: 'vision'のときのみ必須）\n"
            "}\n"
            "mode: 'chat'のときはideasは空リストでOKです。"
        )

    chat_messages = [{"role": "system", "content": system_prompt}] + messages

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=chat_messages,
        temperature=0.7,
        max_tokens=800,
    )

    content = response.choices[0].message.content
    mode, reply, ideas = parse_ai_vision_response(content)
    return mode, reply, ideas

def update_vision(db, user_id: str, vision: str):
    from app.database.models.profile import Profile
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        return False
    profile.vision = vision
    db.commit()
    return True
