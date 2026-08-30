"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepostaory = void 0;
class DatabaseRepostaory {
    model;
    constructor(model) {
        this.model = model;
    }
    async findAll({ select, populate, lean, }) {
        let query = this.model.find({});
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return await query;
    }
    async findById({ id, select, populate, lean, }) {
        let query = this.model.findById(id);
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return await query;
    }
    async findOne({ item, select, populate, lean, }) {
        let query = this.model.findOne(item);
        if (select) {
            query = query.select(select);
        }
        if (populate) {
            query = query.populate(populate);
        }
        if (lean) {
            query = query.lean(lean);
        }
        return await query;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async updateOne({ filter, data }) {
        return await this.model.updateOne(filter, data);
    }
    async deleteOne(filter) {
        return await this.model.deleteOne(filter);
    }
}
exports.DatabaseRepostaory = DatabaseRepostaory;
