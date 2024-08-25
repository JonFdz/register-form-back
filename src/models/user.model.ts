export interface User {
	user_id: string;
	user_name: string;
	last_name: string;
	gender: string;
	birthdate: Date;
	birthplace: string;
	phone: number;
	email?: string;
	abilities?: string;
	role?: string;
}
