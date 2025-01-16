import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DashboardPage from "../app/dashboard/page";

// Mock redirect function
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Test fetch API
global.global.fetch = vi.fn(async () =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        data: [
          {
            id: 1,
            date: "2025-01-19",
            referenceId: "TXN123",
            to: "Alice",
            transactionType: "Deposit",
            amount: 100.5,
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    ),
  ),
);

describe("DashboardPage", () => {
  // Test cookies
  vi.mock("next/headers", () => ({
    cookies: vi.fn(() => ({
      get: vi.fn((key) => {
        if (key === "login") return { value: "true" };
        if (key === "username") return { value: "JohnDoe" };
        return null;
      }),
    })),
  }));

  it("redirects to /login if no login cookies", async () => {
    vi.mock("next/headers", () => ({
      cookies: vi.fn(() => ({
        get: vi.fn(() => null),
      })),
    }));

    const response = await DashboardPage();
    expect(response).toBeUndefined();
  });

  it("renders dashboard with user transactions", async () => {
    render(await DashboardPage());

    // await waitFor(() => screen.getByText("Welcome Back JohnDoe!"));
    expect(screen.getByText("19 Jan 2025")).toBeInTheDocument();
    expect(screen.getByText("TXN123")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("RM 100.50")).toBeInTheDocument();
  });

  it("shows error message if API fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(null, {
          status: 500,
          statusText: "Internal Server Error",
        }),
      ),
    );

    const response = await DashboardPage();

    expect(response).toBeUndefined();
  });
});
