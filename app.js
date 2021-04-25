const getRequest = async (recipes, mealSearch) => {
  const APP_KEY = "0e19a79419a024466929ce8969daa079";
  const APP_ID = "c16d855e";
  const response = await fetch(`https://api.edamam.com/search?q=${recipes}&${mealSearch}app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20&calories=591-722&health=alcohol-free`);
  return response.json();
};

const dataSearch = (callback) => $("#submit_btn").on("click", callback);

dataSearch(async () => {
  const recipes = $("#search_field").val();
  let responseSearch = await getRequest(recipes);
  let countRecipes = responseSearch.to;


  const loadCategories = () => {
  $(".search_results").empty();
  $('#text').empty();
  for (let index = 0; index < countRecipes; index++) {
    let calories = responseSearch.hits[index].recipe.calories;
    calories = Math.round(calories) + " Calories";
    const image = responseSearch.hits[index].recipe.image;
    const data = responseSearch.hits[index].recipe.ingredientLines;
    const labels = responseSearch.hits[index].recipe.label;

    let item = `
            <div class="item">
            <div class="flex_container">
            <h1 class="title">${labels}</h1>
            <img class="image_recipe" src="${image}"/>
            <a class="view_button" href="#"></a>
            </div>
            <p class="item_data">${calories}</p>
            <p class="recipe_info">${data}</p>
            </div>`;
    $(".search_results").append(item);
  }
}
loadCategories();  

  //buttons categories
  $("#breakfast").on("click", async function () {
    mealSearch = "mealType=breakfast&";
    responseSearch = await getRequest(recipes, mealSearch);
    loadCategories();
  });

  $("#lunch").on("click", async function () {
    mealSearch = "mealType=lunch&";
    responseSearch = await getRequest(recipes, mealSearch);
    loadCategories();
  });
  $("#dinner").on("click", async function () {
    mealSearch = "mealType=dinner&";
    responseSearch = await getRequest(recipes, mealSearch);
    loadCategories();
  });
  $("#snack").on("click", async function () {
    mealSearch = "mealType=snack&";
    responseSearch = await getRequest(recipes, mealSearch);
    loadCategories();
  });
  $("#teatime").on("click", async function () {
    mealSearch = "mealType=teatime&";
    responseSearch = await getRequest(recipes, mealSearch);
    loadCategories();
  });
});

$('.wrapper').css('cursor', 'pointer');