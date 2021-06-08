// add some locations
db.places.insertOne({
  name: 'home',
  location: { type: 'Point', coordinates: [74.3704765, 31.5997399] },
});
db.places.insertOne({
  name: 'Paradise Model High School',
  location: { type: 'Point', coordinates: [74.4049749, 31.5912321] },
});
db.places.insertOne({
  name: 'Landon',
  location: { type: 'Point', coordinates: [-89.111593, 30.4379734] },
});
db.places.insertOne({
  name: 'Dubai',
  location: { type: 'Point', coordinates: [54.9468595, 25.0757581] },
});
db.places.insertOne({
  name: 'Mecca',
  location: { type: 'Point', coordinates: [39.706115, 21.4359569] },
});
db.places.insertOne({
  name: 'Kasur',
  location: { type: 'Point', coordinates: [74.44013, 31.11679] },
});
db.places.insertOne({
  name: 'Lahore',
  location: { type: 'Point', coordinates: [74.3469, 31.50866] },
});
db.places.insertOne({
  name: 'Raiwind',
  location: { type: 'Point', coordinates: [74.21232, 31.23898] },
});
db.places.insertOne({
  name: 'Bhera',
  location: { type: 'Point', coordinates: [75.89048, 31.93386] },
});
const p1 = [74.7067, 31.67243];
const p2 = [74.94721, 30.8955];
const p3 = [74.01485, 30.58299];
const p4 = [73.92465, 31.59176];

// **********************************************************************
//                        $near, $geometry (get near locations)
// **********************************************************************
// $near is used to search for near locations
db.places
  .find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [39.706115, 21.4359569] },
        $maxDistance: 500,
        $minDistance: 100,
      },
    },
  })
  .pretty(); // this query will fail if you dont have a geospatial index

// **********************************************************************
//                        geospatial index ('2dsphere')
// **********************************************************************
db.places.createIndex({ location: '2dsphere' });

// **********************************************************************
//                        $geoWithin, $geometry (get locations in specific area)
// **********************************************************************
// $near is used to search for near locations
db.places
  .find({
    location: {
      $geoWithin: {
        $geometry: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
      },
    },
  })
  .pretty(); // this query will fail if you dont have a geospatial index

// **********************************************************************
//                        $geoIntersects, $geometry (get if two locations intersect each other (if yes mean the location is in that location otherwise outside of that location))
// **********************************************************************
// first add some areas
db.places.insertOne({
  name: 'area around lahore including kasur, raiwind and etc exculding bhera',
  location: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
});
// $geoIntersects is used to search for intersects locations
db.places
  .find({
    location: {
      $geoIntersects: {
        $geometry: { type: 'Point', coordinates: [73.85736, 31.44777] }, // will return no(no data), as outside point
      },
    },
  })
  .pretty();
db.places
  .find({
    location: {
      $geoIntersects: {
        $geometry: { type: 'Point', coordinates: [74.39706, 31.44074] }, // will return yes (the above added polygon), as outside point
      },
    },
  })
  .pretty();

// **********************************************************************
//                        $geoWithin, $centerSphere (get places with in a circle, radius from given point)
// **********************************************************************
// $geoIntersects is used to search for intersects locations
db.places.find({
    location: {
      $geoWithin: {
        $centerSphere: [[74.3704765, 31.5997399], 10 / 6378.1], // 1/6378.1 equals to 1KM
      },
    },
  }).pretty();
