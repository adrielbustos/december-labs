import BadgeModel from "./badge.schema";

class BadgeService {
    public constructor() {}
    public async createBadge(name: string) {
        const badge = new BadgeModel({name});
        return await badge.save();
    }
    public async findeByName(name: string) {
        return await BadgeModel.findOne({name});
    }
    public async findBadgeById(id: string) {
        return await BadgeModel.findById(id);
    }
}

export default BadgeService;