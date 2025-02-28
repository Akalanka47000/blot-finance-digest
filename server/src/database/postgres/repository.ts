import { EntityTarget, FindManyOptions, ObjectLiteral, Repository } from "typeorm";

export class CustomRepository<Entity extends ObjectLiteral> extends Repository<Entity> {

    constructor(model: EntityTarget<Entity>) {
        const ds = require("./data-source").default
        super(model, ds.createEntityManager())
    }

    async paginate(options: QueryOptions) {
        const opts: FindManyOptions = {}
        if (options.filter) {
            opts.where = options.filter
        }
        if (options.sort) {
            opts.order = options.sort
        }

        let data: Entity[], total: number;

        if (options.page) {
            options.limit ??= 10
            opts.take = +options.limit;
            opts.skip = (+options.page - 1) * opts.take;
            [data, total] = await this.findAndCount(opts)
        } else {
            data = await this.find(opts)
            return data
        }

        const totalPages = Math.ceil(total / +options.limit)
        let next = +options.page + 1
        if (next > totalPages) {
            next = null
        }
        const prev = +options.page - 1 || null
        return {
            docs: data,
            hasNextPage: +options.page * +options.limit < total,
            hasPrevPage: +options.page > 1,
            nextPage: next,
            prevPage: prev,
            totalDocs: total,
            totalPages
        }
    }
}