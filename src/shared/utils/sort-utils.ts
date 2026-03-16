import { Sort } from "src/shared/utils/dtos/general-query.dto";

export const sortFunction = (sort?: Sort) => {
let sortObject:any = { };
    if (sort===Sort.title) {
      sortObject = { title: 1 };
    }else if (sort===Sort.updatedAt) {
      sortObject = { updatedAt: -1 };
    }else {
      sortObject = { createdAt: -1 };
    }
return sortObject;
}