export default function parseSSHKey(key: string) {
  const isPrivate = key.includes("BEGIN OPENSSH PRIVATE KEY");
  const isPublic =
    key.startsWith("ssh-ed25519") ||
    key.startsWith("ssh-rsa");

  if (isPrivate) {
    return {
      type: "private",
      algorithm: "openssh",
      filename: "private_key"
    };
  }

  if (isPublic) {
  const algorithm = key.split(" ")[0];

  return {
    type: "public",
    algorithm,
    filename:
      algorithm === "ssh-rsa"
        ? "id_rsa.pub"
        : "id_ed25519.pub"
  };
}

  throw new Error("Invalid SSH key format");
}
