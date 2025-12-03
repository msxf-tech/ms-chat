import React, { useState, useEffect, useRef } from 'react';
import { Popover, Tooltip, Input } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import UploadComponent from './components/Upload/index';
import type { ISenderProps } from '../../types/index';
import './index.less';

const { TextArea } = Input;

const Sender: React.FC<ISenderProps> = (props) => {
  const {
    input,
    senderTop,
    senderHeader,
    senderFooter,
    onUpdateQuery,
    onSendMsg,
    onStopMsg,
    onUploadFiles,
  } = props;
  const [showUpload, setShowUpload] = useState(false);
  const [query, setQuery] = useState(input.query); // 1. 本地接管输入
  const composing = useRef(false);

  useEffect(() => {
    if (!composing.current) setQuery(input.query);
  }, [input.query]);

  const openUpload = () => setShowUpload(true);

  const handleComposition = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    composing.current = e.type !== 'compositionend';
    if (e.type === 'compositionend') onUpdateQuery?.(e.currentTarget.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (!composing.current) onUpdateQuery?.(v);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === 'Enter' && !e.shiftKey && !composing.current) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const handleSendMessage = () => {
    if (!query || input.disabled) return;
    onSendMsg?.(input.query);
  };

  const handleStopSend = () => {
    onStopMsg?.();
  };

  const popoverContent = (
    <div>
      <div>发送 Enter</div>
      <div>换行 Shift Enter</div>
    </div>
  );

  return (
    <div className="sender">
      {senderTop && <div className="sender-top">{senderTop}</div>}
      <div className="sender-textarea-wrap">
        {senderHeader && <div className="sender-header">{senderHeader}</div>}
        <TextArea
          className="sender-textarea"
          variant="borderless"
          autoSize={{ minRows: 1, maxRows: 5 }}
          disabled={input.disabled}
          value={query}
          placeholder={input.placeholder}
          maxLength={input.maxlength}
          onChange={handleInputChange}
          onCompositionStart={handleComposition}
          onCompositionUpdate={handleComposition}
          onCompositionEnd={handleComposition}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onFocus={input.onfocus}
        />
        {!input.hidden && (
          <div className="sender-pop">
            <Tooltip title="上传文件">
              <PaperClipOutlined
                style={{ fontSize: 20, color: '#bfbfbf', marginRight: 8 }}
                onClick={openUpload}
              />
            </Tooltip>
            <Popover content={popoverContent} placement="topLeft">
              {!input.pending ? (
                <div
                  className={`sender-pop-trigger ${
                    query ? 'sender-pop-trigger2' : ''
                  }`}
                  onClick={handleSendMessage}
                />
              ) : (
                <div className="sendBtnPending-wrap">
                  <div className="sendBtnPending" onClick={handleStopSend} />
                  <div className="sendBtnPending-bg" />
                </div>
              )}
            </Popover>
          </div>
        )}
        {senderFooter && <div className="sender-footer">{senderFooter}</div>}
      </div>
      <UploadComponent
        showUpload={showUpload}
        onUpdateShowUpload={setShowUpload}
        onUpload={onUploadFiles}
      />
    </div>
  );
};

export default Sender;
