import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

export abstract class BaseMultipleDbRepository<T> {
  @InjectDataSource() private readonly dataSource: DataSource;
  entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public getRepository(): Repository<T> {
    const connection = this.getDataSource();
    return connection.getRepository<T>(this.entityName);
  }

  async withTransaction(fn: (entityManager: EntityManager) => Promise<unknown>): Promise<unknown> {
    return await this.getDataSource().transaction(fn);
  }
}
