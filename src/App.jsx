//#region  import
 import React from 'react';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import WorkflowList from "@/pages/Administration/WorkflowList";
import WorkflowDetail from "@/pages/Administration/WorkflowDetail";
import CourseWithdrawal from "@/pages/Request/CourseWithdrawal";
import CourseWithdrawalDetail from "@/pages/Request/CourseWithdrawalDetail";
import CustomBreadcrumb from './components/CustomBreadcrum';
//#endregion

export default function App() {
  return (
    <div className="App">
      <ToastContainer />
      {/* <CustomBreadcrumb /> */}
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path={"/administration"}>
          <Route index element={<WorkflowList />} />
          <Route path={"workflow-list"} element={< WorkflowList />}></Route>
          <Route path={"workflow-detail"} element={< WorkflowDetail />}></Route>
        </Route>
        <Route path={"/request"}>
          <Route index element={<CourseWithdrawal />} />
          <Route path={"course-withdrawal"} element={< CourseWithdrawal />}></Route>
          <Route path={"course-withdrawal-detail/:reqid"} element={< CourseWithdrawalDetail />}></Route>
        </Route>
      </Routes>

    </div>
  );
}