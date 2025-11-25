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
    imageUrl: 'assets/images/pancakes.jpg',
    ingredients: 'Flour, milk, eggs, sugar, butter, baking powder, salt',
    steps:
      '1. Mix dry ingredients in a bowl.\n' +
      '2. Add milk and eggs, whisk until smooth.\n' +
      '3. Heat pan with a little butter.\n' +
      '4. Pour batter and cook until bubbles form.\n' +
      '5. Flip and cook the other side.\n' +
      '6. Serve with syrup or fruit.',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Pad Thai',
    category: 'Lunch',
    cookTime: '25 min',
    difficulty: 'Medium',
    imageUrl: 'assets/images/pad_thai.jpg',
    ingredients:
      'Rice noodles, shrimp or chicken, egg, bean sprouts, tofu, garlic, peanuts, lime, Pad Thai sauce',
    steps:
      '1. Soak rice noodles in warm water until soft.\n' +
      '2. Stir-fry garlic and tofu in a hot pan.\n' +
      '3. Add shrimp or chicken and cook.\n' +
      '4. Push everything aside and scramble the egg.\n' +
      '5. Add noodles and Pad Thai sauce, toss well.\n' +
      '6. Add bean sprouts and chives, cook briefly.\n' +
      '7. Serve with crushed peanuts and lime.',
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Green Curry with Chicken',
    category: 'Dinner',
    cookTime: '35 min',
    difficulty: 'Medium',
    imageUrl: 'assets/images/green_curry.jpg',
    ingredients:
      'Chicken, green curry paste, coconut milk, eggplant, bamboo shoots, basil, fish sauce, sugar',
    steps:
      '1. Fry green curry paste in a pot until fragrant.\n' +
      '2. Add coconut milk and bring to a gentle boil.\n' +
      '3. Add chicken pieces and cook until almost done.\n' +
      '4. Add eggplant and bamboo shoots.\n' +
      '5. Season with fish sauce and sugar.\n' +
      '6. Add basil leaves before turning off the heat.\n' +
      '7. Serve with steamed rice.',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Mango Sticky Rice',
    category: 'Dessert',
    cookTime: '40 min',
    difficulty: 'Medium',
    imageUrl: 'assets/images/mango_sticky_rice.jpg',
    ingredients:
      'Glutinous rice, coconut milk, sugar, salt, ripe mango, sesame seeds',
    steps:
      '1. Soak glutinous rice in water for a few hours.\n' +
      '2. Steam the rice until cooked.\n' +
      '3. Warm coconut milk with sugar and a pinch of salt.\n' +
      '4. Mix most of the coconut milk with the hot sticky rice.\n' +
      '5. Let it rest so the rice absorbs the coconut milk.\n' +
      '6. Serve with sliced ripe mango and drizzle extra coconut milk.\n' +
      '7. Sprinkle with sesame seeds.',
    isFavorite: false,
  },
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
