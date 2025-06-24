const AdminAccount = require("../../model/admin-account.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const OTPHelper = require("../../helper/OTPGen.helper");
const ForgotPassword = require("../../model/forgot-password.model");
const MailHelper = require("../../helper/mail.helper");

module.exports.registerPost = async (req, res) => {
  const existAccount = await AdminAccount.findOne({
    email: req.body.email
  })
  if (existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    })
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);

  const newRecord = new AdminAccount({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashPassword,
    status: "initial"
  });
  await newRecord.save();

  res.json({
    code: "success",
    message: "Đăng ký thành công!"
  })
}

module.exports.loginPost = async (req, res) => {
  const existAccount = await AdminAccount.findOne({
    email: req.body.email
  })
  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  if (existAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt!"
    });
    return;
  }

  if (!bcrypt.compareSync(req.body.password, existAccount.password)) {
    res.json({
      code: "error",
      message: "Mật khẩu không chính xác!"
    });
    return;
  }

  const adminToken = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: req.body.rememberPassword == true ? '30d' : '1d'
    }
  );

  res.cookie("adminToken", adminToken, {
    maxAge: req.body.rememberPassword == true ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "none"
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!"
  })
}

module.exports.logoutGet = (req, res) => {
  res.clearCookie("adminToken");
  res.json({
    code: "success",
    message: "Đăng xuất thành công!"
  });
}

module.exports.forgotPasswordPost = async (req, res) => {
  const existAccount = await AdminAccount.findOne({
    email: req.body.email
  });
  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  const existOTPAccount = await ForgotPassword.findOne({
    email: req.body.email
  });
  if (existOTPAccount) {
    res.json({
      code: "error",
      message: "Vui lòng thử lại sau 5 phút!"
    });
    return;
  }

  const otp = OTPHelper.OTPGen(6);

  const newRecord = new ForgotPassword({
    otp: otp,
    email: req.body.email,
    expireAt: Date.now() + 5 * 60 * 1000
  });

  await newRecord.save();

  const subject = `Mã OTP lấy lại mật khẩu`;

  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #2e6da4;">Khôi phục mật khẩu</h2>
      <p>Xin chào,</p>
      <p>Bạn vừa yêu cầu lấy lại mật khẩu. Đây là mã OTP của bạn:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; color: green; background-color: #e1f3e1; padding: 10px 20px; border-radius: 5px;">${otp}</span>
      </div>
      <p><strong>Lưu ý:</strong> Mã OTP có hiệu lực trong vòng <b>5 phút</b>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
      <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #888;">Email này được gửi tự động, vui lòng không trả lời lại.</p>
    </div>
  `;

  MailHelper.sendMail(req.body.email, subject, content);

  res.json({
    code: "success",
    message: "Gửi mã OTP thành công!"
  });
}

module.exports.otpPasswordPost = async (req, res) => {
  const existOTPAccount = await ForgotPassword.findOne({
    email: req.body.email,
    otp: req.body.otp
  });

  if (!existOTPAccount) {
    res.json({
      code: "error",
      message: "OTP không hợp lệ!"
    });
    return;
  }

  const existAccount = await AdminAccount.findOne({
    email: existOTPAccount.email
  })

  const adminToken = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

  res.cookie("adminToken", adminToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "none"
  });

  await ForgotPassword.deleteOne({
    email: req.body.email,
    otp: req.body.otp
  });

  res.json({
    code: "success",
    message: "OTP hợp lệ!"
  })
}

module.exports.resetPasswordPost = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);

  await AdminAccount.updateOne({
    _id: req.account.id
  }, {
    password: hashPassword
  })

  res.json({
    code: "success",
    message: "Đổi mật khẩu thành công!"
  })
}