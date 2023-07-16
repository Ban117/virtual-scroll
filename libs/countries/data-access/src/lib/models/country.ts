import { Entity } from "@ban/shared/data-access/models";

export interface Country extends Entity {
	name: string;
	flag: string;
	code: string;
	someWeirdServerFieldNameWithCount?: number | null;
}
