import { Entity } from "@ban/web/shared/data-access/models";

export interface User extends Entity {
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl?: string | null;
}
