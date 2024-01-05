import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./setup/context/AuthProvider.tsx";
import { Web3Provider } from "./setup/context/web3Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Web3Provider>
        <Theme>
        <App />
        </Theme>
      </Web3Provider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
