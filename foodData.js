// Import each category file
import sushiFoods from './data/sushiFoods';
import sashimiFoods from './data/sashimiFoods';

// You can also create other files like basicFoods.js, dessertFoods.js, grilledFoods.js, specialFoods.js
import basicFoods from './data/basicFoods';
import grilledFoods from './data/grilledFoods';
import specialFoods from './data/specialFoods.js'
import dessertFoods from './data/dessertFoods.js'

// Merge them all into one array
const foodData = [
  ...sushiFoods,
  ...sashimiFoods,
  ...basicFoods,
  ...grilledFoods,
  ...specialFoods,
  ...dessertFoods
];

export default foodData;