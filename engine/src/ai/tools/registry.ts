import { ToolRegistry } from "./toolRegistry";
import { bashTool } from "./tools/bash";
import { createSaveSSHCredentialsTool } from "./tools/saveSSHCredentials";
import { createSshTool } from "./tools/ssh";

export function createRegistryForSession(session: String) {
  const registry = new ToolRegistry();
  
  registry.register("ssh", createSshTool(session));
  registry.register("saveSSHCredentials", createSaveSSHCredentialsTool(session));
  registry.register("bash", bashTool);
  return registry;
}