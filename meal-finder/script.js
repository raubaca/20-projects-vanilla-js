const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const resultText = document.getElementById('result');
const mealsList = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

const searchMeals = async (e) => {
  e.preventDefault();

  mealsList.innerHTML = '';
  singleMeal.innerHTML = '';

  const term = searchInput.value.trim();

  if (term === '') {
    alert('Please enter a search term');
    return;
  }

  const response = await fetch(`${API_URL}search.php?s=${term}`);
  const { meals } = await response.json();

  if (!meals) {
    resultText.innerHTML = '<p>There are no search results. Try again!</p>';
    return;
  }

  resultText.innerHTML = `<h2>Search results for "${term}":</h2>`;
  mealsList.innerHTML = meals
    .map(
      (meal) => `
        <li class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealid="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </li>
      `
    )
    .join('');

  searchInput.value = '';
};

const getRandomMeal = async () => {
  resultText.innerHTML = '';
  mealsList.innerHTML = '';

  const response = await fetch(`${API_URL}random.php`);
  const { meals } = await response.json();
  addMealToDOM(meals[0]);
};

const getMealById = async (mealId) => {
  const response = await fetch(`${API_URL}lookup.php?i=${mealId}`);
  const { meals } = await response.json();
  addMealToDOM(meals[0]);
};

const addMealToDOM = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<small>${meal.strArea}</small>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

submitBtn.addEventListener('submit', searchMeals);

randomBtn.addEventListener('click', getRandomMeal);

mealsList.addEventListener('click', (e) => {
  const mealInfo = e
    .composedPath()
    .find((item) => item.classList?.contains('meal-info') ?? false);

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    getMealById(mealId);
  }
});
