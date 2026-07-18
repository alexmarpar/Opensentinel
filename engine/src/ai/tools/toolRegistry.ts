import { type Tool as AISDKTool } from "ai";

export class ToolRegistry {
  private tools = new Map<string, AISDKTool>();

  register(name: string, tool: AISDKTool) {
    this.tools.set(name, tool);
  }

  getTools() {
    return Object.fromEntries(this.tools);
  }
}