import type { AudiusResponse } from "#shared/types/audius";
import { toTracks } from "#shared/utils/track";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { query } = getQuery(event);
  if (!query) return { data: [] };

  try {
    const payload = await $fetch<AudiusResponse<unknown>>(
      "https://api.audius.co/v1/tracks/search",
      { query: { public_Key: config.audiusKey, query } },
    );

    return { data: toTracks(payload.data) };
  } catch (error) {
    console.error("[api] search failed:", error);
    throw createError({
      statusCode: 502,
      statusMessage: "Audius is unavailable",
      cause: error,
    });
  }
});
