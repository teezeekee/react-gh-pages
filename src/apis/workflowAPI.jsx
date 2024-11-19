import { createUrlWithParams } from "@/components/utils/utils";
import { apiCall } from "@/utils/apiCall";

//#region administrator : workflow API functions
export async function getWorkflow() {
  return apiCall(
    `${process.env.REACT_APP_API_URL}/applications/workflows`,
    {},
    "GET"
  );
}

export async function getWorkflowById(id) {
  let baseUrl = `${process.env.REACT_APP_API_URL}/applications/workflows/detail/` +id;
  return apiCall(baseUrl, {}, "GET");
}

export function postWorkflow(workflowData) {
  return apiCall(
    `${process.env.REACT_APP_API_URL}/applications/workflows`,
    workflowData,
    "POST"
  );
}

  //#endregion

//#region withdrawal request API 
  export async function getWithdrawalRequests() {
    return apiCall(
      `${process.env.REACT_APP_API_URL}/applications/withdrawalrequest`,
      {},
      "GET"
    );
  }
  
  export async function getWithdrawalRequestById(id) {
    let baseUrl = `${process.env.REACT_APP_API_URL}/applications/withdrawalrequest/detail/` +id;
    return apiCall(baseUrl, {}, "GET");
  }
  
  export function postWithdrawalRequest(workflowData) {
    return apiCall(
      `${process.env.REACT_APP_API_URL}/applications/withdrawalrequest`,
      workflowData,
      "POST"
    );

  }
  //#endregion