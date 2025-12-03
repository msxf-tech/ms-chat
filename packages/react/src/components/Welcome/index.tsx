import React from 'react';
import { Typography, List } from 'antd';
import type { IWelcomeProps } from '../../types/index';
import './index.less';

const { Title, Paragraph, Text } = Typography;

const Welcome: React.FC<IWelcomeProps> = ({ content, onSetInput }) => {
  const {
    title = '',
    describe = '',
    prompt = { title: '', list: [] },
  } = content;

  const handleItemClick = (item: string) => {
    onSetInput(item);
  };

  return (
    <div className="welcome">
      <section className="welcome-title">
        <Title level={4} style={{ margin: 0, color: 'inherit' }}>
          {title}
        </Title>
      </section>

      <section className="welcome-describe">
        <Paragraph style={{ margin: 0, color: 'inherit' }}>
          {describe}
        </Paragraph>
      </section>

      <section className="welcome-prompt">
        <div className="welcome-prompt-title">
          <Text type="secondary">{prompt.title}</Text>
        </div>
        <div className="welcome-prompt-list">
          <List
            split={false}
            dataSource={prompt.list}
            renderItem={(item) => (
              <List.Item style={{ padding: 0, marginBottom: 12 }}>
                <div
                  className="welcome-prompt-item"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </div>
              </List.Item>
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
