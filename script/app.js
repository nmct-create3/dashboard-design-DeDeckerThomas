let daySelect, graph;

const drawChart = (values) => {
  let ctx = graph.getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(167, 167, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
      ],
      datasets: [
        {
          label: "Aantal bezoekers",

          data: values,
          lineTension: 0.3,
          borderColor: "#A3A0FB",
          borderWidth: "2",
          backgroundColor: gradient,
          pointBackgroundColor: "#fff",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 50,
            },
          },
        ],
      },
      legend: {
        position: "bottom",
      },
    },
  });
};

const getData = (data) => {
  let values = new Array();
  for (const element of data) {
    values.push(element.aantalBezoekers);
  }
  drawChart(values);
};

const getVisitorsByDay = async (day) => {
  const endpoint = `https://thomasdedeckerbezoekersservice.azurewebsites.net/api/visitors/${day}`;
  const data = await fetch(endpoint)
    .then((response) => response.json())
    .catch((error) => console.log("An error occured:", error));
  getData(data);
};

const init = () => {
  daySelect = document.querySelector(".js-select");
  graph = document.querySelector(".js-graph");
  daySelect.addEventListener("change", () => {
    getVisitorsByDay(daySelect.value);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded! 🥳");
  init();
});
