import { Login, User } from "../../src/types/exporter";

export const USER_1: User = {
  id: 1,
  level: 50,
  password: 'senha do mago',
  username: 'O grande Merlim',
  vocation: 'Mago',
};

export const USER_2: User = {
  id: 2,
  level: 80,
  password: 'senha do bárbaro',
  username: 'Touros o Bárbaro',
  vocation: 'Bárbaro', 
};

export const USER_LOGIN_1: Login = {
  username: USER_1.username,
  password: USER_1.password,
};

export const USER_LOGIN_NO_USERNAME = {
  password: USER_1.password,
};

export const USER_LOGIN_NO_PASSWORD = {
  username: USER_1.username,
};

export const USER_LOGIN_EMPTY_PASSWORD = {
  username: USER_1.username,
  password: '',
};

export const USER_LOGIN_EMPTY_USERNAME = {
  username: '',
  password: USER_1.password,
};