---
title: Start using OpenSentinel 
description: Dashboard panel and SSH panel
---

Once the AI provider is succesful configured you can start writing messages in the chat panel.

### 1 create a SSH configuration for the remote device in SSH panel
Select the **Device Name** as you like, **IP address** in vanilla format (x.x.x.x), **port 22** (SSH if you don't have changed) and **username** of the machine.

Once you have completed your configuration will have saved in your current machine

### 2 Start using the Chat
You can write the first message once you have selected the AI provider.
If you want execute actions over the remote machine that have you saved you can write a message like this
```
Create a python script in <Device Name>. The password is 1234

```
You have to **mention** the password of the Device Name because the agent will need it for **establish** a SSH session

And with this you can start using OpenSentinel.