import AuthProvider from "./providers/authProvider";
import RouterComponent from "./routes/router";
import { Toaster } from "react-hot-toast";

const App = () => (
  <>
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
    <Toaster position="bottom-center" />
  </>
);

export default App;
