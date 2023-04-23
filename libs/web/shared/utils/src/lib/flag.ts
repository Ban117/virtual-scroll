// dev.to/jorik/country-code-to-flag-emoji-a21
export function getFlagEmoji(countryCode: string | undefined): string {
	if (!countryCode) {
		return "❌";
	}
	return countryCode.replace(/./g, ch =>
		String.fromCodePoint(0x1f1a5 + ch.toUpperCase().charCodeAt(0)),
	);
}
