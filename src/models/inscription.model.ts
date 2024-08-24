import { User } from './user.model';
import { Activity } from './activity.model';

export interface Inscription {
	inscription_id?: number;
	user_id: User['user_id'];
	activity1_id: Activity['activity_id'];
	activity2_id?: Activity['activity_id'];
	activity3_id?: Activity['activity_id'];
	activity4_id?: Activity['activity_id'];
	activity5_id?: Activity['activity_id'];
	fee: number;
	referred: string;
	created_at?: string;
}