import { createUrlWithParams } from "@/components/utils/utils";
import { apiCall } from "@/utils/apiCall";

export async function getWorkflowStage() {
  return apiCall(
    `${process.env.REACT_APP_API_URL}/applications/workflowstages`,
    {},
    "GET"
  );
}

export async function getWorkflowStageById(id) {
  let baseUrl = `${process.env.REACT_APP_API_URL}/applications/workflowstages/detail/` +id;
  return apiCall(baseUrl, {}, "GET");
}

export function postWorkflowStage(workflowStageData) {
  return apiCall(
    `${process.env.REACT_APP_API_URL}/applications/workflowstages`,
    workflowStageData,
    "POST"
  );
}