import AuthProvider from "./providers/authProvider";
import RouterComponent from "./routes/Router";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <>
      <AuthProvider>
        <AnimatePresence>
          <RouterComponent />
        </AnimatePresence>
      </AuthProvider>
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
