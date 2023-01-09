db.places.insertOne({
  name: 'California Academy of Sciences',
  location: {
    type: 'Point',
    coordinates: [-122.4757474, 37.7689999],
  },
});

db.places.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [-52.5466813, -27.724483256429384],
      },
      $maxDistance: 500000000,
      //$minDistance: xxxxx
    },
  },
});

db.places.insertMany([
  {
    name: 'Flowers',
    location: {
      type: 'Point',
      coordinates: [-122.49182600352387, 37.770412230737094],
    },
  },
  {
    name: 'Stones',
    location: {
      type: 'Point',
      coordinates: [-122.48956963050625, 37.76978923166615],
    },
  },
]);

db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: {
        type: 'Point',
        coordinates: [-122.49182600352387,
          37.770412230737094],
      },
    },
  },
});













                        db.areas.find({
                          area: {
                            $geoIntersects: {
                              $geometry: {
                                type: 'Point',
                                coordinates: [-2.6016748434018884,
                                  54.990021587207075],
                              },
                            },
                          },
                        });











                        db.places.find(
                          {
                              location: {
                                  $geoWithin: {
                                      $centerSphere: [
                                          [-122.48728131096236, 37.77002825057193], 1 / 6378.1  ////raio de 1km...
                                      ]
                                  }
                              }
                          }
                      )




                      db.places.find(
                        {
                            location: {
                                $geoWithin: {
                                    $centerSphere: [
                                        [-122.48728131096236, 37.77002825057193], 100 / 6378.1 //raio de 100km
                                    ]
                                }
                            }
                        }
                    )




                    db.places.find(
                      {
                          location: {
                              $geoWithin: {
                                  $centerSphere: [
                                      [-122.48728131096236, 37.77002825057193], 1000 / 6378.1  
                                  ]
                              }
                          }
                      }
                  )