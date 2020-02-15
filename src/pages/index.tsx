import React, { useState } from "react";
import "./index.css";
import {
  Layout,
  Col,
  Row,
  Upload,
  Button,
  Icon,
  message,
  Typography
} from "antd";

import ModalCom from "../components/Modal";
import InfoComponent from "../components/Info";
import { RcFile, UploadChangeParam } from "antd/es/Upload";
import { UploadFile } from "antd/lib/upload/interface";
import logo from "../static/logo.png";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

// TODO: refractor upload logic
// const header = { headers: { "Content-Type": "multipart/form-data" } };

const Index = () => {
  const [customFileList, setCustomFileList] = useState<RcFile[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [isImg, setIsImg] = useState<boolean>(false);

  const beforeUpload = (file: RcFile, fileList: RcFile[]): boolean => {
    if (file.size > 100 * 1024 * 1024) {
      message.error("啊哦，文件太大了");
      return false;
    }
    return true;
  };

  const onChange = async ({
    file,
    fileList,
    event
  }: UploadChangeParam<UploadFile<any>>) => {
    console.log(file, fileList, event);
    setCustomFileList([...fileList] as RcFile[]);
    if (file.status === "done" && file.response.url) {
      message.success("上传成功啦");
      if (file.type.startsWith("image")) {
        setIsImg(true);
      } else {
        setIsImg(false);
      }
      setShowModal(true);
      setLink(file.response.url);
    }
  };

  const transform2Md = (origin: string): string => {
    return `![img](${origin})`;
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={logo} alt="" />
          <Text>
            Version 0.1.0 目前支持：
            单文件上传（为图片时自动生成md链接）以及压缩包上传
          </Text>
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row>
            <Col span={10}>
              {/* TODO: 多文件 文件夹 滚动列表 */}
              <Upload
                listType="picture"
                action="http://localhost:3099/upload"
                accept="*"
                method="POST"
                fileList={customFileList}
                beforeUpload={beforeUpload}
                onChange={onChange}
              >
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
            </Col>
            <Col offset={2} span={12}>
              <InfoComponent />
            </Col>
          </Row>
        </div>
      </Content>
      <ModalCom
        visible={showModal}
        title="请带哥复制链接"
        link={link}
        isImg={isImg}
        mdTag={transform2Md(link)}
        hide={() => {
          setShowModal(false);
        }}
      />
      <Footer style={{ textAlign: "center" }}>Powered By ALi Cloud</Footer>
    </Layout>
  );
};

export default Index;
