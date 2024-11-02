window.addEventListener('offline', () => {
    //Disconnedcted from the internet
    statusField.innerText =
    'You are currently offline (connect internet)';
});


const reviewForm = document.getElementById('review-form');
    const reviewContainer = document.getElementById('review-container');
    const avatarInput = document.getElementById('avatar');

    // Simulated user identifier (in a real app, this would be based on authentication)
    const currentUserId = 'user-' + Math.random().toString(36).substr(2, 9);

    // Dummy reviews for initial display
    const dummyReviews = [
      {
        name: 'John Doe',
        avatar: 'images/client-1.jpg',
        rating: 4,
        services: 'Custom Itinerary Planning',
        comment: 'Excellent service and attention to detail. Highly recommended!',
        timestamp: '2023-05-15 12:34:56',
        userId: 'user-123456789'
      },
      {
        name: 'Jane Smith',
        avatar: 'images/client-2.jpg',
        rating: 5,
        services: 'Group Travel Arrangements',
        comment: 'Renpha Consulting made our team trip a huge success. Will definitely use them again.',
        timestamp: '2023-05-10 09:12:34',
        userId: 'user-987654321'
      }
    ];

    // Function to display reviews
    function displayReviews(reviews) {
      reviewContainer.innerHTML = '';
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        reviewElement.innerHTML = `
          <img src="${review.avatar}" alt="${review.name}'s Avatar" class="review-avatar">
          <div class="review-content">
            <div class="review-header">
              <h3>${review.name}</h3>
              <div class="review-rating">
                ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
              </div>
            </div>
            <p class="review-text">${review.comment}</p>
            <div class="review-footer">
              <div>Services: ${review.services}</div>
              <div>
                <span>${review.timestamp}</span>
                ${review.userId === currentUserId ? `<button class="delete-comment" data-user-id="${review.userId}">Delete</button>` : ''}
              </div>
            </div>
          </div>
        `;

        reviewContainer.appendChild(reviewElement);
      });

      // Add event listeners for delete buttons
      const deleteButtons = document.querySelectorAll('.delete-comment');
      deleteButtons.forEach(button => {
        button.addEventListener('click', deleteComment);
      });
    }

    // Function to delete a comment
    function deleteComment(event) {
      const userId = event.target.dataset.userId;
      if (userId === currentUserId) {
        event.target.closest('.review').remove();
      }
    }

    // Initial display of dummy reviews
    displayReviews(dummyReviews);

    // Handle form submission
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const avatarFile = avatarInput.files[0];
      
      if (avatarFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const review = {
            name: formData.get('name'),
            avatar: e.target.result,
            rating: parseInt(formData.get('rating')),
            services: formData.get('services'),
            comment: formData.get('comment'),
            timestamp: new Date().toLocaleString(),
            userId: currentUserId
          };

          // Add the new review to the list
          displayReviews([review, ...dummyReviews]);

          // Reset the form
          event.target.reset();
        }
        reader.readAsDataURL(avatarFile);
      }
    });