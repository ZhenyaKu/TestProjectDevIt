export type StringOrNull = string | null;

export type Profile = {
	id: string;
	name: StringOrNull;
	phone: StringOrNull;
	email: StringOrNull;
	password: StringOrNull;
	position: StringOrNull;
	skype: StringOrNull;
};
