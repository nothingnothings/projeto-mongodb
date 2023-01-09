db.movies.find({
  $or: [{ 'rating.average': { $gt: 9.0 } }, { 'rating.average': { $lt: 5.0 } }],
});

db.movies.find({ genres: 'Drama', genres: 'Horror' }).count();

db.users.insertOne({
  name: 'Anna',
  hobbies: [
    { title: 'Sports', frequency: 2 },
    { title: 'yoga', frequency: 3 },
  ],

  phone: '800808080',
  age: null,
});

db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ['$volume', 190] },
          then: { $subtract: ['$volume', 10] },
          else: '$volume',
        },
      },
      '$target',
    ],
  },
});

db.users.insertMany([
  {
    name: 'Anna',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Yoga', frequency: 3 },
    ],

    phone: '800808080',
    age: 24,
  },

  {
    name: 'CJ',
    hobbies: [
      { title: 'Gym', frequency: 2 },
      { title: 'Swimming', frequency: 3 },
    ],

    phone: '800808080',
    age: 35,
  },
  {
    name: 'Yan',
    hobbies: [
      { title: 'Sports', frequency: 2 },
      { title: 'Cleaning', frequency: 3 },
    ],

    phone: '800808080',
    age: null,
  },
]);










db.users.insertOne(
    {
        "name" : "TK",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 2
                },
                {
                        "title" : "Cleaning",
                        "frequency" : 3
                },
                          {
                        "title" : "Souji",
                        "frequency" : 3
                }
        ],
        "phone" : "800808080",
        "age" : null
}
)














db.users.insertOne(
    {
        "name" : "TKO",
        "hobbies" : [
"1", "2", "3"
        ],
        "phone" : "800808080",
        "age" : null
}
)




db.movieStarts.find({genre: { $all: ["drama", "action"] }})























db.movieStarts.insertMany(
    [
        {
            "title": "The Last Student Returns",
            "meta": {
                "rating": 9.5,
                "aired": 2018,
                "runtime": 100
            },
        
            "visitors": 1300000,
            "expectedVisitors": 15500000,
            "genre": [

             
                "action",
                "drama"
            ]
        },
        {
            "title": "DEEP",
            "meta": {
                "rating": 8.0,
                "aired": 2019,
                "runtime": 140
            },
            "visitors": 1100000,
            "expectedVisitors": 13000000,
            "genre": [
               ,
                "drama",
                "action"
            ]
        }
    ])