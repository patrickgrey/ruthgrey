var lastID = "Unicorn sightings";

function updateChart() {
  var input = document.getElementById("data");
  var newArray = JSON.parse("[" + input.value + "]")[0];
  console.log(newArray[0]);
  
  if (lastID != newArray[0]) chart.unload({ ids: [lastID] });
  lastID = newArray[0];
  chart.load({ columns: [newArray] });
}


var chart = c3.generate({
  data: {
    columns: [
      ["Unicorn sightings", 30, 200, 100, 400, 150, 250, 100]
    ],
    type: "bar"
  },
  axis: {
      x: {
          type: 'category',
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
  },
  bar: {
    width: {
      ratio: 0.5 // this makes bar width 50% of length between ticks
    }
    // or
    //width: 100 // this makes bar width 100px
  }
});
