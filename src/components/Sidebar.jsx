import { SideNav } from "@govtechsg/sgds-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [activeKey, setActiveKey] = useState([]);
  const [activeLinkKey, setActiveLinkKey] = useState("");

  const clickLink = (key) => {
    setActiveLinkKey(key);
  };

  const clickButton = (key) => {
    activeKey === key ? setActiveKey("") : setActiveKey(key);
  };

  const clickButtonLink = (key) => {
    setActiveLinkKey("");
    clickButton(key);
  };

 

  return (
    <sgds-aside-area style={{ visibility: props.visibilityValue }} class={`left-sidebar`}>
      <SideNav
        defaultActiveKey={["4"]}
        activeKey={activeKey}
        activeNavLinkKey={activeLinkKey}
        alwaysOpen={true}
      >
        {pathname.includes("/administration") ? (
          <>
            <SideNav.Item eventKey={"1"}>
              <SideNav.Link
                eventKey={"1"}
                className={`custom-link ${
                  pathname.includes("/workflow-list") ? "active" : null
                }`}
                onClick={() => navigate("/administration/workflow-list")}
              >
                Configuring Workflow
              </SideNav.Link>
            </SideNav.Item>
          </>
        ): null}
      
      {pathname.includes("/request") ? (
          <>
            <SideNav.Item eventKey={"1"}>
              <SideNav.Link
                eventKey={"1"}
                className={`custom-link ${
                  pathname.includes("/course-withdrawal") ? "active" : null
                }`}
                onClick={() => navigate("/request/course-withdrawal")}
              >
                Course Withdrawal
              </SideNav.Link>
            </SideNav.Item>
          </>
        ): null}

      </SideNav>
   </sgds-aside-area>
  );
}
