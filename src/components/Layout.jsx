import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import CustomNavbar from "@/components/CustomNavbar";
import { ToastContainer } from "react-toastify";
import CustomBreadcrumb from "./CustomBreadcrum";
import axios from "axios";

export default function Layout(props) {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [openRightbar, setOpenRightbar] = useState(true);
    const widthScreen = window.innerWidth;

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                //place your reentry code
                // sessionStorage.removeItem("idToken");
                // instance.logoutRedirect();
                //requestIdToken();
            }
            return error;
        }
    );

    return (
        <>

            <CustomNavbar
                currentActiveNav={props.currentNav}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                openRightbar={openRightbar}
                setOpenRightbar={setOpenRightbar}
            />

            <sgds-template-grid
                class={`${openSidebar ? "with-sidenav" : "without-sidenav"} ${props?.toc
                    ? openRightbar && widthScreen >= 991
                        ? "with-toc"
                        : "without-toc"
                    : "without-toc"
                    } `}
            >

                <Sidebar
                    currentNav={props.currentNav}
                    visibilityValue={openSidebar ? "visible" : "hidden"}
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                />

                <sgds-content-area className="gap-4">
                     <CustomBreadcrumb /> 
                    {props.children}

                </sgds-content-area>

            </sgds-template-grid>
            <Footer />
            <ToastContainer autoClose={false} />
        </>
    );
}
