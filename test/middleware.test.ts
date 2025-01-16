import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

describe("Middleware", () => {
  it("redirects to /login if login cookie is undefined", () => {
    const mockRequest = {
      cookies: {
        get: vi.fn(() => undefined),
      },
      url: "http://localhost/dashboard",
    } as unknown as NextRequest;

    const response = middleware(mockRequest);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });

  it("redirects to /login if login cookie is not 'true'", () => {
    const mockRequest = {
      cookies: {
        get: vi.fn(() => ({ value: "false" })),
      },
      url: "http://localhost/dashboard",
    } as unknown as NextRequest;

    const response = middleware(mockRequest);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });

  it("allows if login cookie is 'true'", () => {
    const mockRequest = {
      cookies: {
        get: vi.fn(() => ({ value: "true" })),
      },
      url: "http://localhost/dashboard",
    } as unknown as NextRequest;

    const response = middleware(mockRequest);

    expect(response.status).toBe(200);
  });
});
