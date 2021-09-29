import { request } from 'umi';

export async function getUserRoutes(userId: string, options?: any) {
  return request(`/api/menuRoutes`, {
    method: 'GET',
    ...(options || {}),
  });
}
