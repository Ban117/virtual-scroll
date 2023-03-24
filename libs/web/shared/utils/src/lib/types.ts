export type ExtractTypeFromReadonlyArray<T> = T extends ReadonlyArray<infer U>
	? U
	: never;

export type ObjectValues<T> = T[keyof T];
