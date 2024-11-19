import React, { useState, useEffect, useContext } from "react";

import moment from "moment";

export default function Footer(props) {
  return (
    <footer className="sgds footer">
      {/* 
      <section className="footer-top">
        
        <div className="container-fluid">
          <div className="row footer-contact-links">
            <div className="col">
              <div className="d-flex justify-content-lg-end">
                <ul>
                  <li>
                    <a
                      href="https://helpit.service-now.com/nyp"
                      target="_blank"
                    >
                      Contact Us NYP IT Help Desk Support Portal - NYP IT
                      HELPDESK Support Portal
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      <section className="footer-bottom">
        <div className="container-fluid">
          <div className="row footer-mandatory-links">
            <div className="col">
              <ul>
                <li>
                  <a
                    href="https://www.tech.gov.sg/report_vulnerability/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Vulnerability
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nyp.edu.sg/privacy-policy"
                    target="_blank"
                  >
                    Privacy Statement{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nyp.edu.sg/copyright-disclaimer"
                    target="_blank"
                  >
                    Copyright and Disclaimer
                  </a>
                </li>
                <li className="float-end">
                  <a href="https://helpit.service-now.com/nyp" target="_blank">
                    Contact Us NYP IT Help Desk Support Portal - NYP IT HELPDESK
                    Support Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row footer-copyrights">
            <div className="col">
              <div className="d-flex justify-content-lg-end">
                Copyright @{moment(new Date()).format("YYYY")} NYP, Singapore.
                All right reserved.
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
