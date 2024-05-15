class ApiFeature {
  constructor(query, queryStr, seller) {
    this.query = query;
    this.queryStr = queryStr;
    this.seller = seller;
  }
  search() {
    const keyword = this.queryStr.search
      ? {
          title: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const regex = new RegExp(/\b(gt|gte|lte|lt)\b/g);
    let queryString = JSON.stringify(this.queryStr).replace(
      regex,
      (match) => `$${match}`
    );
    let queryobj = JSON.parse(queryString);
    const RemoveFeilds = ["sort", "limit", "page", "fields", "search"];
    RemoveFeilds.forEach((el) => delete queryobj[el]);
    if (this.seller) {
      queryobj.sellerId = this.seller;
    }

    // console.log(queryobj);
    this.query = this.query.find(queryobj);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeature;
