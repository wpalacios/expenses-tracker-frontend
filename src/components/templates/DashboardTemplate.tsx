import React from "react";
import NavigationDrawer from "../organisms/NavigationDrawer";

type DashboardTemplateProps = {
  header: React.ReactNode;
  content: React.ReactNode;
};

const DashboardTemplate = ({ header, content }: DashboardTemplateProps) => (
  <div className="flex p-4 h-screen">
    <NavigationDrawer />
    <div className="flex-col w-full">
      <header className="flex-grow mb-2">{header}</header>
      <main className="flex-grow p-4 bg-background h-full">{content}</main>
    </div>
  </div>
);

export default DashboardTemplate;
