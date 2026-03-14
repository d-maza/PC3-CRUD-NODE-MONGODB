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
        return this.model.create(body);
    };

    getById = (id) => {
        return this.model.findById(id);
    };

    editById = (id, body) => {
        return this.model.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
    };
}

module.exports = Crud