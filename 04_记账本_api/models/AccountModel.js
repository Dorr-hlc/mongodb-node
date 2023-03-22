/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 22:16:32
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-22 23:09:08
 * @RevisionHistory:
 */
const mongoose = require("mongoose");
// 创建文档的结构对象:设置集合中的属性以及类型
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
  },
  type: { 
    type: Number,
    default: -1,
  },
  account: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
});
//   创建模型对象
let AccountModel = mongoose.model("accounts", AccountSchema);

module.exports = AccountModel;
