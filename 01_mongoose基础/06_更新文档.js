/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 21:33:58
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-21 21:34:13
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
  // 7.更新文档
  // BookModel.updateOne({ name: "三国演义" }, { price: 9.9 }, (err, data) => {
  //   if (err) {
  //     console.log("更新失败");
  //     return;
  //   }
  //   console.log(data);
  // });
  // 批量更新
  BookModel.updateMany({ author: "余华" }, { is_hot:false }, (err, data) => {
    if (err) {
      console.log("更新失败");
      return;
    }
    console.log(data);
  });
});
