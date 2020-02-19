import React, { useState } from "react";
import "./index.css";
import {
  Layout,
  Col,
  Row,
  Upload,
  Button,
  Icon,
  Input,
  message,
  Typography
} from "antd";

import ModalCom from "../components/Modal";
import InfoComponent from "./Info";
import HeaderCom from "../components/Header";
import { RcFile, UploadChangeParam } from "antd/es/Upload";
import { UploadFile } from "antd/lib/upload/interface";

const { Text } = Typography;
const { Content, Footer } = Layout;

// TODO: refractor upload logic
// const header = { headers: { "Content-Type": "multipart/form-data" } };

const Index = () => {
  const [customFileList, setCustomFileList] = useState<RcFile[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [isImg, setIsImg] = useState<boolean>(false);
  const [customeName, setCustomeName] = useState<string>("");

  interface ICustomProps {
    customeName: string;
  }

  const beforeUpload = (file: RcFile & ICustomProps): boolean => {
    if (file.size > 100 * 1024 * 1024) {
      message.error("啊哦，文件太大了");
      return false;
    }
    file.customeName = customeName;
    console.log(file);
    return true;
  };

  const onChange = async ({
    file,
    fileList
  }: UploadChangeParam<UploadFile<any>>) => {
    console.log(file, fileList);
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

  const transformFile = (file: RcFile): File => {
    console.log(file);
    // @ts-ignore
    file.customeName = "sss";
    return file;
  };
  return (
    <Layout className="layout">
      <HeaderCom />

      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row>
            <Col span={10}>
              <Text>你可以为文件自定义命名，如oss.linbudu.top/budu.png。</Text>
              <br />
              <br />
              <Text>后缀名将保持原来的值。</Text>
              <br />
              <br />
              <Text>由于MarkDown语法原因，英文括号()会被转化，如:</Text>
              <br />
              <Text strong>foo(1).png -> foo-1.png</Text>
              <Input
                placeholder="后台实现研究中"
                disabled
                className={"set_name"}
                onChange={e => {
                  setCustomeName(e.target.value);
                }}
              />
              {/* TODO: 多文件 文件夹 滚动列表 */}
              <Upload
                listType="picture"
                // action="http://api.linbudu.top/upload"
                action="http://47.97.183.158:3666/upload"
                accept="*"
                method="POST"
                fileList={customFileList}
                data={{ customeName }}
                beforeUpload={
                  (beforeUpload as unknown) as (
                    file: RcFile,
                    FileList: RcFile[]
                  ) => boolean
                }
                transformFile={transformFile}
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
