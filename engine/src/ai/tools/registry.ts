import { ToolRegistry } from "./toolRegistry";
import { bashTool } from "./tools/bash";
import { createSshTool } from "./tools/ssh";

export function createRegistryForSession(session: String) {
  const registry = new ToolRegistry();
  
  registry.register("bash", bashTool);
  registry.register("ssh", createSshTool(session));

  return registry;
}