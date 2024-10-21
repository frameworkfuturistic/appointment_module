// helpers/pagination.js
const paginate = (model, page, limit) => {
    return model
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  };
  
  module.exports = paginate;
  