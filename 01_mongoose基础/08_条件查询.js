/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 21:33:58
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-21 21:55:11
 * @RevisionHistory:
 */
//1. 安装 mongoose
//2. 导入 mongoose
const mongoose = require("mongoose");

//设置 strictQuery 为 true
mongoose.set("strictQuery", true);

//3. 连接 mongodb 服务                        数据库的名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once("open", () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model("novel", BookSchema);
  //获取价格小于20的书籍
  // BookModel.find({ price: { $lt: 20 } }, (err, data) => {
  //   if (err) {
  //     console.log("读取失败");
  //     return;
  //   }
  //   console.log(data);
  // });

  // 获取曹雪芹或者余华的书籍
  // BookModel.find(
  //   { $or: [{ author: "余华" }, { author: "曹雪芹" }] },
  //   (err, data) => {
  //     if (err) {
  //       console.log("读取失败");
  //       return;
  //     }
  //     console.log(data);
  //   }
  // );

  // 获取价格大于30且小于70
  // BookModel.find(
  //   { $and: [{ price: { $gt: 30 } }, { price:  { $lt: 70 } }] },
  //   (err, data) => {
  //     if (err) {
  //       console.log("读取失败");
  //       return;
  //     }
  //     console.log(data);
  //   }
  // );

  // 正则表达式 获取书名中带有三的图书
  // BookModel.find({ name: /三/ }, (err, data) => {
  //   if (err) {
  //     console.log("读取失败");
  //     return;
  //   }
  //   console.log(data);
  // });
  
  // 如果是变量就这样写正则
  BookModel.find({ name: new RegExp("三") }, (err, data) => {
    if (err) {
      console.log("读取失败");
      return;
    }
    console.log(data);
  });
});
