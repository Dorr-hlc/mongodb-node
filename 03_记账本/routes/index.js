/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 22:48:32
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-21 23:11:08
 * @RevisionHistory:
 */
var express = require("express");
var router = express.Router();
//导入 lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../data/db.json");
//获取 db 对象
const db = low(adapter);
//导入 shortid
const shortid = require("shortid");
// 导入日期转化包
const moment = require("moment");
const AccountModel = require("../models/accountModel");
// 测试
// console.log(moment("2023-03-21"));
//记账本的列表
router.get("/account", function (req, res, next) {
  //获取所有的账单信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send("读取失败");
        return;
      }
      console.log(data);
      // 相应成功的提示
      res.render("list", { accounts: data });
    });
});

//添加记录
router.get("/account/create", function (req, res, next) {
  res.render("create");
});

//新增记录
router.post("/account", (req, res) => {
  // 查看表单数据 需要转换日期对象2023-03-21 =>moment=>new Date()
  // console.log(req.body);
  // 插入数据库
  AccountModel.create(
    {
      ...req.body,
      // 修改time属性的值
      time: moment(req.body.time).toDate(),
    },
    (err, data) => {
      if (err) {
        res.status(500).send("插入失败");
        return;
      }
      //成功提醒
      res.render("success", { msg: "添加成功哦~~~", url: "/account" });
    }
  );
});

//删除记录
router.get("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  db.get("accounts").remove({ id: id }).write();
  //提醒
  res.render("success", { msg: "删除成功~~~", url: "/account" });
});

module.exports = router;
