import { PagedResultBase } from "./paged-result-base.model";

export interface PagedResult<T> extends PagedResultBase {
  data: T[];
}
