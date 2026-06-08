import "@testing-library/jest-dom/vitest";

if (typeof window.matchMedia !== "function")
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => undefined,
		removeListener: () => undefined,
		addEventListener: () => undefined,
		removeEventListener: () => undefined,
		dispatchEvent: () => false,
	});

if (typeof window.ResizeObserver === "undefined") {
	class ResizeObserverMock implements ResizeObserver {
		observe(): void {}
		unobserve(): void {}
		disconnect(): void {}
	}

	window.ResizeObserver = ResizeObserverMock;
	globalThis.ResizeObserver = ResizeObserverMock;
}
