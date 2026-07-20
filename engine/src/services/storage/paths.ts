import envPaths from "env-paths";
import { join } from "path";

const paths = envPaths("OpenSentinel", { suffix: "" });

export const PATHS = {
  configDir: paths.config,
  dataDir: paths.data,

  configFile: join(paths.config, "config.json"),

  sshDir: join(paths.data, "ssh"),
  providers: join(paths.data, "providers"),
  sessionsDir: join(paths.data, "sessions"),
};