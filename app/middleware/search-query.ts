export default defineNuxtRouteMiddleware((to) => {
  const q = String(to.query.q ?? "").trim();

  if (!q) {
    return navigateTo("/");
  }
});
