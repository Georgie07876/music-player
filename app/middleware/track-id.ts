export default defineNuxtRouteMiddleware((to) => {
  const id = String(to.params.id ?? "");

  if (!/^[A-Za-z0-9]+$/.test(id)) {
    return navigateTo("/");
  }
});
