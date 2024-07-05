import { Request, Response } from 'express';
import db from '@database/db';
import { VirtualMachine } from '@models/vm.model';

export const getVms = (req: Request, res: Response) => {
	db.all('SELECT * FROM vm', (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json(rows);
	});
};

export const getVm = (req: Request, res: Response) => {
	const id = req.params.id;
	db.get('SELECT * FROM vm WHERE id = ?', [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json(row);
	});
};

export const createVm = (req: Request, res: Response) => {
	// Extract all fields from req.body
	const vm = req.body as VirtualMachine;

	// Check if the request body is empty
	if (Object.keys(vm).length === 0) {
        res.status(400).json({ error: "No data provided" });
        return;
    }

	// Extract all keys and values from the request body
	const keys = Object.keys(vm);
	const values = Object.values(vm);

	// Construct the SQL query dynamically
	const valuePlaceholders = keys.map(() => '?').join(', ');
	const columns = keys.join(', ');
	const sql = `INSERT INTO vm (${columns}) VALUES (${valuePlaceholders})`;

	db.run(sql, values, function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		// Construct the response object dynamically
		const response: { [key: string]: any } = { id: this.lastID };
		keys.forEach((key, index) => {
			response[key] = values[index];
		});
		res.status(201).json(response);
	});
};

export const updateVm = (req: Request, res: Response) => {
	const id = req.params.id;
	// Extract all fields from req.body
	const updates = req.body as Partial<VirtualMachine>;
	const updateKeys = Object.keys(updates).filter(key => key !== 'id'); // Exclude the id field from the update

	if (updateKeys.length === 0) {
		res.status(400).json({ error: 'No update fields provided' });
		return;
	}

	// Construct the SQL query dynamically
	const setClause = updateKeys.map(key => `${key} = ?`).join(', ');
	const values = updateKeys.map(key => updates[key as keyof Partial<VirtualMachine>]);

	const sql = `UPDATE vm SET ${setClause} WHERE id = ?`;

	db.run(sql, [...values, id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Machine updated successfully' });
	});
};

export const deleteVm = (req: Request, res: Response) => {
	const id = req.params.id;
	db.run('DELETE FROM vm WHERE id = ?', [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Machine deleted successfully' });
	});
};
