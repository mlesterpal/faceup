import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Provider } from "@/components/ui/provider";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
		<QueryClientProvider client={queryClient}>
			<Provider>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
);
