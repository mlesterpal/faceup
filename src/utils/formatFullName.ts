export const formatFullName = (
	firstName?: string | null,
	lastName?: string | null,
): string => [firstName, lastName].filter(Boolean).join(" ").trim() || "Unknown";
