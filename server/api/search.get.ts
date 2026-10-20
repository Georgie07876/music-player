export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { query } = getQuery(event);
  if (!query) return { data: [] };
  try {
    const data = await $fetch("https://api.audius.co/v1/tracks/search", {
      query: {
        public_Key: config.audiusKey,
        query,
      },
    });
    return data;
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: "Audius is unavailable",
      cause: error,
    });
  }
});
