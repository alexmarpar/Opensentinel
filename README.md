# Opensentinel
<p align="center">
  <h2> Don't install more, only plug it </h1>
</p>

An AI-powered agent that helps in manage devices and automates quickly via SSH.
## Requirements
* [pnpm](https://pnpm.io/installation) 
* [bun](https://bun.com/docs/installation)
## Install (for all users)

### 1. Download the source code in Releases
### 2. Enter in ```/client``` directory and execute the following commands:
```bash
pnpm install
pnpm dev
```
### 3. Enter in ```/engine``` directory and execute the following commands:
```
bun install
bun dev
```
Now you can enter in [http://localhost:5173](http://localhost:5173) and start manage your remote machine with the agent.

## Docker support
<p align="center">
  <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/34c22501f9ac9f22b12f825677ccbab1fb22e14b/icons/docker.svg" alt="Docker image" width="150">
</p>

Download the directory and in the root;
Execute 
```
docker compose up -d
```
After that, enter in [http://localhost:4173](http://localhost:4173/)

Important note: Docker support doesn't have persistence of ssh devices, sessions and providers. This will be corrected in later versions! and this note will be removed. 