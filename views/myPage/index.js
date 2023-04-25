fetch('http://localhost:8000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },

  method: 'GET',
})
  .then((response) => {
    // Handle the response

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
