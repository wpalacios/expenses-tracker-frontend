import React from "react";

type DashboardTemplateProps = {
  header: React.ReactNode;
  content: React.ReactNode;
};

const DashboardTemplate = ({ header, content }: DashboardTemplateProps) => (
  <div className="p-4">
    <header className="mb-4">{header}</header>
    <main>{content}</main>
  </div>
);

export default DashboardTemplate;
