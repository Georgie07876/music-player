import type { AudiusResponse } from "#shared/types/audius";
import { toTracks } from "#shared/utils/track";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const payload = await $fetch<AudiusResponse<unknown>>(
      "https://api.audius.co/v1/tracks/trending",
      { query: { public_Key: config.audiusKey } },
    );

    return { data: toTracks(payload.data) };
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: "Audius is unavailable",
      cause: error,
    });
  }
});
