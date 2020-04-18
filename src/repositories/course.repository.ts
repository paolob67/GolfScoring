import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Course, CourseRelations, Address, Hole} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';
import {HoleRepository} from './hole.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.CourseId,
  CourseRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Course.prototype.CourseId>;

  public readonly CourseHoles: HasManyRepositoryFactory<Hole, typeof Course.prototype.CourseId>;

  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('HoleRepository') protected holeRepositoryGetter: Getter<HoleRepository>,
  ) {
    super(Course, dataSource);
    this.CourseHoles = this.createHasManyRepositoryFactoryFor('CourseHoles', holeRepositoryGetter,);
    this.registerInclusionResolver('CourseHoles', this.CourseHoles.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
