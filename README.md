# Opensentinel
<p align="center">
  <h2> Don't install more, only plug it </h1>
</p>

An AI-powered agent that helps in manage devices and automates quickly via SSH.
## Requirements
* [pnpm](https://pnpm.io/installation) 
* [bun](https://bun.com/docs/installation)
## Install

### Docker installation 
<p align="center">
<img src="./assets/images/docker-icon.svg" width="200">
</p>

Download the release and in the root;
Execute 
```
docker compose up -d
```
After that, enter in [http://localhost:4173](http://localhost:4173/)

### Manually installation

#### 1. Download the source code in Releases
#### 2. Enter in ```/client``` directory and execute the following commands:
```bash
pnpm install
pnpm dev
```
#### 3. Enter in ```/engine``` directory and execute the following commands:
```
bun install
bun dev
```
Now you can enter in [http://localhost:5173](http://localhost:5173) and start manage your remote machine with the agent.

Note: You have to set in your message the password of the user.
``The password is x``

Actual AI providers avaliable: 
```
openrouter
ollama
openai
googleaistudio
```
You can configure your API keys in these providers.
