db.products
  .find(
    { $text: { $search: 'awesome t-shirt' } },
    { score: { $meta: 'textScore' } }
  )
  .pretty();



db.products.find(
    {$text: {$search: 'red'},
    },
    {score: {$meta: "textScore",
     } }
  ).sort({
    score: {
      $meta: 'textScore',
    },
  }).pretty()
