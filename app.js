var apiUrl =
  "https://crudcrud.com/api/83166bfd3f7a4145833199764bcf5460/Appointments";

function postUserData(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  var userData = {
    name: name,
    email: email,
    phone: phone,
  };

  axios
    .post(apiUrl, userData)
    .then(function (response) {
      alert("User data saved successfully!");
      renderAppointments();
    })
    .catch(function (error) {
      console.error("Error saving user data:", error);
    });
}
