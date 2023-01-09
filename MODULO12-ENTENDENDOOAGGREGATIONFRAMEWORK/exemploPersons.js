db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: {
        _id: {
          chosenState: '$location.state',
        },
        totalPersons: {
          $sum: 1,
        },
      },
    },
  ])
  .pretty();

// db.persons.aggregate([
//   {
//     $project: {
//       _id: 0,
//       gender: 1,
//       fullName: {
//         $concat: [
//           {
//             $concat: [ ////concatenação de múltiplos '$concat' não funciona.... (não funciona em cascata)..
//               { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
//               { $substrCP: ['$name.first', 1] },
//             ],
//           },
//           ' ',
//           {
//             $concat: [
//               { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
//               { $substrCP: ['$name.last', 1] },
//             ],
//           },
//         ],
//       },
//     },
//   },
// ]).pretty();

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] },
            ],
          },
        ],
      },
    },
  },
]);

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
  ])
  .pretty();

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        personAge: '$dob.age',
        'date of birth': { $convert: { input: '$dob.date', to: 'date' } },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
  ])
  .pretty();

//com o shortcut de '$toDate' substituindo o longhand de '$convert'..

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        personAge: '$dob.age',
        'date of birth': { $toDate: '$dob.date' },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
  ])
  .pretty();

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        personAge: '$dob.age',
        'date of birth': { $toDate: '$dob.date' },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          birthYear: { $isoWeekYear: '$date of birth' },
        },
      },
    },
  ])
  .pretty();

db.arrayCollection
  .aggregate([
    {
      $group: {
        _id: {
          personAge: '$age',
        },
        allHobbies: { $push: '$hobbies' },
      },
    },
  ])
  .pretty();

db.arrayCollection.aggregate([{ $unwind: '$hobbies' }]).pretty();

db.arrayCollection
  .aggregate([
    { $unwind: '$hobbies' },
    {
      $group: {
        _id: {
          personAge: '$age',
        },
        allHobbies: { $push: '$hobbies' },
      },
    },
  ])
  .pretty();

////sem duplicate values (uso de '$addToSet'):

db.arrayCollection
  .aggregate([
    { $unwind: '$hobbies' },
    {
      $group: {
        _id: {
          personAge: '$age',
        },
        allHobbies: { $addToSet: '$hobbies' },
      },
    },
  ])
  .pretty();

db.arrayCollection.aggregate([
  {
    $project: {
      _id: 0,

      examScore: {
        $slice: ['$examScores', 1],
      },
    },
  },
]);

db.arrayCollection.aggregate([
  {
    $project: {
      _id: 0,

      examScore: {
        $slice: ['$examScores', -2],
      },
    },
  },
]);

///sintaxe completa (sem a abreviação no '$slice')

//vai começar no indexador '2', e aí vai selecionar/slicar/retrievar apenas 1 element do array...

db.arrayCollection.aggregate([
  {
    $project: {
      _id: 0,

      examScore: {
        $slice: ['$examScores', 2, 1],
      },
    },
  },
]);

db.arrayCollection.aggregate([
  {
    $project: {
      _id: 0,

      newExamScores: {
        $filter: {
          input: '$examScores',
          as: 'sc',
        },
      },
    },
  },
]);

db.arrayCollection.aggregate([
  {
    $project: {
      _id: 0,

      newExamScores: {
        $filter: {
          input: '$examScores',

          as: 'sc',
          cond: {
            $gt: ['$$sc.score', 60],
          },
        },
      },
    },
  },
]);

db.arrayCollection.aggregate([
  {
    $unwind: '$examScores.scores',
  },
  {
    $group: { _id: '$name', highestScore: { $push: '$examScores' } },
  },
]);

// db.arrayCollection.aggregate([
//   { $unwind: '$examScores' },

//   {
//     $group: {
//       _id: '$name',
//       name: { $first: '$name' },
//       age: { $first: '$age' },
//       hobbies: { $first: '$hobbies' },
//       examScores: { $push: '$examScores.score' },
//     },
//   },

//     {
//       $project: {
//         examScores: {
//           $sortArray: { //não funciona na nossa versão atual....
//             input: "$examScores",
//             sortBy: {score: -1}
//           }
//         }
//       }
//     }
// ]);

db.arrayCollection.aggregate([
  { $unwind: '$examScores' },
  {
    $sort: {
      examScores: 1,
    },
  },
  {
    $group: {
      _id: '$name',
      name: { $first: '$name' },
      age: { $first: '$age' },
      hobbies: { $first: '$hobbies' },
      examScores: { $push: '$examScores.score' },
    },
  },
  {
    $project: {
      _id: new ObjectId(),
      name: 1,
      age: 1,
      hobbies: 1,
      examScore: {
        $first: { $slice: ['$examScores', 1] },
      },
    },
  },
]);

////VERSÃO DO PROFESSOR

// db.friends.aggregate(
//   [
//     {
//       $unwind: "$examScores"
//     },
//    {
//      $project: {
//        _id: 1, name: 1,
//        age: 1,
//        score: "$examScores.score"
//      }
//    },

//    {
//      $sort: {score: -1}
//    },

//    {
//      $group: {_id: "$_id", name: {$first: "$name" }, maxScore: {$max: "$score"}}
//    },

//    {
//      $sort: { maxScore: -1}
//    }

//   ]
// )

db.arrayCollection.aggregate([
  {
    $unwind: '$examScores',
  },
  {
    $project: {
      _id: 1,
      name: 1,
      age: 1,
      score: '$examScores.score',
    },
  },
  {
    $sort: { score: -1 },
  },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      maxScore: { $max: '$score' },
    },
  },
  {
    $sort: { maxScore: -1 },
  },
]);

//uso de 'bucket'

db.persons.aggregate([
  {
    $bucket: {
      groupBy: '$dob.age',

      boundaries: [0, 18, 30, 50, 80, 120],
      output: {
        names: {
          $push: '$name.first',
        },
      },
    },
  },
]);

////

db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',

        boundaries: [0, 18, 30, 50, 80, 120],
        output: {
          names: {
            $push: '$name.first',
          },
          averageAge: {
            $avg: '$dob.age',
          },
          numPersons: { $sum: 1 },
        },
      },
    },
  ])
  .pretty();

//////

db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',

        boundaries: [0, 18, 30, 50, 80, 120],
        output: {
          averageAge: {
            $avg: '$dob.age',
          },
          numPersons: { $sum: 1 },
        },
      },
    },
  ])
  .pretty();

////VERSÃO DA PHASE DE 'bucket' QUE DEFINE AS BOUNDARIES AUTOMATICAMENTE PARA VOCÊ, a depender da distribuição dos documetns na sua collection....

db.persons.aggregate([
  {
    $bucketAuto: {
      groupBy: '$dob.age',
      buckets: 5,
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' },
      },
    },
  },
]);

///página 1

db.persons.aggregate([
  {
    $project: {
      birthDate: { $toDate: '$dob.date' },
    },
  },
  {
    $sort: {
      birthDate: 1,
    },
  },
  {
    $limit: 10,
  },
]);

///''página 2'' (pagination)...

db.persons.aggregate([
  {
    $project: {
      birthDate: { $toDate: '$dob.date' },
    },
  },
  {
    $sort: {
      birthDate: 1,
    },
  },
  {
    $skip: 10,
  },
  {
    $limit: 10,
  },
]);

//página 3:

db.persons.aggregate([
  {
    $project: {
      birthDate: { $toDate: '$dob.date' },
    },
  },
  {
    $sort: {
      birthDate: 1,
    },
  },
  {
    $skip: 20,
  },
  {
    $limit: 10,
  },
]);

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: {
        $concat: ['$name.first', ' ', '$name.last'],
      },
      birthDate: {
        $toDate: '$dob.date',
      },
    },
  },
  {
    $sort: {
      birthDate: 1,
    },
  },

  {
    $limit: 10,
  },
]);

///uso de '$out' para ESCREVER O RESULT  DE NOSSA PIPELINE (data transformada) EM UMA OUTRA COLLECTION....

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        personAge: '$dob.age',
        'date of birth': { $toDate: '$dob.date' },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          birthYear: { $isoWeekYear: '$date of birth' },
        },
      },
    },
    {
      $out: 'transformedData',
    },
  ])
  .pretty();

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        personAge: '$dob.age',
        'date of birth': { $toDate: '$dob.date' },
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
          ],
        },

        location: {
          type: 'Point',
          coordinates: [
            { $toDouble: '$location.coordinates.longitude' },
            { $toDouble: '$location.coordinates.latitude' },
          ],
        },
      },
    },
    {
      $out: 'geoTransformedData',
    },
  ])
  .pretty();

///uso do operator de '$geoNear'...

// db.geoTransformedData.aggregate([
//   {
//     $geoNear: {
//       near: {
//         type: 'Point',
//         coordinates: [14.0142, 18.2567],
//       },
//       maxDistance: 1000,
//       num: 10, /// NUM FOI DEPRECADO.
//       query: {
//         gender: 'female',
//       },
//       distanceField: 'distance',
//     },
//   }
// ]);












db.geoTransformedData.aggregate([
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [14.0142, 18.2567],
      },
      maxDistance: 1000000,

      query: {
        gender: 'female',
      },
      distanceField: 'distance',
    },
  },
  {
    $limit: 10
  }
])
