/* eslint-disable */
export default {
	displayName: "web-shared-data-access-models",
	preset: "../../../../../jest.preset.js",
	transform: {
		"^.+\\.[tj]s$": [
			"ts-jest",
			{ tsconfig: "<rootDir>/tsconfig.spec.json" },
		],
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory:
		"../../../../../coverage/libs/web/shared/data-access/models",
};
