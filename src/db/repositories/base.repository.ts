import { getRepository, Repository, Entity, EntityTarget } from 'typeorm';

export class BaseRepository {
  protected readonly repository: Repository<typeof Entity>;

  constructor(entity: EntityTarget<typeof Entity>) {
    this.repository = getRepository(entity);
  }
}
