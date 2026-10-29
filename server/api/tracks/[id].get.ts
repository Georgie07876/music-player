import type { AudiusResponse } from "#shared/types/audius";
import { isAudiusTrack, toTrack } from "#shared/utils/track";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  let payload: AudiusResponse<unknown>;

  try {
    payload = await $fetch<AudiusResponse<unknown>>(
      `https://api.audius.co/v1/tracks/${id}`,
      {
        query: {
          public_Key: config.audiusKey,
        },
      },
    );
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;

    if (status && status < 500) {
      throw createError({ statusCode: 404, statusMessage: "Track not found" });
    }

    throw createError({
      statusCode: 502,
      statusMessage: "Audius is unavailable",
      cause: error,
    });
  }

  if (!isAudiusTrack(payload.data)) {
    throw createError({
      statusCode: 502,
      statusMessage: "Unexpected response from Audius",
      cause: payload,
    });
  }

  return { data: toTrack(payload.data) };
});
