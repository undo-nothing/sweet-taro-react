import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function getWapperInfo(date: string, options?: any) {
  return request(`/v1.0/bingwappers/?date=${date}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// /** 退出登录接口 POST /api/login/outLogin */
// export async function outLogin(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/login/outLogin', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }

// const BASE_URL = 'http://127.0.0.1:8000'

// export function getWapperList(params) {
//   return axios({
//     url: BASE_URL + '/v1.0/bingwappers/',
//     method: 'get',
//     params: params
//   })
// }

// export function getWapperInfo(id) {
//   return axios({
//     url: BASE_URL + '/v1.0/bingwappers/' + id + '/',
//     method: 'get'
//   })
// }
