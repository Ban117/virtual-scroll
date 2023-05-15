/* eslint-disable */
export default {
	displayName: "web-shared-ui-list-controller",
	preset: "../../../../../jest.preset.js",
	setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
	coverageDirectory:
		"../../../../../coverage/libs/web/shared/data-access/list-controller",
	transform: {
		"^.+\\.(ts|mjs|js|html)$": [
			"jest-preset-angular",
			{
				tsconfig: "<rootDir>/tsconfig.spec.json",
				stringifyContentPathRegex: "\\.(html|svg)$",
			},
		],
	},
	transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
	snapshotSerializers: [
		"jest-preset-angular/build/serializers/no-ng-attributes",
		"jest-preset-angular/build/serializers/ng-snapshot",
		"jest-preset-angular/build/serializers/html-comment",
	],
};