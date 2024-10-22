import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AuthProvider, { useAuth } from "../providers/authProvider";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

vi.mock("../providers/authProvider", async () => {
  const actualAuthProvider = await vi.importActual("../providers/authProvider");
  return {
    ...actualAuthProvider,
    useAuth: vi.fn(),
  };
});

describe("LoginPage Component", () => {
  const mockSetAuthToken = vi.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      setAuthToken: mockSetAuthToken,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Sets auth token and navigates to /home", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole("button", { name: /Continuar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);

    expect(mockSetAuthToken).toHaveBeenCalledWith("teste");

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
  });
});
