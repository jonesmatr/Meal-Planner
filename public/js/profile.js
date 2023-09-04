    // New Meal Plan Form Handler
    const newMealFormHandler = async (event) => {
    event.preventDefault();

     // New fields
  const mealName = document.querySelector('#meal-name').value.trim();
  const dayOfWeek = document.querySelector('#day-of-week').value.trim();
  const recipe = document.querySelector('#meal-desc').value.trim();

  if (mealName && dayOfWeek && recipe) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ 
        meal_name: document.querySelector('#meal-name').value.trim(), 
        day_of_week: document.querySelector('#day-of-week').value.trim(), 
        recipe: document.querySelector('#meal-desc').value.trim() 
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create meal plan');
    }
  }
};
 
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  // const mealLinks = document.querySelectorAll('.meal-link');

// mealLinks.forEach((link) => {
//   link.addEventListener('click', async (event) => {
//     event.preventDefault();
//     const recipe = link.getAttribute('data-meal');

//     // Replace these placeholders with your actual API keys
//     const app_id = 'YOUR_APP_ID';
//     const app_key = 'YOUR_APP_KEY';

//     // Fetch nutrient data from the API using recipe
//     try {
//       const response = await axios(`/proxy`, {
//         params: {
//           mealDesc: encodeURIComponent(recipe),
//           app_id,
//           app_key,
//         },
//       });
//       // Redirect to project page with captured data as URL parameter
//       window.location.href = `/project/{{project.id}}?mealDesc=${encodeURIComponent(recipe)}`;
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error or show a message to the user
//     }
//   });
// });


// Attach the delete button click event to the delButtonHandler function
if (document.querySelector('.project-list')) {
  document.querySelector('.project-list').addEventListener('click', delButtonHandler);
}

// Attach the form submit event to the newMealFormHandler function
if (document.querySelector('.new-meal-form')) {
  document.querySelector('.new-meal-form').addEventListener('submit', newMealFormHandler);
}