import { Request, Response } from 'express';
import db from '@database/db';
import { Inscription } from '@models/inscription.model';

const sql = `
    SELECT
        i.inscription_id,
        u.user_id,
        u.user_name,
        u.last_name,
        u.gender,
        u.birthdate,
        u.birthplace,
        u.phone,
        u.email,
        u.abilities,
        a1.activity_id AS activity1_id,
        a1.activity_name AS activity1_name,
        a1.instructor AS activity1_instructor,
        a1.place AS activity1_place,
        a1.day AS activity1_day,
        a1.hour AS activity1_hour,
        a1.description AS activity1_description,
        a2.activity_id AS activity2_id,
        a2.activity_name AS activity2_name,
        a2.instructor AS activity2_instructor,
        a2.place AS activity2_place,
        a2.day AS activity2_day,
        a2.hour AS activity2_hour,
        a2.description AS activity2_description,
        a3.activity_id AS activity3_id,
        a3.activity_name AS activity3_name,
        a3.instructor AS activity3_instructor,
        a3.place AS activity3_place,
        a3.day AS activity3_day,
        a3.hour AS activity3_hour,
        a3.description AS activity3_description,
        a4.activity_id AS activity4_id,
        a4.activity_name AS activity4_name,
        a4.instructor AS activity4_instructor,
        a4.place AS activity4_place,
        a4.day AS activity4_day,
        a4.hour AS activity4_hour,
        a4.description AS activity4_description,
        a5.activity_id AS activity5_id,
        a5.activity_name AS activity5_name,
        a5.instructor AS activity5_instructor,
        a5.place AS activity5_place,
        a5.day AS activity5_day,
        a5.hour AS activity5_hour,
        a5.description AS activity5_description,
        i.fee,
        i.referred,
        i.created_at
    FROM inscriptions i
    LEFT JOIN users u ON i.user_id = u.user_id
    LEFT JOIN activities a1 ON i.activity1_id = a1.activity_id
    LEFT JOIN activities a2 ON i.activity2_id = a2.activity_id
    LEFT JOIN activities a3 ON i.activity3_id = a3.activity_id
    LEFT JOIN activities a4 ON i.activity4_id = a4.activity_id
    LEFT JOIN activities a5 ON i.activity5_id = a5.activity_id
	WHERE a1.activity_id IS NOT NULL
    OR a2.activity_id IS NOT NULL
    OR a3.activity_id IS NOT NULL
    OR a4.activity_id IS NOT NULL
    OR a5.activity_id IS NOT NULL
`;

export const getInscriptions = (req: Request, res: Response) => {
	db.all(sql, (err: any, inscriptions: Inscription[]) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ inscriptions });
	});
};

export const getInscription = (req: Request, res: Response) => {
	const id = req.params.id;
	db.get(sql + ' AND i.inscription_id = ?', [id], (err: any, inscription: Inscription) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		if (!inscription) {
			res.status(404).json({ error: "Inscription not found" });
			return;
		}
		res.json({ inscription });
	});
};

export const createInscription = (req: Request, res: Response) => {
	// Extract all fields from req.body
	const inscription = req.body as Inscription;

	// Check if the request body is empty
	if (Object.keys(inscription).length === 0) {
		res.status(400).json({ error: "No data provided" });
		return;
	}

	// Extract all keys and values from the request body
	const keys = Object.keys(inscription);
	const values = Object.values(inscription);

	// Construct the SQL query dynamically
	const valuePlaceholders = keys.map(() => '?').join(', ');
	const columns = keys.join(', ');
	const sql = `INSERT INTO inscriptions (${columns}) VALUES (${valuePlaceholders})`;

	db.run(sql, values, function (this: any, err: any) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		// Construct the response object dynamically
		const response: { [key: string]: any } = { inscription_id: this.lastID };
		keys.forEach((key, index) => {
			response[key] = values[index];
		});
		res.status(201).json(response);
	});
};

export const updateInscription = (req: Request, res: Response) => {
	const id = req.params.id;
	// Extract all fields from req.body
	const updates = req.body as Partial<Inscription>;
	const updateKeys = Object.keys(updates).filter(key => key !== 'id'); // Exclude the id field from the update

	if (updateKeys.length === 0) {
		res.status(400).json({ error: 'No update fields provided' });
		return;
	}

	// Construct the SQL query dynamically
	const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
	const values = updateKeys.map(key => updates[key as keyof Partial<Inscription>]);

	const sql = `UPDATE inscriptions SET ${setClause} WHERE inscription_id = ?`;

	db.run(sql, [...values, id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Inscription updated successfully' });
	});
};

export const deleteInscription = (req: Request, res: Response) => {
	const id = req.params.id;
	db.run('DELETE FROM inscriptions WHERE inscription_id = ?', [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Inscription deleted successfully' });
	});
};
