const Tour = require("../models/Tours");

class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }


    filter(){
        // 1A) Filtering
        const queryObj = { ...this.query };
        const excludedFields = [ 'page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(element => delete queryObj[element]);

        // 1B) Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.stringify(queryStr));

        return this;
    }

    sort(){
        // 2) Sorting
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        //3) Field limiting
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            //excluding __v from results
            this.query = this.query.select('-__v');
        }
        return this;
    }



    paginate(){
        // 4) Pagination
        const page = this.query.page * 1 || 1;
        const limit = this.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }


}

module.exports = ApiFeatures;