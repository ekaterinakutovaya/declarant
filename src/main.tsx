import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { AppRouter } from "./app/routers/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(<AppRouter />);
