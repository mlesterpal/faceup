const API_ORIGIN = "http://localhost:5182";

export const resolveImageUrl = (url?: string | null): string | null => {
	if (!url) return null;
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	return `${API_ORIGIN}${url.startsWith("/") ? url : `/${url}`}`;
};
