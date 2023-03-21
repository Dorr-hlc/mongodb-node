const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 只执行一次
mongoose.connection.once("open", () => {
  console.log("链接成功");
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
