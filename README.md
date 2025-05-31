<h1 align="center">
  <img src="ASSETS/icon.png" alt="TermiChat Icon" height="50"> 
  <br>TermiChat
</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-green" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-WTFPL-orange" alt="License">
</p>
<div align="center">
  <h3>
    <strong>A unique terminal experience – a chat-style UI that runs real shell commands</strong>
  </h3>
  <h4>
    <em>Intuitive • Powerful • Cross-platform</em>
  </h4>
</div>
<p align="center">
  <a href="#-features"><b>🚀 Features</b></a> •
  <a href="#-installation"><b>📦 Installation</b></a> •
  <a href="#-example-usage"><b>💻 Examples</b></a> •
  <a href="#-contributing"><b>❤️ Contributing</b></a>
</p>
<hr>

<img align="right" src="ASSETS/icon.png" width="150">

## 💡 About TermiChat

Built with Electron, TermiChat executes your input using Node.js and displays responses like a messaging app. Commands like `cd`, `ls`, `node`, `brew`, `rpm`, and more work exactly as they would in your terminal.

> 🎯 Perfect for developers who want terminal power with chat comfort.

<hr>

## 🧠 How It Works
TermiChat uses a chat-like frontend to send shell commands to the backend via Electron's `ipcRenderer`.  
The main process executes the command in your system shell and sends the result back – just like a real terminal.

<hr>

## 🏗️ Architecture

TermiChat is built on a robust architecture that ensures security and performance:

```
┌─────────────────┐    IPC     ┌──────────────────┐
│   Renderer      │◄──────────►│   Main Process   │
│   Process       │            │                  │
│                 │            │                  │
│ • Chat UI       │            │ • Command Exec   │
│ • User Input    │            │ • Shell Interface│
│ • Display Logic │            │ • Error Handling │
└─────────────────┘            └──────────────────┘
                                        │
                                        ▼
                                ┌──────────────────┐
                                │   System Shell   │
                                │                  │
                                │ • bash/zsh/cmd   │
                                │ • Real Commands  │
                                │ • File System    │
                                └──────────────────┘
```

<hr>

## 🚀 Features

<table>
  <tr>
    <td width="200"><h3 align="center">✅</h3><h3 align="center"><b>Real Execution</b></h3></td>
    <td>Commands execute via <code>child_process</code> in the main process</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">💬</h3><h3 align="center"><b>Chat Interface</b></h3></td>
    <td>Modern messaging UI with avatars, timestamps, and typing indicators</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🕒</h3><h3 align="center"><b>Time Stamps</b></h3></td>
    <td>Built-in timestamps for every message and command</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🧠</h3><h3 align="center"><b>Async Handling</b></h3></td>
    <td>Asynchronous command processing with graceful error messages</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🖥️</h3><h3 align="center"><b>Electron UI</b></h3></td>
    <td>Cross-platform desktop app with SVG avatars and clean DOM structure</td>
  </tr>
</table>

<hr>

## 📦 Installation

### Download
Download the latest version under the [release section](https://github.com/nathanschmid08/TermiChat/releases)

### Or build from source:
```bash
# Clone the repository
git clone https://github.com/nathanschmid08/TermiChat.git
cd termichat

# Install dependencies
npm install

# Run the app
npm start
```

<hr>

## 💻 Example Usage

### Terminal Commands
```plaintext
👤 You: cd ~/Projects
💬 TermiChat: Wechsle zu ~/Projects

👤 You: ls
💬 TermiChat: index.js  node_modules/  README.md

👤 You: brew install neofetch
💬 TermiChat: 🍺 Installing neofetch...
```

<hr>

## 🔧 Technologies

<table>
  <tr>
    <td width="200"><h3 align="center">⚡</h3><h3 align="center"><b>Electron</b></h3></td>
    <td>Desktop shell framework</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🟢</h3><h3 align="center"><b>Node.js</b></h3></td>
    <td>Command execution via <code>child_process</code></td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🔄</h3><h3 align="center"><b>IPC</b></h3></td>
    <td>Communication between renderer and main process</td>
  </tr>
  <tr>
    <td width="200"><h3 align="center">🌐</h3><h3 align="center"><b>Web Tech</b></h3></td>
    <td>HTML/CSS/JS for frontend logic and chat UI</td>
  </tr>
</table>

<hr>

## ⚠️ Limitations

> **Security Notice:** Runs commands via the user's default shell (no emulation or sandboxing)

- Web search and command suggestions are not implemented yet
- Does not parse or format command output (raw stdout only)
- Windows support requires WSL or additional adjustments
- Some shell commands may require elevated privileges (e.g., `sudo`, `rpm`, `brew`)

<hr>

## 👋 Acknowledgements

Icons from [Font Awesome](https://fontawesome.com)  
Made by @nathanschmid08  
Inspired by the idea of combining **UX design** with **real system power**.

<hr>

## ❤️ Contributing

Pull requests are welcome! Help us improve the terminal experience, extend feature support, or fix bugs.

<div align="center">
  <p><i>© 2025 nathanschmid08</i></p>
</div>
