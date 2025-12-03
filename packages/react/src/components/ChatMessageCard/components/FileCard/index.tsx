import React, { useMemo } from 'react';
import { Card, Space, Typography } from 'antd';
import {
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileZipOutlined,
  FileMarkdownOutlined,
  FileOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import './index.less';

const { Text } = Typography;

export interface IFileCardProps {
  name: string;
  size: number;
  status?: 'uploading' | 'success' | 'error';
}

const FileCard: React.FC<IFileCardProps> = ({
  name,
  size,
  status = 'success',
}) => {
  const fileType = useMemo(() => {
    const n = name.toLowerCase();
    if (/\.(jpe?g|png|gif|webp)$/i.test(n)) return 'image';
    if (/\.(pdf)$/i.test(n)) return 'pdf';
    if (/\.(docx?)$/i.test(n)) return 'word';
    if (/\.(xlsx?)$/i.test(n)) return 'excel';
    if (/\.(pptx?)$/i.test(n)) return 'ppt';
    if (/\.(md?)$/i.test(n)) return 'md';
    if (/\.(zip|rar|7z)$/i.test(n)) return 'zip';
    return 'file';
  }, [name]);

  const fileIconMap: Record<string, React.ReactNode> = {
    image: <FileImageOutlined />,
    pdf: <FilePdfOutlined />,
    word: <FileWordOutlined />,
    excel: <FileExcelOutlined />,
    ppt: <FilePptOutlined />,
    zip: <FileZipOutlined />,
    md: <FileMarkdownOutlined />,
    file: <FileOutlined />,
  };

  const iconColorMap: Record<string, string> = {
    image: '#8c5ce6',
    pdf: '#ff6b6b',
    word: '#2b579a',
    excel: '#217346',
    ppt: '#d24726',
    zip: '#51cf66',
    md: '#fb7185',
    file: '#339af0',
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  const IconComponent =
    status === 'uploading' ? <LoadingOutlined spin /> : fileIconMap[fileType];

  return (
    <div className="chat-file-card">
      <Card
        size="small"
        className={`file-card ${status}`}
        bordered={false}
        hoverable
      >
        <Space align="center" wrap={false}>
          <span
            style={{
              fontSize: 32,
              color: iconColorMap[fileType],
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {IconComponent}
          </span>
          <Space direction="vertical" size={0}>
            <Text className="file-name" ellipsis={{ tooltip: name }}>
              {name}
            </Text>
            <Text type="secondary" className="file-meta">
              {formatSize(size)}
            </Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default FileCard;
