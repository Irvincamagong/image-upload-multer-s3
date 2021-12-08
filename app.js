const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const { extname } = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});

const { uploadFile } = require('./s3');

const upload = multer({ dest: 'uploads/' });

// Init Upload
const upload = multer({
    storage: storage, 
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    } 
});

// Check File Type
function checkFileType(file, cb){
    // Allowed Ext
    const filetypes = /jpeg|jpg|png|gif|jif/;
    // Check Ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true); 
    } else {
        cb('Error: Images Only!');
    }
};



// init app
const app = express();

// ejs 
app.set('view engine', 'ejs');

// public folder
//app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', upload.single('myImage'), async (req, res) => {   
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    console.log(result)
    const description = req.body.description     
    res.send("OKAY");
    upload(req, res, (err) => {
        if (err){
            res.render('index', {
                msg: err
            });
        } else {
           if(req.file == undefined){
            res.render('index', {
                msg: 'Error: No file selected!'
            });
           } else {
            res.render('index', {
                msg: 'File  Uploaded!', 
                file: `uploads/${req.file.filename}`
            });       
           }      
        }
    });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));