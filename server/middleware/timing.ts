declare module "h3" {
  interface H3EventContext {
    startedAt?: number;
  }
}

export default defineEventHandler((event) => {
  if (!event.path.startsWith("/api/")) return;

  event.context.startedAt = performance.now();

  event.node.res.once("finish", () => {
    const ms = Math.round(performance.now() - (event.context.startedAt ?? 0));
    console.log(`[api] ${event.method} ${event.path} — ${ms}ms`);
  });
});
