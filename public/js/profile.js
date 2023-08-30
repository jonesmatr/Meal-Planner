// const newFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#project-name').value.trim();
//     const needed_funding = document.querySelector('#project-funding').value.trim();
//     const description = document.querySelector('#project-desc').value.trim();

//     if (name && needed_funding && description) {
//         const response = await fetch(`/api/projects`, {
//           method: 'POST',
//           body: JSON.stringify({ name, needed_funding, description }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
    
//         if (response.ok) {
//           document.location.replace('/profile');
//         } else {
//           alert('Failed to create project');
//         }
//       }
//     };

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
      body: JSON.stringify({ meal_name: mealName, day_of_week: dayOfWeek, recipe }),
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

// Attach the form submit event to the newProjectFormHandler function
// if (document.querySelector('.new-project-form')) {
//     document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
//   }
  
  // Attach the delete button click event to the delButtonHandler function
  if (document.querySelector('.project-list')) {
    document.querySelector('.project-list').addEventListener('click', delButtonHandler);
  }
  
  // Attach the form submit event to the newMealFormHandler function
  if (document.querySelector('.new-meal-form')) {
    document.querySelector('.new-meal-form').addEventListener('submit', newMealFormHandler);
  }