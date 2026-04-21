import { db_connect } from "../utils/db.js"
import { hash } from "../utils/hash.js";

export const login = async (req, res) => {
    const sql = db_connect();
    const { username, password } = req.body;
    const text = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await sql.query(text, values);

    // primero verifica si existe el usuario
    if (result.rows.length === 0) {
        return res.status(404).json({ isLogin: false, user: {} });
    }

    // luego ya es seguro acceder a rows[0]
    const salt = result.rows[0].password.substring(0, process.env.SALT_SIZE);
    const hashed = hash(password, salt);
    const salted_hashed = salt + hashed;

    if (result.rows[0].password === salted_hashed) {
        return res.status(200).json({ isLogin: true, user: result.rows[0] });
    } else {
        return res.status(401).json({ isLogin: false, user: {} });
    }
};