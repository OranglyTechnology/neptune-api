
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    email: string;
    password: string;
}

export interface SignInUserRequestInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    email: string;
    id: string;
    password: string;
}

export interface IMutation {
    create(user: CreateUserInput): UserEntity | Promise<UserEntity>;
    delete(id: string): string | Promise<string>;
    signIn(signInUserRequestInput: SignInUserRequestInput): SignInUserResponseObject | Promise<SignInUserResponseObject>;
    update(user: UpdateUserInput): UserEntity | Promise<UserEntity>;
}

export interface IQuery {
    user(id: string): UserEntity | Promise<UserEntity>;
    users(): UserEntity[] | Promise<UserEntity[]>;
}

export interface SignInUserResponseObject {
    accessToken: string;
    user: UserEntity;
}

export interface UserEntity {
    email: string;
    id: string;
    password?: Nullable<string>;
}

type Nullable<T> = T | null;
