import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/api/(.*)', 'question/:id', '/tags', '/tags/:id', '/profile/:id', '/community', 'jobs'])
const ignoredRoutes = ['/api/webhook', '/api/chatgpt',] // Add your new route here
export default clerkMiddleware((auth, request) => {
  // Check if the route is in the ignoredRoutes array
  if (ignoredRoutes.some(route => request.url.includes(route))) {
    return; // Skip middleware for ignored routes
  }

  if (!isPublicRoute(request)) {
    auth().protect()
  }
});
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};