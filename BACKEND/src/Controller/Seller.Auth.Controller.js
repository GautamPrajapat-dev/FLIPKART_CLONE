import SellerAuhSchema from '../Schema/Seller.Auth.Schema.js';
import asyncHandler from '../Utils/asyncHandler.js';
import sendMail from '../Utils/sendMail.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import errorHandler from '../Middleware/error.MiddkerWare.js';

const SellerAuthController = {
    getSellerDetails: asyncHandler(async (req, res) => {
        res.status(200).json({
            id: res.Seller.sellerId
        });
    }),
    getAllDetails: asyncHandler(async (req, res) => {
        const user = await SellerAuhSchema.findById(
            { _id: res.Seller.sellerId },
            {
                password: 0,
                __v: 0,
                gstNum: 0,
                resetoken: 0,
                _id: 0,
                // bussinessDetail: { panNum: 0 },
                createdAt: 0,
                updatedAt: 0
            }
        );
        if (!user) {
            res.status(400).json({
                status: false,
                errorMessage: 'User not found'
            });
        }
        res.status(200).json({
            status: true,
            user
        });
    }),

    registerSeller: asyncHandler(async (req, res) => {
        const details = req.body;
        // check seller exits first
        const isUserExist = await SellerAuhSchema.findOne({
            email: { $regex: `^${details.email}$`, $options: 'i' }
        });
        const MobileExist = await SellerAuhSchema.findOne({
            mobile: { $regex: `^${details.mobile}$`, $options: 'i' }
        });

        // if user not existing
        if (isUserExist || MobileExist) {
            res.json({ status: false, errorMessage: 'User Already Exist' });
        } else {
            const seller = await SellerAuhSchema({
                fname: details.firstname,
                lname: details.surname,
                fullname: details.firstname + ' ' + details.surname,
                email: details.email,
                mobile: details.mobile,
                gstNum: details.gstNum,
                password: details.password,
                fullAddress: details.fullAddress
            });

            if (seller) {
                // save user to database
                await seller.save();
                res.status(201).json({
                    status: true,
                    successMessage: 'Sucessfully create'
                });
            } else {
                res.status(400).json({
                    status: false,
                    errorMessage: 'user create Unsucessfull'
                });
            }
        }
    }),
    loginSeller: asyncHandler(async (req, res) => {
        const data = req.body;

        // check user exits first
        const isUserEmail = await SellerAuhSchema.findOne({
            email: { $regex: `^${data.emailPhone}$`, $options: 'i' }
        });
        const isUserMobile = await SellerAuhSchema.findOne({
            mobile: { $regex: `^${data.emailPhone}$`, $options: 'i' }
        });
        const isUser = isUserEmail || isUserMobile;

        // if user not existing
        if (!isUser) {
            res.status(403).json({
                status: false,
                errorMessage: 'Invalid Seller Email Or Password'
            });
            return false;
        }

        // match password
        const comapre = await isUser.comparePassword(data.password);
        if (!comapre) {
            return res.status(403).json({
                status: false,
                errorMessage: 'invalid Credentials'
            });
        }
        const user = await SellerAuhSchema.findOne(
            {
                _id: isUser._id
            },
            { password: 0 }
        );
        const token = await user.genToken();
        if (user) {
            // user login sucessfull user login
            res.status(200).json({
                status: true,
                successMessage: 'Login Sucessfully',
                _token__: token
            });
        } else {
            res.status(403).json({
                status: false,
                errorMessage: 'Invalid Credentials'
            });
        }
    }),

    // update user credentials
    updateUserDetails: asyncHandler(async (req, res, next) => {
        const seller = req.body;

        const id = res.Seller.sellerId;
        if (!id) {
            return next(errorHandler(403, 'seller details cnnot be updated', res));
            // return res.status(403).json({
            //   status: false,
            //   errorMessage: "seller details cnnot be updated",
            // });
        }
        // update seller details from client side
        const updateDetails = await SellerAuhSchema.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    fname: seller.firstname,
                    lname: seller.surname,
                    fullname: seller.firstname + ' ' + seller.surname,
                    email: seller.email,
                    mobile: seller.mobile,
                    fullAddress: seller.fullAddress,
                    bussinessDetail: seller.bussinessDetail
                }
            },
            { new: true }
        );
        // check seller update or not updated
        if (updateDetails) {
            res.status(201).json({
                status: true,
                path: req.path,
                successMessage: 'seller details updated successfully'
            });
        } else {
            res.status(400).json({
                status: false,
                errorMessage: 'seller details Unsucessfull updated'
            });
        }
    }),
    // change Seller password
    changeSellerPassword: asyncHandler(async (req, res) => {
        const usrDetail = req.body;

        //if check user pervious password same or different
        if (usrDetail.oldpassword === usrDetail.newpassword) {
            return res.json({
                status: false,
                errorMessage: 'old password has been matched'
            });
        }
        const user = await SellerAuhSchema.findOne({
            email: { $regex: `^${res.Seller.email}$`, $options: 'i' }
        });
        // compare user password
        const comapre = await user.comparePassword(usrDetail.oldpassword);
        // check password true or false

        if (!comapre) {
            return res.status(403).json({
                status: false,
                errorMessage: 'Your old password is incorrected.'
            });
        }

        // user find
        if (user) {
            return res.status(304).json({
                status: false,
                errorMessage: 'User Not Found'
            });
        }
        // encrypt password for send db
        const hash_password = await user.generatePassword(usrDetail.newpassword);

        // update password
        const updatPass = await SellerAuhSchema.updateOne(
            { _id: user._id },
            {
                $set: { password: hash_password }
            },
            { new: true }
        );
        if (updatPass) {
            // sending sucess response
            res.status(200).json({
                status: true,
                successMessage: 'Password has been changed'
            });
        } else {
            res.status(304).json({
                status: false,
                errorMessage: 'Failed To Change Password'
            });
        }
    }),
    // forget password token gererate from request
    forgetpassword: asyncHandler(async (req, res) => {
        const data = req.body;

        // generate randome string for rest password request
        const rendomStr = crypto.randomBytes(16).toString('hex');

        const token = jwt.sign({ rendomStr }, process.env.SECRET_KEY, {
            expiresIn: 2 * 60
        });

        const seller = await SellerAuhSchema.findOneAndUpdate(
            {
                email: { $regex: `^${data.email}$`, $options: 'i' }
            },
            { $set: { resetoken: token } },
            {
                new: true
            }
        );

        if (!seller) {
            return res.status(400).json({
                status: false,
                errorMessage: `Email Was InValid, Please Confirm your Email`
            });
        }
        await sendMail(
            seller.email,
            'Reset Your Password',
            `<div style='background-color: powderblue'>
      <h1>Rest Password to Clikd the link below</h1>
      <a style="color:blue;" href="http://localhost:5173/seller/reset-password/?uid=${seller._id}&resetuid=${token}">Reset Your Password</a>
      </div>`
        );

        res.status(200).json({
            status: true,
            token: token,
            successMessage: `Email has beed sent on ${seller.email}`
        });
    }),
    passwordReset: asyncHandler(async (req, res) => {
        const detail = req.query;
        const pass = req.body;

        // if (!pass.npassword || !pass.cpassword) {
        //   return res.json({
        //     status: false,
        //     errorMessage: "please enter your new password",
        //   });
        // }

        // if (pass.npassword !== pass.cpassword) {
        //   return res.json({
        //     status: false,
        //     errorMessage: "password does not match",
        //   });
        // }
        const checkPassword = await SellerAuhSchema.findOne({ _id: detail.uid });
        const npass = await checkPassword.comparePassword(pass.npassword);

        if (npass) {
            return res.status(409).json({
                status: false,
                errorMessage: 'old password are not allowed'
            });
        }
        const token = jwt.verify(checkPassword.resetoken, process.env.SECRET_KEY, async (err) => {
            if (err) {
                const check = await SellerAuhSchema.findOneAndUpdate(
                    { resetoken: { $regex: `^${detail.resetuid}$`, $options: 'i' } },
                    {
                        $set: {
                            resetoken: ''
                        }
                    },
                    { new: true }
                );
                if (check) {
                    res.json({
                        status: false,
                        errorMessage: 'Rest Token Has Been Expired'
                    });
                }
            }
        });

        if (checkPassword.resetoken !== '') {
            const npass = await bcrypt.hash(pass.npassword, 10);
            const user = await SellerAuhSchema.updateOne(
                { resetoken: { $regex: `^${detail.resetuid}$`, $options: 'i' } },
                {
                    $set: {
                        password: npass,
                        resetoken: ''
                    }
                },
                { new: true }
            );
            if (user) {
                res.status(200).json({
                    status: true,
                    successMessage: 'Your Password Has been reset'
                });
            } else {
                res.status(403).json({
                    status: true,
                    errorMessage: 'Your Password Not Be Reseted'
                });
            }
        } else {
            res.status(401).json({
                errorMessage: 'reset token has been expired'
            });
        }
    }),
    // profile picture link generate for ther user
    uploadAvatar: asyncHandler(async (req, res) => {
        // get image file path

        // user id get
        const sellerID = res.Seller.sellerId;

        // is file true
        if (req.file === undefined || !req.file) {
            res.status(400).json({
                status: false,
                errorMessage: 'please upload avatar form user file'
            });
        } else {
            const file = req.file.path;
            // fined user id from user authontication
            const userfind = await SellerAuhSchema.findById({ _id: sellerID });
            // check avatar true or false
            if (userfind.avatar) {
                // if user path not undifined. we delete pervious avatar from db and claudinary
                if (userfind.avatar.path !== undefined) {
                    // we using destroy methods
                    const deleteAvatar = await cloudinary.uploader.destroy(userfind.avatar.public_id);
                    // if coludinary destroy avatar to cloudinary delete it from mongodb database
                    if (deleteAvatar) {
                        userfind.avatar = '';
                        await userfind.save();
                    }
                }
            }
            // user find or not
            if (userfind) {
                // upload avatar on cloudinary using uploader method and save in public/avatar folder
                const fileupload = await cloudinary.uploader.upload(file, {
                    folder: 'seller/avatar',
                    resource_type: 'image'
                });
                //conver image to avatar using url and transformation method in caludinary
                const image = cloudinary.url(fileupload.public_id, {
                    transformation: [
                        {
                            gravity: 'auto:body',
                            radius: 'max',
                            quality: 'auto',
                            width: 240,
                            height: 240,
                            crop: 'fill'
                        },
                        { background: '#00000000' }
                    ]
                });
                // if avatar upload check succes or not
                if (fileupload) {
                    // update avatar in mongodb database
                    const avatarUpload = await SellerAuhSchema.updateOne(
                        { _id: sellerID },
                        {
                            $set: {
                                avatar: {
                                    public_id: fileupload.public_id,
                                    path: image
                                }
                            }
                        },
                        { new: true }
                    );
                    // send status in client for success
                    if (avatarUpload) {
                        res.status(200).json({
                            status: true,
                            successMessage: 'uploaded'
                        });
                    }
                }
            } else {
                res.status(400).json({
                    status: false,
                    errorMessage: 'user not logged in please logged in '
                });
            }
        }

        //   "file": {
        //     "asset_id": "216528fda06f7c864f018cf8ccab9c62",
        //     "public_id": "public/avatar/pvu7lcs58l3kye4nua8f",
        //     "version": 1709473280,
        //     "version_id": "c0bcd31b58c37b90e4707ed7554e121c",
        //     "signature": "ab4e83e28edf4b3dab540412caa3d7c347c16116",
        //     "width": 400,
        //     "height": 617,
        //     "format": "png",
        //     "resource_type": "image",
        //     "created_at": "2024-03-03T13:41:20Z",
        //     "tags": [],
        //     "bytes": 351713,
        //     "type": "upload",
        //     "etag": "c4a2e070241486b612e2470e5b3073f5",
        //     "placeholder": false,
        //     "url": "http://res.cloudinary.com/dhgxia9u7/image/upload/v1709473280/public/avatar/pvu7lcs58l3kye4nua8f.png",
        //     "secure_url": "https://res.cloudinary.com/dhgxia9u7/image/upload/v1709473280/public/avatar/pvu7lcs58l3kye4nua8f.png",
        //     "folder": "public/avatar",
        //     "original_filename": "woman",
        //     "api_key": "586169286421356"
        // },
    })
};
export default SellerAuthController;
