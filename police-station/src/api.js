import axios from "axios";
const baseURL = 'http://police-site-server-git-sivan-securityapp1.apps.openforce.openforce.biz';

export default {
  policeStation() {
    return {
      getActivities: () => axios.get(`${baseURL}/activity`),
      addActivity: (newActivity) => axios.post(`${baseURL}/activity/add`, newActivity),
      getCops: () => axios.get(`${baseURL}/users`),
      getReports: () => axios.get(`${baseURL}/report`),
      getStabbingReport: (reportId) => axios.get(`${baseURL}/stabbing/id/${reportId}`),
      getShootingReport: (reportId) => axios.get(`${baseURL}/shooting/id/${reportId}`),
      getAccidentReport: (reportId) => axios.get(`${baseURL}/accident/id/${reportId}`),
      getKidnappingReport: (reportId) => axios.get(`${baseURL}/kidnap/id/${reportId}`),
    };
  }
};