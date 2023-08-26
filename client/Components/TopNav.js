import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu; //Item

const TopNav = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const Logout = async (e) => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/Logout`);
    toast(data.message);
    router.push("/Login");
  };

  return (
    <Menu className="mb-2" mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">EC Learn</Link>
      </Item>
      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/Login">Login</Link>
          </Item>

          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/Register">Register</Link>
          </Item>
        </>
      )}

{user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <span>Dashboard</span>
              </Link>
            </Item>
            <Item onClick={Logout}>Logout</Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
