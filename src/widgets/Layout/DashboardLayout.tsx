import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Декларации", "/declarations", <FileDoneOutlined   />),
  getItem("Справочник", "sub1", <UserOutlined />, [
    getItem("Юридические лица", "/reference_book/legal_entities"),
    getItem("Физические лица", "#"),
  ]),
];
function flattenKeys(items: MenuItem[]): string[] {
  return items.reduce<string[]>((all, item) => {
    all.push(String(item?.key));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (item?.children) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      all.push(...flattenKeys(item?.children));
    }
    return all;
  }, []);
}

export const DashboardLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuKeys = flattenKeys(items);
  const selectedKey =
    menuKeys.find(
      (key) => pathname === key || pathname.startsWith(key + "/"),
    ) || "/";
  const selectedKeys = [selectedKey];

  const root = "/" + pathname.split("/")[1]; // e.g. "/reference_book" or "/declarations"
  const submenuMap: Record<string, string> = {
    "/reference_book": "sub1",
    "/declarations": "sub0", // if you had a declarations submenu
    // …any others…
  };
  const currentOpenKey = submenuMap[root];

  useEffect(() => {

    setOpenKeys(currentOpenKey ? [currentOpenKey] : []);
  }, [currentOpenKey]);

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (typeof key === "string" && key.startsWith("/")) {
      navigate(key);
    }
  };

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbItems: { path: string; crumb: string }[] = [
    { path: '/', crumb: 'Главная' },
  ];

  if (segments[0] === 'declarations') {
    breadcrumbItems.push({
      path: '/declarations',
      crumb: 'Декларации',
    });

    if (segments.length > 1) {
      breadcrumbItems.push({
        path: pathname,
        crumb: 'ГТД',
      });
    }
  }


  const EXPANDED_WIDTH = 200;
  const COLLAPSED_WIDTH = 80;
  const siderWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(val) => setCollapsed(val)}
        width={EXPANDED_WIDTH}          // ← explicit expanded width
        collapsedWidth={COLLAPSED_WIDTH}// ← explicit collapsed width
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,                // ← make sure it’s on top
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
            style={{paddingTop: "20px"}}
          theme="dark"
          mode="inline"
          items={items}
          onClick={onMenuClick}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      </Sider>

      <Layout
          style={{
            marginLeft: siderWidth,
            transition: "margin-left 0.2s", // smooth if you want
            minHeight: "100vh",
          }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px"  }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((bc) => (
              <Breadcrumb.Item key={bc.path}>
                <Link to={bc.path}>{bc.crumb}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              // minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              // border: "1px dotted red"
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
