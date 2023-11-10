import { User } from '../types';
import { client } from '../utils/httpClient';

export function getUsers() {
  return client.get<User[]>('/users')
    .then(users => users.slice(0, 11))
    .catch(error => {
      console.log('Error', error)
    })
    .finally(() => {
      console.log('Finally');
    })
}

export const getUsers2 = async () => {
  const users = await client.get<User[]>('/users')

  return users.slice(0, 11)
}
