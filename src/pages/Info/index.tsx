import React from "react";

import { Col, Row, Typography, Progress } from "antd";

const { Text } = Typography;

const InfoComponent: React.FC = () => {
  return (
    <>
      <Row>
        <Text>
          当前Bucket：<Text strong>linbudu-oss-store</Text>
        </Text>
        {/* TODO: No <br /> plz，use Gutter */}
        <br />
        <br />
        <Col span={3}>使用进度:</Col>
        <Col span={18} offset={1}>
          <Progress
            percent={50}
            status="active"
            strokeColor={{
              "0%": "#87d068",
              "100%": "#108ee9"
            }}
            strokeWidth={15}
          />
        </Col>
        <br />
        <br />
        <br />
        <Text>其他可用Bucket使用情况</Text>
        <br />
        <br />
        <Col span={3}>Bucket1</Col>
        <Col span={18} offset={1}>
          <Progress percent={50} status="active" strokeWidth={15} />
        </Col>
        <br />
        <br />
        <Col span={3}>Bucket2</Col>
        <Col span={18} offset={1}>
          <Progress percent={50} status="active" strokeWidth={15} />
        </Col>
        <br />
        <br />
        <Col span={3}>Bucket3</Col>
        <Col span={18} offset={1}>
          <Progress percent={80} status="normal" strokeWidth={15} />
        </Col>
      </Row>
    </>
  );
};

export default InfoComponent;
