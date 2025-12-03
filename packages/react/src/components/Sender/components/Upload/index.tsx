import React, { useState } from 'react';
import { Modal, Card, Upload, Button, Space, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

const { Dragger } = Upload;

interface UploadProps {
  showUpload: boolean;
  onUpdateShowUpload: (show: boolean) => void;
  onUpload?: (files: UploadFile[]) => void;
}

const UploadComponent: React.FC<UploadProps> = ({
  showUpload,
  onUpdateShowUpload,
  onUpload,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setFileList([]);
    onUpdateShowUpload(false);
  };

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.warning('请先选择文件');
      return;
    }
    onUpload?.(fileList);
    setFileList([]);
    onUpdateShowUpload(false);
  };

  const handleFileChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
  };

  return (
    <Modal
      title="文件上传"
      open={showUpload}
      onCancel={handleCancel}
      width={600}
      footer={
        <Space>
          <Button onClick={handleCancel}>取消</Button>
          <Button
            type="primary"
            disabled={fileList.length === 0}
            onClick={handleUpload}
          >
            开始上传
          </Button>
        </Space>
      }
    >
      <Card bordered={false} style={{ width: '100%' }} >
        <Dragger
          multiple
          maxCount={5}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleFileChange}
        >
          <div className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: 48, color: '#bfbfbf' }} />
          </div>
          <div className="ant-upload-text">点击或者拖动文件到该区域来上传</div>
        </Dragger>
      </Card>
    </Modal>
  );
};

export default UploadComponent;
