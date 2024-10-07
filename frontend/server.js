const express=require('express');
const path = require('path')
const app = express();
app.use(express.static(__dirname+'/dist/frontend/browser'));
app.get('/*',function (req, res)
{res.sendFile(path.join(__dirname+'/dist/frontend/browser/index.html'));})
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});