import BadgeModel from "./badge.schema";

class BadgeService {
    public constructor() {}
    public async findeByName(name: string) {
        return await BadgeModel.findOne({name});
    }
}

export default BadgeService;