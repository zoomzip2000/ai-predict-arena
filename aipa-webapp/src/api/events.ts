import apiClient from "./apiClient";

export interface EventBidDTO {
  eventUuid: string;
  bidType: "BID_UP" | "BID_DOWN";
  amount: number;
  balanceType: "Demo" | "Real";
}

export const getListEventsForCategory = async (category: string, page = 0, lang = "EN") => {
  return apiClient.get(`/api/event/list/market?category=${category}&size=12&page=${page}`, {
    headers: {
      "X-localization": lang.toLowerCase(),
    },
  });
};

export const getListCanceledEventsForCategory = async (category: string, page = 0) => {
  return apiClient.get(`/api/event/list?include=CANCELED&category=${category}&size=12&page=${page}`);
};

export const getListCalendarEventsForCategory = async (category: string, page = 0) => {
  return apiClient.get(`/api/event/list?include=PUBLISHED&category=${category}&size=12&page=${page}`);
};

export const getListEventsForMainPage = async (lang = "EN") => {
  return apiClient.get(`/api/event/presentation`, {
    headers: {
      "X-localization": lang.toLowerCase(),
    },
  });
};

export const getCurrentEvent = async (uuid: string, lang = "EN") => {
  return apiClient.get(`/api/event/${uuid}`, {
    headers: {
      "X-localization": lang.toLowerCase(),
    },
  });
};

export const createBidEvent = async (data: EventBidDTO) => {
  return apiClient.post(`/api/event/bid`, data);
};

export const getBrunchEvent = async (uuids: string[]) => {
  return apiClient.post(`/api/event/list/bunch`, { uuids });
};
