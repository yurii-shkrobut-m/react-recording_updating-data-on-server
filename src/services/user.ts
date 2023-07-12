import { User } from '../types';
import { getData } from '../utils/httpClient';

export function getUsers() {
  return getData<User[]>('/users')
    .then(users => users.slice(0, 11))
}
