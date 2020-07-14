/* eslint-disable no-console */
import {
  BarChartOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SettingFilled
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

const { Sider } = Layout;
const { Item } = Menu;

function Sidebar() {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Item
          className="logo"
          onClick={() => history.push("/")}
          key="1"
          title={<FormattedMessage id="sidebar.login" />}
        >
          <div /* 
            className={`logo ${
              location.pathname === "/" ? "logoSelected" : ""
            }`} */
          >
            <img
              className="logoTitle"
              src={require("../../images/icon.png")}
              alt=""
            />
          </div>
        </Item>
        <Item
          onClick={() => history.push("/login")}
          key="2"
          title={<FormattedMessage id="sidebar.login" />}
        >
          <LoginOutlined />
          {!collapsed && <FormattedMessage id="sidebar.login" />}
        </Item>
        <Item
          onClick={() => history.push("/scores")}
          key="3"
          title={<FormattedMessage id="sidebar.scores" />}
        >
          <OrderedListOutlined />
          {!collapsed && <FormattedMessage id="sidebar.scores" />}
        </Item>
        <Item
          onClick={() => history.push("/statistics")}
          key="4"
          title={<FormattedMessage id="sidebar.statistics" />}
        >
          <BarChartOutlined />
          {!collapsed && <FormattedMessage id="sidebar.statistics" />}
        </Item>
        <Item
          onClick={() => history.push("/configurations")}
          key="5"
          title={<FormattedMessage id="sidebar.configurations" />}
        >
          <SettingFilled />
          {!collapsed && <FormattedMessage id="sidebar.configurations" />}
        </Item>
        <Item
          onClick={() => history.push("/logout")}
          key="6"
          title={<FormattedMessage id="btn.logout" />}
        >
          <LogoutOutlined />
          {!collapsed && <FormattedMessage id="btn.logout" />}
        </Item>
        <Item
          onClick={() => history.push("/about")}
          key="7"
          title={<FormattedMessage id="sidebar.about" />}
        >
          <PlusOutlined />
          {!collapsed && <FormattedMessage id="sidebar.about" />}
        </Item>
      </Menu>
      <span className="sidebarToggleSpan">
        {collapsed ? (
          <MenuUnfoldOutlined
            className="sidebarToggleIcon"
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <MenuFoldOutlined
            className="sidebarToggleIcon"
            onClick={() => setCollapsed(true)}
          />
        )}
      </span>
    </Sider>
  );
}

export default Sidebar;
