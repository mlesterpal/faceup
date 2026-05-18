export function formatTimeAgo(
	isoDate: string,
	now: Date = new Date(),
): string {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return "";

	const diffMs = now.getTime() - date.getTime();
	const diffSec = Math.floor(diffMs / 1000);

	if (diffSec < 0) return "Just now";
	if (diffSec < 60) return "Just now";

	const diffMin = Math.floor(diffSec / 60);
	if (diffMin < 60) return `${diffMin} min ago`;

	const diffHr = Math.floor(diffMin / 60);
	if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

	const diffDays = Math.floor(diffHr / 24);
	if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

	return date.toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
	});
}
