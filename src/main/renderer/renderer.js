const fs = require('fs');
const os = require('os');
const terminal = document.getElementById('terminal');
const input = document.getElementById('command');

let todos = [];
let logs = [];
let history = [];
let historyIndex = -1;

const username = os.userInfo().username || 'user';
const hostname = os.hostname() || 'machine';
const getPrompt = () => `${username}@${hostname}:${process.cwd()}$`;

const commands = {
  help: () => `Available commands:
- help
- todo add <task>
- todo list
- todo clear
- timer <seconds>
- focus <minutes>
- log <message>
- log list
- clear`,

  clear: () => {
    terminal.innerHTML = '';
    return '';
  },

  todo: (args) => {
    const [sub, ...rest] = args;
    if (sub === 'add') {
      const task = rest.join(' ');
      if (task) {
        todos.push(task);
        return `Added task: ${task}`;
      } else return 'Usage: todo add <task>';
    }
    if (sub === 'list') {
      return todos.length ? todos.map((t, i) => `${i + 1}. ${t}`).join('\n') : 'No tasks.';
    }
    if (sub === 'clear') {
      todos = [];
      return 'Todo list cleared.';
    }
    return 'Usage: todo [add|list|clear]';
  },

  timer: (args) => {
    const seconds = parseInt(args[0]);
    if (!seconds || isNaN(seconds)) return 'Usage: timer <seconds>';
    setTimeout(() => {
      alert('⏰ Timer done!');
    }, seconds * 1000);
    return `Timer set for ${seconds} seconds.`;
  },

  focus: (args) => {
    const minutes = parseInt(args[0]);
    if (!minutes || isNaN(minutes)) return 'Usage: focus <minutes>';
    setTimeout(() => {
      alert('🍅 Focus session complete! Take a break.');
    }, minutes * 60000);
    return `Focus timer started for ${minutes} minutes.`;
  },

  log: (args) => {
    if (args[0] === 'list') {
      return logs.length ? logs.map((l, i) => `${i + 1}. ${l}`).join('\n') : 'No log entries.';
    }
    const entry = args.join(' ');
    if (!entry) return 'Usage: log <message> or log list';
    logs.push(entry);
    return `Log added.`;
  }
};

function printLine(text = '') {
  const line = document.createElement('div');
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function runCommand(line) {
  const [cmd, ...args] = line.trim().split(' ');
  const handler = commands[cmd];
  const output = handler ? handler(args) : `Command not found: ${cmd}`;
  printLine(`${getPrompt()} ${line}`);
  if (output) printLine(output);
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const commandText = input.value.trim();
    if (commandText !== '') {
      history.push(commandText);
      historyIndex = history.length;
      runCommand(commandText);
      input.value = '';
    }
  }

  if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = '';
    }
    e.preventDefault();
  }
});

printLine(`${getPrompt()}`);
