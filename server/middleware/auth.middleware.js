const AdminAccount = require("../model/admin-account.model");
const jwt = require("jsonwebtoken");
const Role = require("../model/role.model");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({
        code: "error",
        message: "Token không tồn tại!"
      });
      return;
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    const existAccount = await AdminAccount.findOne({
      _id: id,
      email: email,
      status: "active"
    });

    if (!existAccount) {
      res.clearCookie();
      res.json({
        code: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }

    req.account = existAccount;
    const roleDetail = await Role.findOne({
      _id: existAccount.role
    })
    req.account.permission = roleDetail.permissions;
  }
  catch (error) {
    res.clearCookie();
    res.json({
      code: "error",
      message: error
    })
    return;
  }

  next();
}