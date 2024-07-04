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
	const { name, status } = req.body;
	db.run('INSERT INTO vm (name, status) VALUES (?, ?)', [name, status], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.status(201).json({ id: this.lastID, name, status });
	});
};

export const updateVm = (req: Request, res: Response) => {
	const id = req.params.id;
	const { name, status } = req.body;
	db.run('UPDATE vm SET name = ?, status = ? WHERE id = ?', [name, status, id], function (err) {
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
