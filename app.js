var apiUrl = 'https://crudcrud.com/api/8278302ba78743219d464cf16deabdbe/Appointments';

function postUserData(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var userData = {
        name: name,
        email: email,
        phone: phone,
    };

    axios.post(apiUrl, userData)
        .then(function(response) {
            alert('User data saved successfully!');
            getUserData();
        })
        .catch(function(error) {
            console.error('Error saving user data:', error);
        });
}

function editAppointment(id, index) {
    axios.get(`${apiUrl}/${id}`)
        .then(function(response) {
            var user = response.data;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;

            var userForm = document.getElementById('userForm');
            userForm.onsubmit = function(event) {
                event.preventDefault();
                updateUserData(id);
            };
        })
        .catch(function(error) {
            console.error('Error fetching user details for editing:', error);
        });
}

function updateUserData(id) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var userData = {
        name: name,
        email: email,
        phone: phone,
    };

    axios.put(`${apiUrl}/${id}`, userData)
        .then(function(response) {
            alert('User data updated successfully!');
            getUserData();
        })
        .catch(function(error) {
            console.error('Error updating user data:', error);
        });
}

function deleteAppointment(id, index) {
    axios.delete(`${apiUrl}/${id}`)
        .then(function(response) {
            alert('User data deleted successfully!');
            var appointmentsDiv = document.getElementById('appointments');
            var appointmentToRemove = appointmentsDiv.getElementsByClassName('appointment')[index];
            appointmentToRemove.parentNode.removeChild(appointmentToRemove);
        })
        .catch(function(error) {
            console.error('Error deleting appointment:', error);
        });
}


function getUserData() {
    var appointmentsDiv = document.getElementById('appointments');
    appointmentsDiv.innerHTML = '';

    axios.get(apiUrl)
        .then(function(response) {
            var data = response.data;

            if (Array.isArray(data)) {
                data.forEach(function(appointment, index) {
                    var appointmentDiv = document.createElement('div');
                    appointmentDiv.className = 'appointment';
                    appointmentDiv.innerHTML = `
                        <p>Name: ${appointment.name}</p>
                        <p>Email: ${appointment.email}</p>
                        <p>Phone: ${appointment.phone}</p>
                        <button onclick="editAppointment('${appointment._id}', ${index})">Edit</button>
                        <button onclick="deleteAppointment('${appointment._id}', ${index})">Delete</button>
                    `;

                    appointmentsDiv.appendChild(appointmentDiv);
                });
            }
        })
        .catch(function(error) {
            console.error('Error fetching appointments:', error);
        });
}
