import { User } from '../types';
import { client } from '../utils/httpClient';

export function getUsers() {
  return client.get<User[]>('/users')
    .then(users => users.slice(0, 11))
}
