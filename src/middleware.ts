// APARENTEMENTE FAZ COM QUE NAO SEJA POSSÍVEL VER PAGINA SOBRE
// CARA HOTEL // HOTEL DETAILS
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/users/:path*"],
};
// export const config = {
//   matcher: ["/users/:path*", "/api/:path*"],
// };
