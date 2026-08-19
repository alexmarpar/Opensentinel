---
title: OpenSentinel Documentation
description: Documentation for OpenSentinel.
---

# OpenSentinel

SSH agent for execute bash commands over remote device via SSH.

## 1 Getting Started
Download the requirements: [pnpm](https://pnpm.io/installation) and [bun](https://bun.com/docs/installation)

### 1.1 Install OpenSentinel via Docker (Recommended)
1. Download the latest release in the [repository](https://github.com/alexmarpar/Opensentinel/releases)

2. Enter in the repository and execute
```bash
docker compose up -d
```
3. Once the images are running enter in http://localhost:4173/

### 1.2 Install OpenSentinel native
Use this commands
```
git clone https://github.com/alexmarpar/opensentinel.git

cd opensentinel

cd client 

pnpm install

pnpm dev

cd ..

cd engine

bun install

bun dev

```
Once the two services are running enter in your browser in http://localhost:5173