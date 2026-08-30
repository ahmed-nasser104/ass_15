import { Model } from "mongoose";

export class DatabaseRepostaory<TrowInterface> {
  private model: Model<TrowInterface>;
  constructor(model: Model<TrowInterface>) {
    this.model = model;
  }
  async findAll({
    select,
    populate,
    lean,
  }: {
    select?: string;
    populate?: string;
    lean?: boolean;
  }) {
    let query: any = this.model.find({});
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
  async findById({
    id,
    select,
    populate,
    lean,
  }: {
    id: string;
    select?: string;
    populate?: string;
    lean?: boolean;
  }) {
    let query: any = this.model.findById(id);
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
  async findOne({
    item,
    select,
    populate,
    lean,
  }: {
    item: any;
    select?: string;
    populate?: string;
    lean?: boolean;
  }) {
    let query: any = this.model.findOne(item);
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
  async create(data: any) {
    return await this.model.create(data);
  }

  async updateOne({ filter, data }: { filter: any; data: any }) {
    return await this.model.updateOne(filter, data);
  }

  async deleteOne(filter: any) {
    return await this.model.deleteOne(filter);
  }
}
