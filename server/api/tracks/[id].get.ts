export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");
  try {
    const data = await $fetch(`https://api.audius.co/v1/tracks/${id}`, {
      query: {
        public_Key: config.audiusKey,
      },
    });
    return data;
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
});
