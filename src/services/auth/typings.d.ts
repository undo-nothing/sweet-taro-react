// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserRouteItem = {
    name?: string;
    path?: string;
  };

  type UserRouteList = {
    data?: UserRouteItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
