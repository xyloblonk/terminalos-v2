# TerminalOS (2025)

A lightweight, Linux-style terminal emulator built with Electron and Node.js.  
Run custom commands like `todo`, `timer`, `focus`, and `log` inside a slick shell interface with a realistic prompt and command history.

## Features

- Classic Linux-style prompt (`user@machine:~$`)
- Command history navigation with arrow keys
- Custom commands:
  - `help` — List available commands
  - `todo add <task>` — Add a task to your todo list
  - `todo list` — Show your todo tasks
  - `todo clear` — Clear your todo list
  - `timer <seconds>` — Set a timer
  - `focus <minutes>` — Pomodoro-style focus timer
  - `log <message>` — Add a log entry
  - `log list` — View all log entries
  - `clear` — Clear the terminal output
- Simple, clean, green-on-black terminal UI

## Installation

1. Clone the repo:

```bash
   git clone https://github.com/xyloblonk/terminalos-v2.git
   cd terminalos-v2
```

2. Install dependencies:
```bash
npm install
```

3. Run the app:
```
npm start
```

### Usage
- Type commands in the input at the bottom.
- Navigate previous commands with ↑ and ↓ arrow keys.
- Get help with the help command.
- Try managing your todo list and logs or set timers and focus sessions.

### Development
This app uses Electron to run a Node.js backend alongside a web-based UI.
Feel free to extend commands or improve UI/UX!
