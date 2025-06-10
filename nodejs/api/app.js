// Import the express library
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
  console.log("req-query", req.query);
  console.log("req-params", req.params);
  console.log("req-body", req.body);
  console.log("req-headers", req.headers);
  console.log("req-method", req.method);
  console.log("req-url", req.url);
  console.log("req-path", req.path);
  console.log("req-protocol", req.protocol);
  res.status(228).json({
    message: 'Server Works!',
    status: 'success'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 

