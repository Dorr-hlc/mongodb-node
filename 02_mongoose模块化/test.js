const db = require("./db/db");
// 导入电影文件
const movieModel = require("./models/movieModel");
db(
  () => {
    // 电影的模型
    movieModel.create(
      {
        title: "让子弹飞",
        director: "姜文",
      },
      (err, data) => {
        if (err) {
          console.log("插入失败");
          return;
        }
        console.log("插入成功");
      }
    );
  },
  () => {
    console.log("链接失败");
  }
);
