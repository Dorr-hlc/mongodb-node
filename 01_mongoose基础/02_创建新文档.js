/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract: 
 * @Date: 2023-03-21 00:29:54
 * @Author: 
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-21 00:30:58
 * @RevisionHistory: 
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");
// 设置提示为true
mongoose.set("strictQuery", true);
// 只执行一次
mongoose.connection.once("open", () => {
  console.log("链接成功");
  // 创建文档的结构对象:设置集合中的属性以及类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
  });
  //   创建模型对象
  let BookModel = mongoose.model("books", BookSchema);
  // 新增
  BookModel.create(
    {
      name: "西游记",
      author: "余承恩",
      price: 19.9,
    },
    (err, data) => {
      // 判断是否有错误
      if (err) {
        console.log(err);
        return;
      }
      //   如果没有错误，打印
      console.log(data);
      //   关闭数据库连接，项目运行过程中不会添加该代码
      mongoose.disconnect();
    }
  );
}); //设置链接成功的回调
mongoose.connection.on("error", () => {
  console.log("链接失败");
}); //设置链接错误的回调
mongoose.connection.on("close", () => {
  console.log("链接关闭");
}); //设置链接关闭的回调

// 关闭链接
// setTimeout(() => {
//   mongoose.disconnect();
// },2000);
