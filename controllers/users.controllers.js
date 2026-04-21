import { hash } from "../utils/hash.js";
import { db_connect } from "../utils/db.js"
import { getSalt } from "../utils/hash.js";

export const getUsers = async (req, res)=>{
    const sql = await db_connect();
    const text = "SELECT * FROM users";
    const result = await sql.query(text);
    console.log(result.rows);
    res.json(result.rows);
}

export const getUser = async (req, res)=>{
    const sql = await db_connect();
    const text = "SELECT * FROM users WHERE id = $1";
    const values = [req.params.id];
    const result = await sql.query(text, values);

    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: "User not found" });
    };
}

export const postUser = async (req, res)=>{
    const sql = await db_connect();
    const {username, password} = req.body
    const text = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const salt = getSalt(process.env.SALT_SIZE);
    const hashed = hash(password, salt);
    const salted_hashed = salt + hashed;
    const values = [username, salted_hashed];
    const result = await sql.query(text, values);
    res.json(result)
}

export const putUser = async (req, res)=>{
    const sql = await db_connect();
    const id = req.params.id
    const {username, password} = req.body
    const text = "UPDATE users SET username = $1, password = $2 WHERE id = $3";
    const values = [username, password, id];
    const result = await sql.query(text, values);
    res.json(result)
}

export const deleteUser = async (req, res)=>{
    const sql = await db_connect();
    const id = req.params.id
    const text = "DELETE FROM users WHERE id = $1";
    const values = [id];
    const result = await sql.query(text, values);
    res.json(result)
}