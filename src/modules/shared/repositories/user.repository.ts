import { UserEntity } from 'databases/entities/user.entity';
import { BaseMultipleDbRepository } from './base.repository';

export class UserRepository extends BaseMultipleDbRepository<UserEntity> {
  constructor() {
    super(UserEntity.name);
  }
}
