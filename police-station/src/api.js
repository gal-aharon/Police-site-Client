import axios from "axios";
const baseURL = 'http://police-site-server-git-sivan-securityapp1.apps.openforce.openforce.biz';

export default {
  policeStation() {
    return {
      getActivities: () => axios.get(`${baseURL}/activity`),
      addActivity: (newActivity) => axios.post(`${baseURL}/activity`, newActivity),
      getCops: () => axios.get(`${baseURL}/users`),
      getReports: () => axios.get(`${baseURL}/reports`),
    };
  }
};