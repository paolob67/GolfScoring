import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Course, CourseRelations, Address, Hole} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';
import {HoleRepository} from './hole.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Course.prototype.id>;

  public readonly holes: HasManyRepositoryFactory<Hole, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('HoleRepository') protected holeRepositoryGetter: Getter<HoleRepository>,
  ) {
    super(Course, dataSource);
    this.holes = this.createHasManyRepositoryFactoryFor('holes', holeRepositoryGetter,);
    this.registerInclusionResolver('holes', this.holes.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
