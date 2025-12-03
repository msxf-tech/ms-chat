import React, { useMemo } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import type { IMarkdownCardProps } from '../../../../types/index';

const MarkdownCard: React.FC<IMarkdownCardProps> = (props) => {
  const { content, bubbleCardMdExt } = props;
  const contentArray = useMemo(() => {
    if (!content) return [];
    return Array.isArray(content) ? content : [{ content }];
  }, [content]);

  return (
    <div className="chat-bubble-content-markdown">
      {contentArray.map((item, idx) => (
        <div key={idx}>
          {item.type && bubbleCardMdExt ? (
            bubbleCardMdExt(props)
          ) : (
            <MarkdownPreview
              source={item.content}
              style={{
                backgroundColor: 'transparent',
                padding: 0,
                fontSize: '14px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MarkdownCard;
