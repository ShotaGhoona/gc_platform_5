export type ExternalEventTag = {
  id: number;
  name: string;
  color: string;
};

export type ExternalEvent = {
  id: number;
  title: string;
  description: string;
  image?: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  tags: string[];
  hostUserId: string;
  hostUserName: string;
  hostAvatarImageUrl: string;
};

export async function fetchExternalEventList(tagNames?: string[]): Promise<ExternalEvent[]> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/external_events`;
  if (tagNames && tagNames.length > 0) {
    url += `?tag_names=${tagNames.join(",")}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("イベント一覧の取得に失敗しました");
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    startAt: item.start_at,
    endAt: item.end_at,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    deletedAt: item.deleted_at,
    tags: item.tags,
    hostUserId: item.host_user_id,
    hostUserName: item.host_user_name,
    hostAvatarImageUrl: item.host_avatar_image_url,
  }));
}

export async function fetchExternalEventTags(): Promise<ExternalEventTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/external_event_tags`);
  if (!res.ok) throw new Error("タグ一覧の取得に失敗しました");
  return await res.json();
}

export type ExternalEventCreate = {
  title: string;
  description?: string;
  image?: string;
  startAt: string;
  endAt: string;
  hostUserId: string;
  tags: string[];
};

export async function createExternalEvent(event: ExternalEventCreate): Promise<ExternalEvent> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/external_events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: event.title,
      description: event.description,
      image: event.image,
      start_at: event.startAt,
      end_at: event.endAt,
      host_user_id: event.hostUserId,
      tags: event.tags,
    }),
  });
  if (!res.ok) throw new Error("イベントの作成に失敗しました");
  const data = await res.json();
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    startAt: data.start_at,
    endAt: data.end_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    tags: data.tags,
    hostUserId: data.host_user_id,
    hostUserName: data.host_user_name,
    hostAvatarImageUrl: data.host_avatar_image_url,
  };
}

export async function deleteExternalEvent(eventId: number): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/external_events/${eventId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("イベント削除に失敗しました");
}

export async function updateExternalEvent(eventId: number, input: Partial<ExternalEventCreate>): Promise<ExternalEvent> {
  const requestBody: any = {};
  if (input.title !== undefined) requestBody.title = input.title;
  if (input.description !== undefined) requestBody.description = input.description;
  if (input.image !== undefined) requestBody.image = input.image;
  if (input.startAt !== undefined) requestBody.start_at = input.startAt;
  if (input.endAt !== undefined) requestBody.end_at = input.endAt;
  if (input.hostUserId !== undefined) requestBody.host_user_id = input.hostUserId;
  if (input.tags !== undefined) requestBody.tags = input.tags;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/external_events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) throw new Error("イベント編集に失敗しました");
  const data = await res.json();
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    startAt: data.start_at,
    endAt: data.end_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    tags: data.tags,
    hostUserId: data.host_user_id,
    hostUserName: data.host_user_name,
    hostAvatarImageUrl: data.host_avatar_image_url,
  };
}
