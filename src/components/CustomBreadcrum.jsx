import React from 'react'
import { Breadcrumb } from "@govtechsg/sgds-react/Breadcrumb";
import { Link, useLocation } from 'react-router-dom';

export default function CustomBreadcrumb() {
  const location = useLocation();

  // Split the path by '/' and filter out empty segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb
      listProps={{
        className: "bg-light",
        foo: "bar",
      }}
    >
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isActive = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item key={to} active={isActive}>
            {isActive ? (
              value.charAt(0).toUpperCase() + value.slice(1)
            ) : (
              <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
