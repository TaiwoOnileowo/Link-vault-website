// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const allowedOrigins = [
  "http://localhost:5173",
  "chrome-extension://jchegagelggnljjchmgnogddehfcoecp",
  "https://linkvaultapp.vercel.app",
]; 

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Extension-ID",
  "Access-Control-Allow-Credentials": "true",
};

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
