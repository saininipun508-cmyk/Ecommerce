class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "page"];

    removeFields.forEach((key) => delete queryStrCopy[key]);

    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (data) => `$${data}`);

    queryStr = JSON.parse(queryStr);
    this.query = this.query.find(queryStr);
    return this;
  }

  pagination(resultPerPage) {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || resultPerPage;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
