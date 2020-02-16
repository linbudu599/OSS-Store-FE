import React from "react";
import { Layout, Typography } from "antd";
import logo from "../../static/logo.png";

const { Header } = Layout;
const { Text } = Typography;

const HeaderCom: React.FC = () => {
  return (
    <Header>
      <div className="logo">
        <img src={logo} alt="" />
        <Text>
          Version 0.1.1 目前支持：
          单文件上传（为图片时自动生成md链接）以及压缩包上传
        </Text>
      </div>
    </Header>
  );
};

export default HeaderCom;
