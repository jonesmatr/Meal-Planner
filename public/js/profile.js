const newMealPlanFormHandler = async (event) => {
  event.preventDefault();

  const mealName = document.querySelector('#meal-name').value.trim();
  const dayOfWeek = document.querySelector('#day-of-week').value.trim();
  const recipe = document.querySelector('#meal-desc').value.trim();

  if (mealName && dayOfWeek && recipe) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ meal_name: mealName, day_of_week: dayOfWeek, recipe }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create meal plan');
    }
  }
};

const delMealPlanHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete meal plan');
    }
  }
};

document
  .querySelector('.new-meal-form')
  .addEventListener('submit', newMealPlanFormHandler);

document
  .querySelector('.project-list')  // Make sure this class exists in your HTML
  .addEventListener('click', delMealPlanHandler);
