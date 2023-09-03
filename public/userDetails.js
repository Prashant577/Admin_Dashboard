document.addEventListener("DOMContentLoaded", function () {
    const fetchDataButton = document.getElementById("fetchDataButton");
    fetchDataButton.addEventListener("click", fetchUserData);
  
    async function fetchUserData() {
        console.log("user details fetching");
      await fetch("http://localhost:3000/user/getusers")
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data);
          populateTable(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  
    function populateTable(data) {
      const table = document.getElementById("userTable");
      const tbody = table.getElementsByTagName("tbody")[0];
  
      tbody.innerHTML = ""; // Clear existing rows
  
      data.forEach((user) => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const cityCell = row.insertCell(2);
  
        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        cityCell.textContent = user.city;
      });
    }
  });
  