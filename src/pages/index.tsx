import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { Layout, Col, Row, Upload, Button, Icon, message } from "antd";

import { RcFile, UploadChangeParam } from "antd/es/Upload";
import { UploadFile } from "antd/lib/upload/interface";

const { Header, Content, Footer } = Layout;

const header = { headers: { "Content-Type": "multipart/form-data" } };

const Index = () => {
  const [customFileList, setCustomFileList] = useState<RcFile[]>([]);

  const beforeUpload = (file: RcFile, fileList: RcFile[]): boolean => {
    if (file.size > 100 * 1024 * 1024) {
      message.error("啊哦，太大了");
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

    return false;
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
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
              col-12
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Powered By ALi Cloud</Footer>
    </Layout>
  );
};

export default Index;
