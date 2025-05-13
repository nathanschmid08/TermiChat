const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('commandInput');
  const output = document.getElementById('output');

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      output.innerHTML += `\n> ${command}\n`;
      input.value = '';

      const result = await ipcRenderer.invoke('run-command', command);
      output.innerHTML += result + '\n';
      output.scrollTop = output.scrollHeight;
    }
  });
});
