class ChatConfig {
  provider: string;
  model: string;
  constructor(provider: string, model: string) {
    this.provider = provider;
    this.model = model;
  }
}
export default ChatConfig;