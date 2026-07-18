import { Client } from "ssh2";

export interface ExecuteSSHOptions {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
  command: string;
  timeout: number;
}

export interface ExecuteSSHResult {
  success: boolean;
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function executeSSH(
  options: ExecuteSSHOptions
): Promise<ExecuteSSHResult> {
  const conn = new Client();

  return new Promise<ExecuteSSHResult>((resolve, reject) => {
    const timeout = setTimeout(() => {
      conn.end();
      reject(new Error("SSH connection timed out"));
    }, options.timeout);

    conn.on("ready", () => {
      conn.exec(options.command, (err, stream) => {
        if (err) {
          clearTimeout(timeout);
          conn.end();
          return reject(err);
        }

        let stdout = "";
        let stderr = "";

        stream.on("data", (data: Buffer) => {
          stdout += data.toString();
        });

        stream.stderr.on("data", (data: Buffer) => {
          stderr += data.toString();
        });

        stream.on("close", (code: number | undefined) => {
          clearTimeout(timeout);
          conn.end();

          resolve({
            success: code === 0,
            exitCode: code ?? -1,
            stdout,
            stderr,
          });
        });
      });
    });

    conn.on("error", (err) => {
      clearTimeout(timeout);
      conn.end();
      reject(err);
    });

    const connectionConfig: {
      host: string;
      port: number;
      username: string;
      password?: string;
      privateKey?: string;
    } = {
      host: options.host,
      port: options.port,
      username: options.username,
    };

    if (options.password) {
      connectionConfig.password = options.password;
    } else if (options.privateKey) {
      connectionConfig.privateKey = options.privateKey;
    } else {
      clearTimeout(timeout);
      return reject(
        new Error("No SSH authentication method provided.")
      );
    }

    conn.connect(connectionConfig);
  });
}