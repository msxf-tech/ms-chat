/**
 * query 用户输入管理开始
 * */
import { EventEmitter } from '../../event/index';
import {
  MsgInput,
  msgInputDefault,
  QUERY_ACTION_TYPE,
  PluginRegistration,
} from '../../model';
import { PluginSystem, createWrappedFunction } from '../pluginSystem';
export class MsgInputStore extends EventEmitter {
  private msgInput: MsgInput = { query: '' };
  private pluginSystem = new PluginSystem();
  constructor(plugins?: PluginRegistration[]) {
    super();
    plugins?.forEach((p) => this.pluginSystem.register(p));
    this.initialize();
  }
  setMsgInput(msgInput: MsgInput) {
    this.msgInput = { ...msgInput };
    this.emit(QUERY_ACTION_TYPE.SET, msgInput);
    console.log('setMsgInputsetMsgInput: 2', this.msgInput);
  }
  initMsgInput() {
    this.msgInput = { ...msgInputDefault };
    this.emit(QUERY_ACTION_TYPE.INIT);
  }
  getMsgInput(): MsgInput {
    // 可加敏感词过滤\xss过滤等
    this.emit(QUERY_ACTION_TYPE.GET, this.msgInput);
    return this.msgInput || '';
  }
  initialize() {
    // 劫持下 这四个事件做插件接入
    this.setMsgInput = createWrappedFunction(
      this.setMsgInput.bind(this),
      'setMsgInput',
      this.pluginSystem,
    );
  }
}
