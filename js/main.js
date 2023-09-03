let timePerAll = 600;
// loading screen
window.addEventListener("load", () => {
  $(".loading").fadeOut(timePerAll);
});
// animation of menu
let c = 0;
$(".toggle-icon, menu .links li").on("click", () => {
  if (c % 2) {
    $("nav .toggle").animate({ left: 0 }, timePerAll);
    $("menu").animate({ left: -300 }, timePerAll);
    $("menu ul").removeClass("animate__animated animate__backInUp");
    $(".toggle-icon i:first-child").toggleClass("d-none");
    $(".toggle-icon i:last-child").toggleClass("d-none");
  } else {
    $("nav .toggle").animate({ left: 300 }, timePerAll);
    $("menu").animate({ left: 0 }, timePerAll);
    $("menu ul").addClass("animate__animated animate__backInUp");
    $(".toggle-icon i:first-child").toggleClass("d-none");
    $(".toggle-icon i:last-child").toggleClass("d-none");
  }
  c++;
});

// get all cats from api
async function showAllCat() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let myData = await res.json();
  console.log(myData.categories);
  let allCats = myData.categories;
  allCats.forEach((cat) => {
    $("main .cats").append(`
         <div class="cat" data-strCat='${cat.strCategory}'>
          <div class="desc">
            <h3>${cat.strCategory}</h3>
            <p>${cat.strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
          </div>
          <img src="${cat.strCategoryThumb}">
        </div>
      `);
  });
  $(".cat").click(function () {
    console.log(this.dataset.strcat);
    resetAll();
    showAllMealsOfCat(this.dataset.strcat);
  });
}

async function showAllMealsOfCat(catName) {
  $(".meals").html(null);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
  );
  let allMeals = await res.json();
  let meals = allMeals.meals;
  meals.forEach((meal) => {
    $(".meals").append(`
       <div class="meal col-3" data-id=${meal.idMeal}>
            <img src="${meal.strMealThumb}" alt="meal-${meal.strMeal}">
            <p>${meal.strMeal}</p>
          </div>
          `);
  });
  $(".meal").click(function () {
    resetAll();
    $(".meal-details").removeClass("d-none");
    showDetailsOfMeal(this.dataset.id);
  });
  console.log(meals);
}

// get all areas from api
async function showAllAreas() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let myData = await res.json();
  console.log(myData);
  let allAreas = myData.meals;
  allAreas.forEach((area) => {
    $("main .areas").append(`
           <div class="area" data-area=${area.strArea}>
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <p>${area.strArea}</p>
        </div>
    `);
  });
  $(".area").click(function () {
    resetAll();
    showAllMealsOfArea(this.dataset.area);
  });
}
async function showAllMealsOfArea(area) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let allMeals = await res.json();
  let meals = allMeals.meals;
  meals.forEach((meal) => {
    $(".meals").append(`
       <div class="meal col-3" data-id=${meal.idMeal}>
            <img src="${meal.strMealThumb}" alt="meal-${meal.strMeal}">
            <p>${meal.strMeal}</p>
          </div>
          `);
  });
  $(".meal").click(function () {
    resetAll();
    $(".meal-details").removeClass("d-none");
    showDetailsOfMeal(this.dataset.id);
  });
  console.log(meals);
}
// get all areas from api
async function showAllIngs() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let myData = await res.json();
  let allIngs = myData.meals;
  for (let i = 0; i < 20; i++) {
    let desc = String(allIngs[i].strDescription);

    $("main .ings").append(`
                <div class="ing" data-ing='${allIngs[i].strIngredient}'>
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h2>${allIngs[i].strIngredient}</h2>
          <p>${desc.split(" ").slice(0, 30).join(" ")}</p>
        </div>
    `);
  }
  $(".ing").click(function () {
    resetAll();
    let myIng = this.dataset.ing;
    if (myIng.includes(" ")) {
      console.log(typeof myIng);
      myIng = myIng.split(" ").join("_");
      console.log(myIng);
    }
    showAllMealsOfIngs(myIng);
  });
}

async function showAllMealsOfIngs(ing) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  let allMeals = await res.json();
  let meals = allMeals.meals;
  meals.forEach((meal) => {
    $(".meals").append(`
       <div class="meal col-3" data-id=${meal.idMeal}>
            <img src="${meal.strMealThumb}" alt="meal-${meal.strMeal}">
            <p>${meal.strMeal}</p>
          </div>
    `);
  });
  $(".meal").click(function () {
    resetAll();
    $(".meal-details").removeClass("d-none");
    showDetailsOfMeal(this.dataset.id);
  });
  console.log(meals);
}

function resetAll() {
  $(".cats").html(null);
  $(".areas").html(null);
  $(".ings").html(null);
  $(".meals").html(null);
  if (!$(".filters").hasClass("d-none")) $(".filters").addClass("d-none");
  if (!$(".contact").hasClass("d-none")) $(".contact").addClass("d-none");
  if (!$(".meal-details").hasClass("d-none"))
    $(".meal-details").addClass("d-none");
}

$("#cats").click(() => {
  resetAll();
  showAllCat();
});
$("#areas").click(() => {
  resetAll();
  showAllAreas();
});

$("#ings").click(() => {
  resetAll();
  showAllIngs();
});

$("#search").click(() => {
  resetAll();
  $(".filters").removeClass("d-none");
});

$("#contact").click(() => {
  resetAll();
  $(".contact").removeClass("d-none");
});

// filter data by the name of meal
async function searchByName(s = "") {
  $(".meals").html(null);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`
  );
  let allMeals = await res.json();
  let meals = allMeals.meals;
  meals.forEach((meal) => {
    $(".meals").append(`
       <div class="meal col-3" data-id=${meal.idMeal}>
            <img src="${meal.strMealThumb}" alt="meal-${meal.strMeal}">
            <p>${meal.strMeal}</p>
          </div>
          `);
  });
  $(".meal").click(function () {
    resetAll();
    $(".meal-details").removeClass("d-none");
    showDetailsOfMeal(this.dataset.id);
  });
  console.log(meals);
}

// Start point
searchByName();

async function showDetailsOfMeal(pId) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pId}`
  );
  let myData = await res.json();
  let meal = myData.meals[0];
  // change boxes
  $("#prodImg").attr("src", `${meal.strMealThumb}`);
  $("#strMeal").html(meal.strMeal);
  $("#strInstructions").html(meal.strInstructions);
  $("#strArea").html(meal.strArea);
  $("#strCategory").html(meal.strCategory);

  // all ripes
  addRipes(meal);

  // add all tags
  if (meal.strTags)
    meal.strTags.split(",").forEach((m) => {
      $("#allTags").append(
        `<span class="alert alert-danger p-1 mx-2">${m}</span>`
      );
    });

  // add source
  $("#src").attr("href", `${meal.strSource}`);
  $("#ylink").attr("href", `${meal.strYoutube}`);

  console.log(meal.strSource);
  console.log(meal.strYoutube);
}

function addRipes(m) {
  if (m.strIngredient1)
    $(".ripes").append(`<span>${m.strMeasure1} ${m.strIngredient1}</span>`);
  if (m.strIngredient2)
    $(".ripes").append(`<span>${m.strMeasure2} ${m.strIngredient2}</span>`);
  if (m.strIngredient3)
    $(".ripes").append(`<span>${m.strMeasure3} ${m.strIngredient3}</span>`);
  if (m.strIngredient4)
    $(".ripes").append(`<span>${m.strMeasure4} ${m.strIngredient4}</span>`);
  if (m.strIngredient5)
    $(".ripes").append(`<span>${m.strMeasure5} ${m.strIngredient5}</span>`);
  if (m.strIngredient6)
    $(".ripes").append(`<span>${m.strMeasure6} ${m.strIngredient6}</span>`);
  if (m.strIngredient7)
    $(".ripes").append(`<span>${m.strMeasure7} ${m.strIngredient7}</span>`);
  if (m.strIngredient8)
    $(".ripes").append(`<span>${m.strMeasure8} ${m.strIngredient8}</span>`);
  if (m.strIngredient9)
    $(".ripes").append(`<span>${m.strMeasure9} ${m.strIngredient9}</span>`);
  if (m.strIngredient10)
    $(".ripes").append(`<span>${m.strMeasure10} ${m.strIngredient10}</span>`);

  if (m.strIngredient11)
    $(".ripes").append(`<span>${m.strMeasure11} ${m.strIngredient1}</span>`);
  if (m.strIngredient12)
    $(".ripes").append(`<span>${m.strMeasure12} ${m.strIngredient12}</span>`);
  if (m.strIngredient13)
    $(".ripes").append(`<span>${m.strMeasure13} ${m.strIngredient13}</span>`);
  if (m.strIngredient14)
    $(".ripes").append(`<span>${m.strMeasure14} ${m.strIngredient14}</span>`);
  if (m.strIngredient15)
    $(".ripes").append(`<span>${m.strMeasure15} ${m.strIngredient15}</span>`);
  if (m.strIngredient16)
    $(".ripes").append(`<span>${m.strMeasure16} ${m.strIngredient16}</span>`);
  if (m.strIngredient17)
    $(".ripes").append(`<span>${m.strMeasure17} ${m.strIngredient17}</span>`);
  if (m.strIngredient18)
    $(".ripes").append(`<span>${m.strMeasure18} ${m.strIngredient18}</span>`);
  if (m.strIngredient19)
    $(".ripes").append(`<span>${m.strMeasure19} ${m.strIngredient19}</span>`);
  if (m.strIngredient20)
    $(".ripes").append(`<span>${m.strMeasure20} ${m.strIngredient20}</span>`);
}

$("#nameMeal").on("input", () => {
  let inVal = $("#nameMeal").val();
  searchByName(inVal);
});

// search by first char
async function searchByChar(s = "") {
  $(".meals").html(null);
  if (s.length <= 1) {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${s}`
    );
    let allMeals = await res.json();
    let meals = allMeals.meals;
    meals.forEach((meal) => {
      $(".meals").append(`
       <div class="meal col-3" data-id=${meal.idMeal}>
            <img src="${meal.strMealThumb}" alt="meal-${meal.strMeal}">
            <p>${meal.strMeal}</p>
          </div>
    `);
    });
    $(".meal").click(function () {
      resetAll();
      $(".meal-details").removeClass("d-none");
      showDetailsOfMeal(this.dataset.id);
    });
    console.log(meals);
  }
}
$("#charMeal").on("input", () => {
  let inVal = $("#charMeal").val();
  searchByChar(inVal);
});

// validate Inputs
// user name
let userValid = 0,
  emailValid = 0,
  phoneValid = 0,
  ageValid = 0,
  passValid = 0,
  rePassValid = 0;

$("#userName").on("input", () => {
  let myVal = $("#userName").val();
  if (/^[a-zA-Z0-9]+$/.test(myVal)) {
    console.log("right");
    $("#errName").addClass("d-none");
    userValid = 1;
  } else {
    console.log("false");
    $("#errName").removeClass("d-none");
    userValid = 0;
  }
  checkOnAll();
});

// email
$("#email").on("input", () => {
  let myVal = $("#email").val();
  if (/^[a-z0-9]+@[a-z]{2,}\.[a-z]{2,3}$/.test(myVal)) {
    console.log("right");
    $("#errEmail").addClass("d-none");
    emailValid = 1;
  } else {
    console.log("false");
    $("#errEmail").removeClass("d-none");
    emailValid = 0;
  }
  checkOnAll();
});

// phone
$("#phone").on("input", () => {
  let myVal = $("#phone").val();
  if (/^[0-9]{8,}$/.test(myVal)) {
    console.log("right");
    $("#errPhone").addClass("d-none");
    phoneValid = 1;
  } else {
    console.log("false");
    $("#errPhone").removeClass("d-none");
    phoneValid = 0;
  }
  checkOnAll();
});

// age
$("#age").on("input", () => {
  let myVal = $("#age").val();
  if (/^[1-9][0-9]{1,}$/.test(myVal)) {
    console.log("right");
    $("#errAge").addClass("d-none");
    ageValid = 1;
  } else {
    console.log("false");
    $("#errAge").removeClass("d-none");
    ageValid = 0;
  }
  checkOnAll();
});

// passwords
let myPass = null;
$("#password").on("input", () => {
  let myVal = $("#password").val();
  if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(myVal)) {
    console.log("right");
    myPass = myVal;
    $("#errPass").addClass("d-none");
    passValid = 1;
  } else {
    console.log("false");
    $("#errPass").removeClass("d-none");
    passValid = 0;
  }
  checkOnAll();
});

// passwords
$("#repassword").on("input", () => {
  let myVal = $("#repassword").val();
  if (myPass == myVal) {
    console.log("right");
    $("#errRePass").addClass("d-none");
    rePassValid = 1;
  } else {
    console.log("false");
    $("#errRePass").removeClass("d-none");
    rePassValid = 0;
  }
  checkOnAll();
});

function checkOnAll() {
  if (
    userValid &&
    emailValid &&
    phoneValid &&
    ageValid &&
    passValid &&
    rePassValid
  ) {
    $("#submit").removeAttr("disabled");
  } else {
    $("#submit").attr("disabled", "disabled");
  }
}
