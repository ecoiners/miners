import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
	origin: "*",
}));

async function initDB() {
	try {
		await sql`CREATE TABLE IF NOT EXISTS transactions(
			id SERIAL PRIMARY KEY,
			user_id VARCHAR(255) NOT NULL,
			title VARCHAR(255) NOT NULL,
			amount DECIMAL(10,2) NOT NULL,
			category VARCHAR(255) NOT NULL,
			created_at DATE NOT NULL DEFAULT CURRENT_DATE
		)`;
		
		console.log("✅ Initializing db success");
	} catch (error) {
		console.log("❌ Initializing db error : ", error);
		process.exit(1);
	}
};

// create transacrion
app.post("/api/transactions", async (req, res) => {
	try {
		const {title, amount, category, user_id} = req.body;
		
		if (!title || !user_id || !category || amount === undefined) {
			return res.status(400).json({ message: "All fields are required."});
		}
		
		const transaction = await sql`
		  INSERT INTO transactions(user_id, title, amount, category)
			VALUES (${user_id}, ${title}, ${amount}, ${category})
			RETURNING *
		`;
		
		console.log(transaction);
		res.status(201).json(transaction[0]);
		
	} catch (error) {
		console.log("post transaction error: ", error);
		res.status(500).json({ message: "Internal Server Error😭"});
	}
	
});

// get transaction by userId
app.get("/api/transactions/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		
		const transaction = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
		
		res.status(200).json(transaction);
		console.log(transaction);
	} catch (error) {
		console.log("get userId transaction error: ", error);
		res.status(500).json({ message: "Internal Server Error😭"});
	}
	
});

initDB().then(() => {
	app.listen(port, () => console.log("* server running in port ", port));
});