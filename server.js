const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = 3000;

let notes = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  const hostname = os.hostname();

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Task Notes</title>
      <style>
        body {
          font-family: Arial;
          max-width: 600px;
          margin: 40px auto;
        }
        input {
          padding: 10px;
          width: 70%;
        }
        button {
          padding: 10px;
        }
        .box {
          background: #f2f2f2;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>

      <h2>Task Notes App</h2>

      <div class="box">
        <strong>Served by:</strong> ${hostname}
      </div>

      <input id="noteInput" placeholder="Enter note"/>
      <button onclick="addNote()">Add</button>

      <ul id="notesList"></ul>

      <script>
        async function loadNotes() {
          const res = await fetch('/notes');
          const data = await res.json();
          const list = document.getElementById('notesList');
          list.innerHTML = '';

          data.forEach(n => {
            const li = document.createElement('li');
            li.textContent = n.text;
            list.appendChild(li);
          });
        }

        async function addNote() {
          const input = document.getElementById('noteInput');

          await fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input.value })
          });

          input.value = '';
          loadNotes();
        }

        loadNotes();
      </script>

    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const { text } = req.body;
  notes.push({ text });
  res.json({ success: true });
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
