import { Request, Response } from 'express';
import db from '../database/db';
import { Activity } from '../models/activity.model';

export const getActivities = (req: Request, res: Response) => {
    db.all("SELECT * FROM activities", (err: any, activities: Activity[]) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ activities });
	})
}

export const getActivity = (req: Request, res: Response) => {
	const id = req.params.id;
	db.get("SELECT * FROM activities WHERE activity_id = ?", [id], (err: any, activity: Activity) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ activity });
	})
}

export const createActivity = (req: Request, res: Response) => {
	// Extract all fields from req.body
	const activity = req.body as Activity;

	// Check if the request body is empty
	if (Object.keys(activity).length === 0) {
        res.status(400).json({ error: "No data provided" });
        return;
    }

	// Extract all keys and values from the request body
	const keys = Object.keys(activity);
	const values = Object.values(activity);

	// Construct the SQL query dynamically
	const valuePlaceholders = keys.map(() => '?').join(', ');
	const columns = keys.join(', ');
	const sql = `INSERT INTO activities (${columns}) VALUES (${valuePlaceholders})`;

	db.run(sql, values, function (this: any, err: any) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		// Construct the response object dynamically
		const response: { [key: string]: any } = { activity_id: this.lastID };
		keys.forEach((key, index) => {
			response[key] = values[index];
		});
		res.status(201).json(response);
	});
};

export const updateActivity = (req: Request, res: Response) => {
	const id = req.params.id;
	// Extract all fields from req.body
	const updates = req.body as Partial<Activity>;
	const updateKeys = Object.keys(updates).filter(key => key !== 'id'); // Exclude the id field from the update

	if (updateKeys.length === 0) {
		res.status(400).json({ error: 'No update fields provided' });
		return;
	}

	// Construct the SQL query dynamically
	const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
	const values = updateKeys.map(key => updates[key as keyof Partial<Activity>]);

	const sql = `UPDATE activities SET ${setClause} WHERE activity_id = ?`;

	db.run(sql, [...values, id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Activity updated successfully' });
	});
};

export const deleteActivity = (req: Request, res: Response) => {
	const id = req.params.id;
	db.run('DELETE FROM activities WHERE activity_id = ?', [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Activity deleted successfully' });
	});
};
