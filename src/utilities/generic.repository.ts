import { Repository } from 'typeorm';

export class GenericRepository<T> extends Repository<T> {}
