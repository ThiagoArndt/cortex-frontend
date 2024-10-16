import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
// import api from "../lib/axiosInstance";
import axios from "axios";
import { Input } from "../components/Input";
import loginImage from "../assets/register_image.png";
import logoImage from "../assets/logo.png";
import Button from "../components/Button/Button";
import { useState } from "react";
import FeatherIcons from "feather-icons-react";

function LoginPage() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    try {
      //const response = await api.post(`${process.env.BASE_URL}/login`, data);
      //setAuthToken(response.data.token);
      setAuthToken("teste");
      navigate("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro desconhecido");
      }
    }
  };

  const handleValidation = () => {
    if (username.length === 0 || password.length === 0) {
      toast.error("Campos não podems ser vazios");
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full bg-background-color">
      {/* Cabeçalho "hello" na parte superior */}

      {/* Container para o conteúdo centralizado */}
      <div className="bg-white flex flex-col md:flex-row w-full h-full shadow-lg overflow-hidden relative">
        {/* Texto posicionado na parte superior direita (onde você marcou em vermelho) */}

        <div className="hidden md:flex w-[60%] bg-primary-color items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <img src={loginImage} alt="" className="" />
          </div>
        </div>

        {/* Ajustando esta seção para centralizar o conteúdo */}
        <div className="w-full h-full p-6 flex flex-col justify-between">
          <div className="h-auto flex flex-row gap-5  items-center">
            <img src={logoImage} alt="" className="w-16" />
            <h1 className="text-primary-color font-bold text-4xl">Cortex</h1>
          </div>
          <div className="md:w-1/2 mb-20 m-auto h-full w-full justify-center items-center flex flex-col">
            <h2 className="md:text-[2.4vw] text-[7.4vw] font-semibold text-dark-black mb-4 text-center">
              Seja bem-vindo ao Cortex
            </h2>
            <form
              className="w-full flex flex-col gap-5"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
            >
              <Input.Root>
                <Input.Label label="Nome de Usuário" />
                <Input.Text
                  value={username}
                  placeholder="cortex@gmail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Input.Root>
              <Input.Root>
                <Input.Label label="Senha" />
                <div className="flex flex-col-reverse">
                  <Input.Text
                    value={password}
                    placeholder="*******"
                    type={showPassword ? "password" : "text"}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <div
                      onClick={togglePasswordVisibility}
                      className="w-full flex justify-end cursor-pointer"
                    >
                      <FeatherIcons
                        icon={showPassword ? "eye-off" : "eye"}
                        size={24}
                        className="text-dark-grey absolute top-1/2 -translate-y-1/2 right-4"
                      />
                    </div>
                  </Input.Text>
                </div>
              </Input.Root>
              <Button type="submit" title="Continuar" />
            </form>
            <div className="text-center w-full justify-center flex mt-6">
              <div className="text-base font-medium text-primary-color">
                <span className="font-normal text-dark-black">Não possui cadastro?</span>{" "}
                <span className="hover:brightness-95 cursor-pointer">Registre-se aqui.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
