// 导入mongoose
const mongoose = require("mongoose");
// 导入db文件
const db = require("./db/db");

//导入BookModel
const BookModel = require("./models/BookModel");

// 调用这个函数
db(
  () => {
    console.log("链接成功");
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
  },
  () => {
    console.log("链接失败");
  }
);
