var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}
var barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 4, 2],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Laptop", "Phone", "Monitor", "Headphones", "Camera"],
  },
  yaxis: {
    title: {
      text: "Count",
    },
  },
};

var barChart = new ApexCharts(
  document.querySelector("#bar-chart"),
  barChartOptions
);
barChart.render();

// AREA CHART
var areaChartOptions = {
  series: [
    {
      name: "Product Statistics",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Product Graphs",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Product Statistics",
      },
    },
    {
      opposite: true,
      title: {
        text: "Product Graphs",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

var areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();

/** For Registration */

var registrationPopup = document.getElementById("registration-popup");

/** For Login */

function openPopup() {
  var popup = document.getElementById("login-popup");
  popup.style.display = "block";
}

function closePopup() {
  var popup = document.getElementById("login-popup");
  popup.style.display = "none";
}

var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var loginEmail = document.getElementById("login-email").value;
  var loginPassword = document.getElementById("login-password").value;
  console.log(loginEmail, loginPassword);
  // console.log(loginForm.value);

  const response = fetch("http://localhost:3000/admin/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  });
  response
    .then( (res) => {
      if (res) {
        // console.log(res.json());
        return  res.json();
      }
    })
    .then((data) => {
      console.log(data);
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          name: data.name,
          token: data.token,
          priveledge: data.priveledge,
        })
      );
    });

  loginForm.reset();
  closePopup();
  setTimeout(function(){
    window.location.reload();
  }, 2000)
});

/** Chat Function */

function handleChat() {
  console.log("working");
  let data = sessionStorage.getItem("data");

  // localStorage.setItem("data",data);

  //  let wind=window.open("http://localhost:3000/chat");

  // location.assign("http://localhost:3000/chat");
  location.href = "http://localhost:3000/chat?data=" + data;
}

/** Handle Chat Button Visibility */
const handleChatBtn = sessionStorage.getItem("data");
const result = JSON.parse(handleChatBtn);
console.log('result',result);
const chatBtn = document.getElementById('chatbot');
if(result == null){ 
  chatBtn.style.display = 'none'
}else{
  chatBtn.style.display = 'block'
}
