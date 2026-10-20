export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const data = await $fetch("https://api.audius.co/v1/tracks/trending", {
      query: {
        public_Key: config.audiusKey,
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
