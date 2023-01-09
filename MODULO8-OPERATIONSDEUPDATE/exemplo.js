db.users.updateMany(
  {
    hobbies: {
      $elemMatch: {
        title: 'Sports',
        frequency: { $gte: 3 },
      },
    },
  },
  {
    $set: {
      'hobbies.$.highFrequency': true,
    },
  }
);

db.users.updateMany(
  {
    age: { $gt: 30 },
  },
  {
    $inc: {
      'hobbies.$[].frequency': -1,
    },
  }
)




db.users.updateOne({name: 'Chris'} , {$pop: {hobbies: 1} })