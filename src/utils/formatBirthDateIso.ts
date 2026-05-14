/**
 * Builds an ISO calendar date string (YYYY-MM-DD) from separate UI fields.
 */
export function formatBirthDateIso(
	year: string,
	month: string,
	day: string,
): string {
	const y = year.trim();
	const m = month.trim().padStart(2, "0");
	const d = day.trim().padStart(2, "0");
	return `${y}-${m}-${d}`;
}
