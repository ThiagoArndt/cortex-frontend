// src/__tests__/setup.ts

import "@testing-library/jest-dom"; // This is fine to use for matchers

// Vitest global mocks
globalThis.fetch = vi.fn(); // Use 'vi' instead of 'jest'

// Mock React Router hooks like useNavigate for Vitest
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));
