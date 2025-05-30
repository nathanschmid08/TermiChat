# TermiChat

**TermiChat** is a unique terminal experience – a chat-style UI that runs real shell commands.  
Built with Electron, it executes your input using Node.js and displays responses like a messaging app.  
Commands like `cd`, `ls`, `node`, `brew`, `rpm`, and more work exactly as they would in your terminal.

---

## 🧠 How It Works

TermiChat uses a chat-like frontend to send shell commands to the backend via Electron's `ipcRenderer`.  
The main process executes the command in your system shell and sends the result back – just like a real terminal.

---

## 🚀 Features

- ✅ **Real command execution** via `child_process` in the main process
- 💬 **Chat-style interface** with avatars, timestamps, and typing indicators
- 🕒 **Built-in time stamps** for every message
- 🧠 **Asynchronous command handling** with graceful error messages
- 🖥️ **Electron-based UI** with SVG avatars and clean DOM structure

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/termichat.git
cd termichat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

---

## 💻 Example Usage

```plaintext
👤 You: cd Documents
🤖 TermiChat: 📂 Changed directory to Documents

👤 You: ls
🤖 TermiChat: resume.pdf  notes.txt  termichat/

👤 You: node -v
🤖 TermiChat: v20.11.1

👤 You: brew install neofetch
🤖 TermiChat: 🍺 Installing neofetch...

👤 You: sudo dnf install htop
🤖 TermiChat: [sudo] password for user:
```

---

## 🔧 Technologies

- **Electron** – Desktop shell
- **Node.js** – Command execution (via `child_process`)
- **IPC** – Communication between renderer and main process
- **HTML/CSS/JS** – Frontend logic and chat UI

---

## ⚠️ Limitations

- Runs commands via the user's default shell (no emulation or sandboxing)
- Web search and command suggestions are not implemented yet
- Does not parse or format command output (raw stdout only)

---

## 🧪 Known Issues

- Windows support requires WSL or additional adjustments
- Some shell commands may require elevated privileges (e.g., `sudo`, `rpm`, `brew`)

---

## 📄 License

MIT License – free to use, modify, and distribute.

---

## 🤝 Contributing

Pull requests are welcome! Just make sure your code:
- Works on at least macOS and Linux
- Doesn’t break the chat-style UI
- Is written cleanly and clearly commented

---

## 👋 Acknowledgements

Icons from [Font Awesome](https://fontawesome.com)  
Made by @nathanschmid08  
Inspired by the idea of combining **UX design** with **real system power**.