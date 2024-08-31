import { dataSource } from "../../../config/data-source";

import { User } from "../entities/user.entity";

export class UserService {
    private userRepository = dataSource.getRepository(User);

    async getAllUsers() {
        return this.userRepository.find();
    };

    async getUserById(id: number) {
        return this.userRepository.findOneBy({ id })
    };

    async createUser(name: string) {
        const user = this.userRepository.create({ name });
        return this.userRepository.save(user);
    };
};