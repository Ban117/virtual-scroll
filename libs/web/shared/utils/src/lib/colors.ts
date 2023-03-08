export function mapFirstNameToHexColor(firstName: string, alpha = 0.4): string {
	// Generate a unique hash code for the input name
	let hashCode = 0;
	for (let i = 0; i < firstName.length; i++) {
		hashCode = firstName.charCodeAt(i) + ((hashCode << 5) - hashCode);
	}

	// Convert the hash code to a hexadecimal color code
	let hexColor = "#";
	for (let i = 0; i < 3; i++) {
		const value = (hashCode >> (i * 8)) & 0xff;
		hexColor += value.toString(16).padStart(2, "0");
	}

	// Append alpha value if provided
	if (alpha >= 0 && alpha <= 1) {
		const alphaHex = Math.round(alpha * 255)
			.toString(16)
			.padStart(2, "0");
		hexColor += alphaHex;
	}

	return hexColor;
}
