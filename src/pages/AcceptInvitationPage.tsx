import { useEffect } from "react";
import toast from "react-hot-toast";
import { acceptEmailInvitation } from "../lib/services/emailService";
import { useNavigate, useSearchParams } from "react-router-dom";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvitation = async () => {
      const isSuccess = await acceptEmailInvitation(invitationToken ?? "");

      if (isSuccess) {
        navigate("/home");
      } else {
        toast.error("Falha ao aceitar convite");
      }
    };

    acceptInvitation();
  }, [invitationToken, navigate]);

  return <div className="text-dark-black">Aceitando seu convite...</div>;
};

export default AcceptInvitation;
