import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

export function renderWithProviders(
	ui: ReactElement,
	options?: RenderOptions,
) {
	return render(
		<Provider>
			<MemoryRouter>{ui}</MemoryRouter>
		</Provider>,
		options,
	);
}
