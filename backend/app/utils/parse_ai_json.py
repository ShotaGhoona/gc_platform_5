import json

import re

def parse_ai_vision_response(content: str):
    """
    AIからの返答（JSON形式のテキスト）をパースし、mode, reply, ideasを返す
    ideasが空の場合はreplyから番号付きリストを抽出して補完
    """
    try:
        data = json.loads(content)
        mode = data.get("mode", "chat")
        reply = data.get("reply", "")
        ideas = data.get("ideas", [])
        if not isinstance(ideas, list) or not ideas:
            # replyから「1. ... 2. ...」のような案を抽出
            ideas = []
            matches = re.findall(r"\d+\.\s*([^\n]+)", reply)
            if matches and len(matches) >= 2:
                ideas = [m.strip() for m in matches]
    except Exception:
        mode = "chat"
        reply = content
        ideas = []
    return mode, reply, ideas
