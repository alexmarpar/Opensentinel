import { ToolRegistry } from "./toolRegistry";
import { bashTool } from "./tools/bash";
import { sshTool } from "./tools/ssh";

export const registry = new ToolRegistry();

registry.register("ssh", sshTool);