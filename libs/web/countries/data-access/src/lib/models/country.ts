import { Entity } from "@ban/web/shared/data-access/models";

export interface Country extends Entity {
	name: string;
	flag: string;
	code: string;
	someWeirdServerFieldNameWithCount?: number | null;
}
