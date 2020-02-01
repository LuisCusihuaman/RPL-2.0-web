// @flow
import type { Activity, Category } from "../types";

const { request } = require("../utils/Request");

const producer = {
  base_url: process.env.API_BASE_URL || "localhost:8080",
};

exports.createActivity = (activityDetails: any) => {
  const formData = new FormData();

  Object.keys(activityDetails).forEach(property => {
    if (!activityDetails[property]) {
      return;
    }
    formData.append(property, activityDetails[property]);
  });

  formData.append("supportingFile", new File(["Hola Mundo!"], "supporting_file1.txt"));
  formData.append("supportingFile", new File(["Hola Mundo2!"], "supporting_file2.txt"));

  return request({
    url: `http://${producer.base_url}/api/courses/${activityDetails.courseId}/activities`,
    body: formData,
    method: "POST",
    headers: new Headers(),
  });
};

exports.getActivityCategories = (courseId: number): Promise<Array<Category>> =>
  request({
    url: `http://${producer.base_url}/api/courses/${courseId}/activityCategories`,
    method: "GET",
  });

exports.getAllActivities = (courseId: number): Promise<Array<Activity>> =>
  request({
    url: `http://${producer.base_url}/api/courses/${courseId}/activities`,
    method: "GET",
  });

exports.getActivity = (courseId: number, activityId: number): Promise<Activity> =>
  request({
    url: `http://${producer.base_url}/api/courses/${courseId}/activities/${activityId}`,
    method: "GET",
  });
