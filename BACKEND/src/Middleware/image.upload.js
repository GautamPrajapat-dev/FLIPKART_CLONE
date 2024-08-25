import multer from 'multer'

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, file.originalname)
        } else {
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err, file.originalname)
        }
    }
})

const upload = multer({
    storage
})

const noUpload = multer.noUpload

export { upload, noUpload }
