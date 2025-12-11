import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import './index.less';

export interface DraggableContainerProps {
  mode: 'pc' | 'h5';
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 是否启用拖拽功能 */
  draggable?: boolean;
  /** 初始位置 */
  initialPosition?: { x: number; y: number };
  /** 初始尺寸 */
  initialSize?: { width: number; height: number };
  /** 最小尺寸 */
  minSize?: { width: number; height: number };
  /** 最大尺寸 */
  maxSize?: { width: number; height: number };
  /** 拖拽边界，例如 'parent' 或选择器字符串 */
  bounds?: string | undefined;
  /** 子组件 */
  children: ReactNode;
  /** 是否禁用缩放 */
  disableResizing?: boolean;
  /** 是否显示关闭按钮 */
  showCloseButton?: boolean;
  /** 拖拽停止回调 */
  onDragStop?: (position: { x: number; y: number }) => void;
  /** 缩放停止回调 */
  onResizeStop?: (
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => void;
  /** 关闭按钮点击事件 */
  onClose?: () => void;
}

const defaultH5Size = { width: 375, height: 667 };
const defaultPCSize = { width: 1000, height: 800 };

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  mode = 'h5',
  className = '',
  style,
  draggable = true,
  initialPosition = { x: 0, y: 0 },
  initialSize,
  minSize = { width: 300, height: 500 },
  maxSize,
  bounds = undefined,
  children,
  disableResizing = false,
  showCloseButton = false,
  onDragStop,
  onResizeStop,
  onClose,
}) => {
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);

  let defaultSize = initialSize;
  if (!initialSize) {
    defaultSize = mode === 'h5' ? defaultH5Size : defaultPCSize;
  }
  const [size, setSize] = useState(defaultSize);
  const [bodyHeight, setBodyHeight] = useState('');

  const countBodyHeight = async () => {
    const dragHandleHeight = dragHandleRef.current?.clientHeight ?? 41;
    setBodyHeight(`100% - ${Number(dragHandleHeight)}px`);
  };

  const handleDragStop: RndDragCallback = useCallback(
    (_e, d) => {
      setPosition({ x: d.x, y: d.y });
      onDragStop?.({ x: d.x, y: d.y });
    },
    [onDragStop]
  );

  const handleResizeStop: RndResizeCallback = useCallback(
    (_e, _direction, ref, _delta, position) => {
      const newSize = { width: ref.offsetWidth, height: ref.offsetHeight };
      setSize(newSize);
      setPosition(position);
      onResizeStop?.(newSize, position);
    },
    [onResizeStop]
  );

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    countBodyHeight();
  }, []);

  return (
    <Rnd
      className={`draggable-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      size={size}
      position={position}
      minWidth={minSize.width}
      minHeight={minSize.height}
      maxWidth={maxSize?.width}
      maxHeight={maxSize?.height}
      bounds={bounds}
      disableDragging={!draggable}
      enableResizing={!disableResizing && draggable}
      dragHandleClassName="drag-handle"
      resizeHandleClasses={{
        bottom: 'resize-handle',
        bottomLeft: 'resize-handle',
        bottomRight: 'resize-handle',
        left: 'resize-handle',
        right: 'resize-handle',
        top: 'resize-handle',
        topLeft: 'resize-handle',
        topRight: 'resize-handle',
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <div className="drag-handle" ref={dragHandleRef}>
        <MenuOutlined className="drag-handle-icon" />
        <span className="drag-handle-text">拖拽这里</span>
      </div>
      {showCloseButton && (
        <span className="close-btn" onClick={handleClose} aria-label="关闭">
          <CloseOutlined style={{ fontSize: '16px' }} />
        </span>
      )}
      <div style={{ height: `calc(${bodyHeight})` }}>{children}</div>
    </Rnd>
  );
};

export default DraggableContainer;
