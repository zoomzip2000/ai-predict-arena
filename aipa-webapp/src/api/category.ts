import apiClient from "./apiClient";

export interface CategoryDTO {
  categoryUuid: string;
  categoryName: string;
  data?: any;
}

export const getListCategory = async (lang = "EN") => {
  return apiClient.get<CategoryDTO[]>(`/api/event/category/list`, {
    headers: {
      "X-localization": lang.toLowerCase(),
    },
  });
};

export const getCategoryInfo = async (categoryUUID: string) => {
  return apiClient.get(`/api/event/category-v2/${categoryUUID}`).then(res => res.data);
};
