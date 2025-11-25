const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();  // <-- load .env

const app = express();
app.use(cors());
app.use(express.json());

// connect using TiDB DATABASE_URL (no localhost, no manual host/port)
const connection = mysql.createConnection(process.env.DATABASE_URL);



// simple test route
app.get('/', (req, res) => {
  res.send('Recipe API is running');
});

// READ all recipes
app.get('/recipes', (req, res) => {
  connection.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error('GET /recipes error:', err);
      return res.status(500).send('Error fetching recipes');
    }
    res.json(results);
  });
});

// CREATE recipe
app.post('/recipes', (req, res) => {
  const { title, category, cookTime, difficulty, imageUrl, ingredients, steps } = req.body;

  connection.query(
    'INSERT INTO recipes (title, category, cookTime, difficulty, imageUrl, ingredients, steps) VALUES (?,?,?,?,?,?,?)',
    [title, category, cookTime, difficulty, imageUrl, ingredients, steps],
    (err, results) => {
      if (err) {
        console.error('POST /recipes error:', err);
        return res.status(500).send('Error adding recipe');
      }
      res.status(200).json({ id: results.insertId });
    }
  );
});

// UPDATE recipe
app.put('/recipes/:id', (req, res) => {
  const id = req.params.id;
  const { title, category, cookTime, difficulty, imageUrl, ingredients, steps } = req.body;

  connection.query(
    'UPDATE recipes SET title=?, category=?, cookTime=?, difficulty=?, imageUrl=?, ingredients=?, steps=? WHERE id = ?',
    [title, category, cookTime, difficulty, imageUrl, ingredients, steps, id],
    (err, results) => {
      if (err) {
        console.error('PUT /recipes error:', err);
        return res.status(500).send('Error updating recipe');
      }
      res.json(results);
    }
  );
});

// DELETE recipe
app.delete('/recipes/:id', (req, res) => {
  const id = req.params.id;

  connection.query(
    'DELETE FROM recipes WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('DELETE /recipes error:', err);
        return res.status(500).send('Error deleting recipe');
      }
      res.json(results);
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Recipe API listening on http://localhost:' + PORT);
});

module.exports = app;
