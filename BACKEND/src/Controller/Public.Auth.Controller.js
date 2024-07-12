const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const PublicAuthSchema = require("../Schema/Public.Auth.Schema");
const sendMail = require("../Utils/sendMail");
const asyncHandler = require("../Utils/asyncHandler");

const cloudinary = require("cloudinary").v2;

const PublicAuthController = {
  userId: asyncHandler(async (req, res) => {
    res.status(200).json({ id: res.user.userId });
  }),
  userDetails: asyncHandler(async (req, res) => {
    const user = await PublicAuthSchema.findById(
      { _id: res.user.userId },
      {
        password: 0,
        resetoken: 0,
        updatedAt: 0,
        avatar: {
          public_id: 0,
        },
      }
    );
    res.status(200).json({
      status: true,
      user,
    });
  }),
  // Register Users
  signUp: asyncHandler(async (req, res) => {
    const data = req.body;

    // check user type empty string or not

    // check user exits first
    const isUserExist = await PublicAuthSchema.findOne({
      email: { $regex: `^${data.email}$`, $options: "i" },
    });
    const MobileExist = await PublicAuthSchema.findOne({
      mobile: { $regex: `^${data.mobile}$`, $options: "i" },
    });
    // if user not existing
    if (isUserExist || MobileExist) {
      res
        .status(409)
        .json({ status: false, errorMessage: "User Already Exist" });
    } else {
      const user = await PublicAuthSchema({
        fname: data.firstname,
        lname: data.surname,
        fullname: data.firstname + " " + data.surname,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      });
      if (user) {
        // save user to database
        await user.save();
        res.status(201).json({
          status: true,
          successMessage: "user create sucessfully",
        });
      } else {
        res.status(400).json({
          status: true,
          errorMessage: "user create Unsucessfull",
        });
      }
    }
  }),

  // login user
  SignIn: asyncHandler(async (req, res, next) => {
    const data = req.body;

    // check user exits first
    const isUserEmail = await PublicAuthSchema.findOne({
      email: { $regex: `^${data.emailPhone}$`, $options: "i" },
    });
    const isUserMobile = await PublicAuthSchema.findOne({
      mobile: { $regex: `^${data.emailPhone}$`, $options: "i" },
    });
    const isUser = isUserEmail || isUserMobile;

    // if user not existing
    if (!isUser) {
      res.status(401).json({
        status: false,
        errorMessage: "invalid user email or password",
      });
      return false;
    }

    // match password
    const comapre = await isUser.comparePassword(data.password);
    if (!comapre) {
      return res.status(401).json({
        status: false,
        errorMessage: "invalid Credentials",
      });
    }
    const user = await PublicAuthSchema.findOne(
      {
        _id: isUser._id,
      },
      { password: 0 }
    );
    const token = await user.genToken();
    if (user) {
      // user login sucessfull user login
      res.status(200).json({
        status: true,
        _token__: token,
        successMessage: "Login Sucessfully",
      });
    } else {
      res.status(401).json({
        status: false,
        errorMessage: "Invalid Credential",
      });
    }
  }),
  // update user credentials
  updateUserDetails: asyncHandler(async (req, res) => {
    const user = req.body;

    if (user._id) {
      // update user details from client side
      const updateDetails = await PublicAuthSchema.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            fname: user.firstname,
            lname: user.surname,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            fullAddress: user.fullAddress,
          },
        },
        { new: true }
      );
      // check user update or not updated
      if (updateDetails) {
        res.status(201).json({
          status: true,
          successMessage: "User details updated successfully",
        });
      } else {
        res.status(500).json({
          status: false,
          errorMessage: "User details Unsucessfull updated",
        });
      }
    } else {
      res.status(500).json({
        status: false,
        errorMessage: "User details cnnot be updated",
      });
    }
  }),
  // change user password
  changeUserPassword: asyncHandler(async (req, res) => {
    const usrDetail = req.body;

    //if check user pervious password same or different
    if (usrDetail.oldpassword !== usrDetail.npassword) {
      const user = await PublicAuthSchema.findOne({
        email: { $regex: `^${res.user.email}$`, $options: "i" },
      });
      // compare user password
      const comapre = await user.comparePassword(usrDetail.oldpassword);
      // check password true or false
      if (!comapre) {
        return res.status(401).json({
          status: false,
          errorMessage: "Your old password is incorrected.",
        });
      }
      // user find
      if (user) {
        // encrypt password for send db
        const genSalt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(usrDetail.npassword, genSalt);
        // update password
        const updatPass = await PublicAuthSchema.updateOne(
          { _id: user._id },
          {
            $set: { password: hash_password },
          },
          { new: true }
        );
        if (updatPass) {
          // sending sucess response
          res.status(200).json({
            status: true,
            successMessage: "password has been changed",
          });
        } else {
          res.status(304).json({
            status: false,
            successMessage: "password has been failed to change",
          });
        }
      }
    } else {
      res.status(401).json({
        status: false,
        errorMessage:
          "you old password has been matched Please enter another password ",
      });
    }
  }),

  // forget password validation
  forgetpassword: asyncHandler(async (req, res) => {
    const data = req.body;

    // generate randome string for rest password request
    const rendomStr = crypto.randomBytes(16).toString("hex");

    const token = jwt.sign({ rendomStr }, process.env.SECRET_KEY, {
      expiresIn: 10 * 60,
    });

    const user = await PublicAuthSchema.findOneAndUpdate(
      {
        email: { $regex: `^${data.email}$`, $options: "i" },
      },
      { $set: { resetoken: token } },
      {
        new: true,
      }
    );

    if (user) {
      await sendMail(
        user.email,
        "Reset Your Password",
        `Rest Password to Clikd the link below <a href="http://localhost:3031/public/reset-password/?uid=${user._id}&resetuid=${token}">Reset Your Password</a>`
      );

      res.status(220).json({
        status: true,
        token: token,
        successMessage: `Email has beed sent on ${user.email}`,
      });
    } else {
      res.status(400).json({
        status: false,
        errorMessage: "Email Was InValid, Please Confirm your Email",
      });
    }
  }),
  passwordReset: asyncHandler(async (req, res) => {
    const detail = req.query;
    const pass = req.body;

    const checkPassword = await PublicAuthSchema.findOne({ _id: detail.uid });
    const npass = await checkPassword.comparePassword(pass.npassword);

    if (npass) {
      return res.status(403).json({
        status: false,
        errorMessage: "old password are not allowed",
      });
    }
    await jwt.verify(
      checkPassword.resetoken,
      process.env.SECRET_KEY,
      async (err) => {
        if (err) {
          const check = await PublicAuthSchema.findOneAndUpdate(
            { resetoken: { $regex: `^${detail.resetuid}$`, $options: "i" } },
            {
              $set: {
                resetoken: "",
              },
            },
            { new: true }
          );
          if (check) {
            res.json({
              status: false,
              errorMessage: "Rest Token Has Been Expired",
            });
          }
        }
      }
    );

    if (checkPassword.resetoken !== "") {
      const npass = await bcrypt.hash(pass.npassword, 16);
      const user = await PublicAuthSchema.updateOne(
        { resetoken: { $regex: `^${detail.resetuid}$`, $options: "i" } },
        {
          $set: {
            password: npass,
            resetoken: "",
          },
        },
        { new: true }
      );
      if (user) {
        res.status(200).json({
          status: true,
          successMessage: "Your Password Has been reset",
        });
      } else {
        res.status(401).json({
          status: true,
          errorMessage: "Your Password Not Be Reseted",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        successMessage: "reset token has been expired",
      });
    }
  }),

  // profile picture link generate for ther user
  uploadAvatar: asyncHandler(async (req, res) => {
    // get image file path
    const file = req.file.path;
    // user id get
    const userId = res.user.userId;

    // is file true
    if (file) {
      // fined user id from user authontication
      const userfind = await PublicAuthSchema.findById({ _id: userId });
      // check avatar true or false
      if (userfind.avatar) {
        // if user path not undifined. we delete pervious avatar from db and claudinary
        if (userfind.avatar.path !== undefined) {
          // we using destroy methods
          const deleteAvatar = await cloudinary.uploader.destroy(
            userfind.avatar.public_id
          );
          // if coludinary destroy avatar to cloudinary delete it from mongodb database
          if (deleteAvatar) {
            userfind.avatar = "";
            await userfind.save();
          }
        }
      }
      // user find or not
      if (userfind) {
        // upload avatar on cloudinary using uploader method and save in public/avatar folder
        const fileupload = await cloudinary.uploader.upload(file, {
          folder: "public/avatar",
          resource_type: "image",
        });
        //conver image to avatar using url and transformation method in caludinary
        const image = cloudinary.url(fileupload.public_id, {
          transformation: [
            {
              gravity: "auto:body",
              radius: "max",
              quality: "auto",
              width: 240,
              height: 240,
              crop: "fill",
            },
            { background: "#00000000" },
          ],
        });
        // if avatar upload check succes or not
        if (fileupload) {
          // update avatar in mongodb database
          const avatarUpload = await PublicAuthSchema.updateOne(
            { _id: userId },
            {
              $set: {
                avatar: {
                  public_id: fileupload.public_id,
                  path: image,
                },
              },
            },
            { new: true }
          );
          // send status in client for success
          if (avatarUpload) {
            res.status(201).json({
              status: true,
              successMessage: "uploaded",
            });
          }
        }
      } else {
        res.status(400).json({
          status: false,
          errorMessage: "user not logged in please logged in ",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        errorMessage: "please upload avatar form user file",
      });
    }
  }),
};

module.exports = PublicAuthController;
