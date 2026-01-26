/**
 * Safely extracts error message from unknown error type
 * @param error - Unknown error object
 * @param fallback - Default message if error cannot be determined
 * @returns Error message string
 */
export function getErrorMessage(error: unknown, fallback: string = "An error occurred"): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object" && "message" in error) {
		return String(error.message);
	}

	return fallback;
}
