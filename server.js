const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
// Connect database
connectDB();

// Adding Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(cors(corsOptions))
// EJS Template for 'download' page
app.use(express.static('public'))   // telling Express to consider rendering static files like CSS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// //

app.get('/', (req, res) => res.send('API Running...'));





// Routes   first parameter is the requested url.......second parameter is the path of file which it will render now.
app.use('/api/files',require('./routes/files')); 

// endpoint for generating shareable URL link
// URL will be like:    ->  mainurl/files/uuid
app.use('/files', require('./routes/show'));
//
app.use('/files/download',require('./routes/download'));


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


