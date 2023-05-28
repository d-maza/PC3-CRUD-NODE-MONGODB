class Crud {

    constructor(model) {
        this.model = model
    }

    getAll = () => {
        return this.model.find();
    };

    delete = (id) => {
        return this.model.findByIdAndDelete(id);
    };

    add = (body) => {
        const data = new this.model(body);
        return this.model.create(data);
    };

    getById = (id) => {

        const result = this.model.find({ _id: id })
        return result;
    };

    editById = (id, body) => {

        return this.model.findByIdAndUpdate(id, body);
    };
}

module.exports = Crud