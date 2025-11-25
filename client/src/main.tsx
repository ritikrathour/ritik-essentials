import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux-store/Store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./TanstackQuery/QueryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{
            style: {
              paddingTop: "4px",
              paddingBottom: "4px",
              background: "rgb(0,0,0)",
              color: "#fff",
              fontSize: "12px",
              border: "1px solid #333",
              textAlign: "center",
            },
          }}
        />
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
