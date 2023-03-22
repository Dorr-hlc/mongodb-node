/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-03-21 22:48:32
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-03-23 00:49:38
 * @RevisionHistory:
 */
var express = require("express");
var router = express.Router();
// 导入日期转化包
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");

//记账本的列表
router.get("/account", function (req, res, next) {
  //获取所有的账单信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.json({
          code: "1001", //响应编号
          msg: "读取失败", //响应信息
          data: null, //响应的数据
        });
        return;
      }
      // 响应成功的提示
      res.json({
        code: "0000", //响应编号
        msg: "读取成功", //响应信息
        data: data, //响应的数据
      });
    });
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
        res.json({
          code: "1002",
          msg: "添加失败",
          data: null,
        });
        return;
      }
      res.json({
        code: "0000",
        msg: "添加成功",
        data: null,
      });
    }
  );
});

//删除记录
router.delete("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        code: "1003",
        msg: "删除失败",
        data: null,
      });
      return;
    }
    res.json({
      code: "0000",
      msg: "删除成功",
      data: null,
    });
  });
});

// 获取单个账单信息
router.get("/account/:id", (req, res) => {
  // 获取id 参数
  let { id } = req.params;
  AccountModel.findById(id, (err, data) => {
    if (err) {
      res.json({
        code: "1004",
        msg: "读取失败",
        data: null,
      });
      return;
    }
    // 读取成功
    res.json({
      code: "0000",
      msg: "读取成功",
      data: data,
    });
  });
});
// 更新单个账单的信息
router.patch("/account/:id", (req, res) => {
  let { id } = req.params;
  //   更新数据库
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.json({
        code: "1005",
        msg: "更新失败",
        data: null,
      });
      return;
    }
    //   再次查询数据库获取单条数据库
    AccountModel.findById(id, (err, data) => {
      if (err) {
        res.json({
          code: "1004",
          msg: "读取失败",
          data: null,
        });
        return;
      }
      // 读取成功
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data,
      });
    });
  });
});
module.exports = router;
