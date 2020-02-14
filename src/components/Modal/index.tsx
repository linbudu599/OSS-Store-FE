import React, { useState } from "react";

import { Modal, Col, Row, Typography, Button, message, Input } from "antd";

const { Text } = Typography;

interface IModalProps {
  visible: boolean;
  title: string;
  link: string;
  mdTag: string;
  hide: any;
}

const ModalCom: React.FC<IModalProps> = ({
  visible,
  title,
  hide,
  link,
  mdTag
}) => {
  console.log(link, mdTag);

  const handleCopy = (selector: string): void => {
    const copyDOM = document.querySelector(selector)!; //需要复制文字的节点
    // @ts-ignore
    copyDOM.select();
    document.execCommand("Copy");
    message.success("复制好咯");
  };

  return (
    <>
      <Modal
        visible={visible}
        title={title}
        okText="晓得咯"
        cancelText="爬！"
        destroyOnClose={true}
        onOk={() => {
          hide();
        }}
        onCancel={() => {
          hide();
        }}
      >
        <Row gutter={[0, 24]}>
          <Col span={20}>
            <Text ellipsis style={{ width: "100%" }}>
              <Input
                type="text"
                id="link"
                value={link}
                style={{ width: "95%" }}
              />
            </Text>
          </Col>
          <Col span={4}>
            <Button
              size="small"
              icon="copy"
              onClick={() => {
                handleCopy("#link");
              }}
            >
              复制链接
            </Button>
          </Col>
          <Col span={16}>
            <Text ellipsis style={{ width: "100%" }}>
              <Input
                type="text"
                id="mdtag"
                value={mdTag}
                style={{ width: "90%" }}
              />
            </Text>
          </Col>
          <Col span={4} style={{ marginRight: "20px" }}>
            <Button
              size="small"
              icon="copy"
              onClick={() => {
                handleCopy("#mdtag");
              }}
            >
              复制MarkDown链接
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalCom;
