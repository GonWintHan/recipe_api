const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory recipes list (starts with some sample data)
let recipes = [
  {
    id: 1,
    title: 'Pancakes',
    category: 'Breakfast',
    cookTime: '20 min',
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    ingredients: 'Flour, milk, eggs, sugar, butter, baking powder, salt',
    steps: '1. Mix ingredients.\n2. Cook on pan.\n3. Serve with syrup.'
  },
  {
    id: 2,
    title: 'Pad Thai',
    category: 'Lunch',
    cookTime: '25 min',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    ingredients: 'Rice noodles, shrimp or chicken, bean sprouts, tofu, peanuts',
    steps: '1. Soak noodles.\n2. Stir-fry and add sauce.\n3. Serve with lime.'
  }
];

let nextId = 3;

// Simple test route
app.get('/', (req, res) => {
  res.send('Recipe API is running (in-memory)');
});

// GET all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

// GET one recipe by id
app.get('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }
  res.json(recipe);
});

// CREATE recipe
app.post('/recipes', (req, res) => {
  const { title, category, cookTime, difficulty, imageUrl, ingredients, steps } = req.body;
  const newRecipe = {
    id: nextId++,
    title,
    category,
    cookTime,
    difficulty,
    imageUrl,
    ingredients,
    steps
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// UPDATE recipe
app.put('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).send('Recipe not found');
  }

  const { title, category, cookTime, difficulty, imageUrl, ingredients, steps } = req.body;

  recipes[index] = {
    ...recipes[index],
    title,
    category,
    cookTime,
    difficulty,
    imageUrl,
    ingredients,
    steps
  };

  res.json(recipes[index]);
});

// DELETE recipe
app.delete('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).send('Recipe not found');
  }

  const deleted = recipes.splice(index, 1)[0];
  res.json(deleted);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Recipe API listening on http://localhost:' + PORT);
});

module.exports = app;
