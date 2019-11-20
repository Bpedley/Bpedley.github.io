ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.79588639, 37.69620684],
    zoom: 13
  });

  ymaps
    .route(
      [
        "Москва, метро Преображенская площадь",
        "Москва, Колодезный переулок д. 2а "
      ],
      {
        routingMode: "pedestrian",
        multiRoute: true
      }
    )
    .then(
      function(route) {
        myMap.geoObjects.add(route);
      },
      function(error) {
        alert("Возникла ошибка: " + error.message);
      }
    );

  ymaps
    .route(["Москва, метро Сокольники", "Москва, Колодезный переулок д. 2а"], {
      routingMode: "pedestrian",
      multiRoute: true
    })
    .then(
      function(route) {
        myMap.geoObjects.add(route);
      },
      function(error) {
        alert("Возникла ошибка: " + error.message);
      }
    );
}
