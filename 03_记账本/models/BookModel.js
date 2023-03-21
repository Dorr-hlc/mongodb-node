/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 22:16:32
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-21 22:16:48
 * @RevisionHistory:
 */
const mongoose = require("mongoose");
// 创建文档的结构对象:设置集合中的属性以及类型
let BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});
//   创建模型对象
let BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
