// asasasasasas


db.products.find(
    { $text: { $search: 'awesome t-shirt' } },
    { score: { $meta: 'textScore' } }).sort({
      score: {
          $meta: "textScore"
      }
    }
  ).pretty()