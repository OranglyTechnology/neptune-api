import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    nullable: false,
  })
  @Field(() => String)
  email: string;

  @Exclude()
  @Column({
    nullable: false,
  })
  @Field(() => String)
  password: string;
}
