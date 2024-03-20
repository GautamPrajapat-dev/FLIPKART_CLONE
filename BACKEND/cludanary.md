import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
cloud_name: 'dhgxia9u7',
api_key: '586169286421356',
api_secret: 'eXG3PAtWZXSOqRk6RsDzrXA3o6k'
});

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
{ public_id: "olympic_flag" },
function(error, result) {console.log(result); });

<!-- transform -->

type r_max,w_300,h_300,c_auto

cloudinary.image("woman-blackdress-stairs.png", {transformation: [
{gravity: "face", height: 200, width: 200, crop: "thumb"},
{radius: "max"},
{fetch_format: "auto"}
]})

// Transform
const url = cloudinary.url("olympic_flag", {
width: 100,
height: 150,
crop: 'fill'
});

<!-- optimaisation deliver -->

Optimize Your Media

Apply optimizations automatically by specifying <b>f*auto</b> for automatic format, q_auto for automatic quality and c_scale,w* for simple scaling of your images. When the URL is first accessed, a derived asset is generated and cached on multiple CDNs so that it is delivered to your users from a location that is in the best proximity.

Delivery URL Example

https://res.cloudinary.com/freshpm/image/upload/c_scale,w_500/f_auto/q_auto/samples/bike.jpg
URL Endpoint /Optimization /Public Id

<!-- ! destroy image  -->

const deleteAvatar = await cloudinary.uploader.destroy(
userfind.avatar.public_id
);

<!-- ! inspet mode in claudanary -->

cloudinary.v2.uploader
.upload('WhatsApp Image 2024-03-03 at 13.47.47_0b87f8b0.jpg', {
folder: 'user',
resource_type: 'image'})
.then(console.log);

cloudinary.v2.api
.create_folder('user/avtar')
.then(console.log);

cloudinary.v2.uploader
.upload('lgo.png', {
folder: 'user/avtar',
resource_type: 'image'})
.then(console.log);

<!-- how to upload image avtar in multer -->

const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const diskStorage = multer.diskStorage({  
 destination: (req, file, cb) => {
cb(null, 'imagens');
},
filename: (req, file, cb) => {
cb(null, Date.now() + shortid.generate() + path.extname(file.originalname));
}
});

const upload = multer({
storage: diskStorage,
limits: {
fileSize: 1 _ 1024 _ 1024 // 1Mb
},
fileFilter: (req, file, cb) => {
const acceptedExtensionsList = [".jpg", ".jpeg", ".png"];
const extname = path.extname(file.originalname).toLowerCase();
if (acceptedExtensionsList.includes(extname)) {
cb(null, true); // Accept the file
} else {
cb(new Error("Invalid file extension"));
}
}
});

// Error handler middleware for Multer errors
const errorHandler = (err, req, res, next) => {
if (err instanceof multer.MulterError) {
// Multer error occurred (e.g., file size limit exceeded)
return res.status(400).json({ error: "File upload error: " + err.message });
} else if (err.code === "LIMIT_FILE_SIZE") {
// File size limit exceeded
return res.status(400).json({ error: "File size limit exceeded. Max file size is 1MB." });
} else {
// Other errors
return res.status(500).json({ error: "Internal server error" });
}
};

router.post("/criarconta", upload.fields([{ name: "photos" }]), async (req, res) => {
var files = [];

if (req.files) {
files = req.files.photos;  
 }

if (files.length > 1) {
return res.status(400).json({ erro: "Não é permitido o upload de mais de 1 imagem!" });
}

let photos = [];

if (files && files.length > 0) {
files.forEach((photo, i) => {
photos[i] = photo.path;
});
}

return res.status(200).json({ erro: null, foto: photos });
});
