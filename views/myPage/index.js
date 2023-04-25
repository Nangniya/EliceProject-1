const render = async () => {
  let id = '';
  await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      id = data.data._id;
    })
    .catch((error) => {
      console.error(error);
    });

  await fetch(`http://localhost:8000/api/orders/getByuserId/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

render();
