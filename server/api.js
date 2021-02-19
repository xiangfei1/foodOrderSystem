let express = require("express");
let router = express.Router();
let db = require("./db");
let moment = require("moment");

// 后台
// 登录验证
router.post("/api/adminLogin", (req, res) => {
  let accountID = req.body.accountID;
  let rpassword = req.body.rpassword;
  req.app.locals.userInfo = {
    accountID,
    rpassword
  };
  // console.log()
  db.query(
    "select * from admin where accountID=? and rpassword=?",
    [accountID, rpassword],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

// 获取账号信息
router.post("/api/adminInfo", (req, res) => {
  db.query("select * from admin", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 修改管理员账号信息
router.post("/api/adminInfo/update", (req, res) => {
  let id = req.body.accountID;
  let rname = req.body.rname;
  let rpassword = req.body.rpassword;
  db.query(
    "update admin set rname=? , rpassword=? where accountID=?",
    [rname, rpassword, id],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 删除管理员账号
router.post("/api/adminInfo/delete", (req, res) => {
  let id = req.body.accountID;
  db.query("delete from admin where accountID=?", [id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 添加管理员账户
router.post("/api/adminInfo/add", (req, res) => {
  let accountID = req.body.accountID;
  let rname = req.body.rname;
  let rpassword = req.body.rpassword;
  db.query(
    "insert into admin values(?,?,?)",
    [accountID, rname, rpassword],
    (err, data) => {
      if (err) {
        if (err.errno == "1062") {
          res.send("该账户已经存在");
        } else {
          res.send("其他错误");
        }
      } else {
        res.send("1");
      }
    }
  );
});

// // 获取餐厅信息
router.post("/api/restaurantInfo", (req, res) => {
  db.query("select * from restaurants", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      //   console.log(data);
      res.send(data);
    }
  });
});
// // 修改餐厅信息
router.post("/api/restaurantInfo/update", (req, res) => {
  let name = req.body.name;
  let rHistory = req.body.rHistory;
  db.query(
    "update restaurants set name=? , rHistory=?",
    [name, rHistory],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 查询推荐信息
router.post("/api/recommend", (req, res) => {
  let page = parseInt(req.body.page) || 1;
  let pageSize = parseInt(req.body.pageSize) || 4;
  db.query("select * from goods where tID=1", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      db.query(
        "select * from goods where tID=1 limit ?,?",
        [(page - 1) * pageSize, pageSize],
        (err2, data2) => {
          if (err2) {
            res.send(err2);
          } else {
            res.send({ data2: data2, total: data.length });
          }
        }
      );
    }
  });
});

// // 根据商品ID 查询推荐信息
router.post("/api/recommendByid", (req, res) => {
  let gID = req.body.gID;
  db.query("select tID from goods where gID=?", [gID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(data);
      res.send(data);
    }
  });
});

// // 更改商品推荐信息
router.post("/api/recommend/add", (req, res) => {
  let gID = req.body.gID;
  db.query("update goods set tID=? where gID=?", [1, gID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// // 删除推荐信息
router.post("/api/recommend/delete", (req, res) => {
  let gID = req.body.gID;
  db.query("update goods set tID=? where gID=?", [0, gID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// // 添加配送员
router.post("/api/deliver/add", (req, res) => {
  let param = req.body.param;
  db.query(
    "insert into delivery values(?,?,?)",
    [param.name, param.delTel, 0],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 获取所有配送员信息
router.post("/api/deliver", (req, res) => {
  db.query("select * from delivery", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 根据 id 获取配送员信息
router.post("/api/deliverByid", (req, res) => {
  let dID = req.body.dID;
  db.query("select * from delivery where dID=?", [dID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 根据 id 修改配送员信息
router.post("/api/deliver/update", (req, res) => {
  let param = req.body.deliver2;
  let dID = param.dID;
  db.query(
    "update delivery set name=? , delTel=? where dID=?",
    [param.name, param.delTel, dID],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 根据 id 删除配送员信息
router.post("/api/deliver/delete", (req, res) => {
  let dID = req.body.dID;
  db.query("delete from delivery where dID=?", [dID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 获取分类信息
router.get("/api/goodsInfo/classifyInfo", (req, res) => {
  db.query("select * from classify", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 根据ID获取分类信息
router.post("/api/goodsInfo/classifyInfoByID", (req, res) => {
  let value = req.body.value;
  db.query("select * from classify where value=?", [value], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 增加分类
router.post("/api/goodsInfo/classifyInfo/add", (req, res) => {
  let cname = req.body.cname;
  db.query("insert into classify values(?,?)", [cname, 0], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 删除分类
router.post("/api/goodsInfo/classifyInfo/delete", (req, res) => {
  let value = req.body.value;
  db.query("delete from classify where value=?", [value], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 更新分类
router.post("/api/goodsInfo/classifyInfo/update", (req, res) => {
  let cname = req.body.param.cname;
  let value = req.body.param.value;
  db.query(
    "update classify set cname=? where value=?",
    [cname, value],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 根据分类信息获取商品
router.post("/api/back/goodsInfo", (req, res) => {
  let cname = req.body.cname;
  // console.log(cname)
  let value = 0;
  if (cname == "全部") {
    db.query("select * from goods", [], (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    db.query("select * from classify", (err, data) => {
      data.forEach(item => {
        if (item["cname"] == cname) {
          value = item["value"];
        }
      });
      db.query(
        "select * from goods where gClassify=?",
        [value],
        (err2, data2) => {
          res.send(data2);
        }
      );
    });
  }
});

// // 根据商品ID修改商品信息
router.post("/api/goodsInfo/update", (req, res) => {
  let id = req.body.gID;
  let name = req.body.name,
    num = req.body.num,
    gInfo = req.body.gInfo,
    gClassify = req.body.gClassify,
    gAge = req.body.gAge,
    url = req.body.url,
    gPrice = req.body.gPrice,
    cID = req.body.cID;
  tID = req.body.tID;
  db.query(
    "update goods set num=?,name=?,gInfo=?,gclassify=?,gAge=?,url=?,gPrice=?,cID=?,tID=? where gID=?",
    [num, name, gInfo, gClassify, gAge, url, gPrice, cID, tID, id],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 根据商品ID修改商品数量
router.post("/api/goodsInfo/upate/num", (req, res) => {
  let num = req.body.num,
    id = req.body.gID;
  // console.log(num + "====" + id);
  db.query("update goods set num=? where gID=?", [num, id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// // 添加商品信息
router.post("/api/goodsInfo/add", (req, res) => {
  let param = req.body.goodsParam;
  let url = param.url,
    name = param.name,
    gInfo = param.gInfo,
    gClassify = param.gClassify,
    gAge = param.gAge,
    gPrice = param.gPrice,
    cID = param.cID,
    num = param.num;
  // console.log(num);
  db.query(
    "insert into goods values(?,?,?,?,?,?,?,?,?,?)",
    [url, name, gInfo, gClassify, gAge, gPrice, 0, cID, num, 0],
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 删除商品ID信息
router.post("/api/goodsInfo/delete", (req, res) => {
  let id = req.body.gID;
  db.query("delete from goods where gID=?", [id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 根据商品分类删除商品
router.post("/api/goodsInfo/deleteByClassify", (req, res) => {
  let value = req.body.value;
  db.query("delete from goods where gClassify=?", [value], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send("1");
    }
  });
});

// // 前台
// // 登录验证
router.post("/api/login", (req, res) => {
  let userID = req.body.userID;
  let upassword = req.body.upassword;
  db.query(
    "select * from users where userID=? and upassword=?",
    [userID, upassword],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

// // 添加用户
router.post("/api/register", (req, res) => {
  let param = req.body.userParam;
  let uname = param.uname,
    userID = param.userID,
    upassword = param.upassword,
    tel = param.tel,
    money = param.money || 0,
    address = param.address;
  db.query("select * from users where userID=?", [userID], (err, data) => {
    if (err) {
      res.send("账号只能由数字组成");
      // console.log(err)
    } else {
      if (data.length == 0) {
        db.query(
          "insert into users values(?,?,?,?,?,?)",
          [userID, uname, tel, upassword, address,money],
          (err2, data2) => {
            if (err2) {
              res.send("账号只能由数字组成");
              console.log(err2)
            } else {
              res.send("1");
            }
          }
        );
      } else {
        res.send("账号已存在");
      }
    }
  });
});

// // 根据userID查询用户信息
router.post("/api/userInfo", (req, res) => {
  let userID = req.body.userID;
  db.query("select * from users where userID=?", [userID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 查询所有用户信息
router.post("/api/alluserinfo", (req, res) => {
  db.query("select * from users", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// //用户根据UserID修改用户信息
router.post("/api/userInfo/update", (req, res) => {
  let id = req.body.userID;
  let uname = req.body.uname,
    upassword = req.body.upassword,
    tel = req.body.tel,
    address = req.body.address,
    money = req.body.money || 0;
  db.query(
    "update users set uname=?,upassword=?,tel=?,address=?,money=? where userID=?",
    [uname, upassword, tel, address, money, id],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 根据userID修改用户余额
router.post("/api/userInfo/update/money", (req, res) => {
  let userID = req.body.userID;
  let money = req.body.money;
  db.query(
    "update users set money=? where userID=?",
    [money, userID],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 根据userID 删除用户信息
router.post("/api/userInfo/delete", (req, res) => {
  let userID = req.body.userID;
  db.query("delete from users where userID=?", [userID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// 根据商品分类获取商品信息
router.post("/api/goodsInfo/byClassify", (req, res) => {
  let gClassify = req.body.gClassify;
  let page = Number(req.body.page) || 1;
  let pageSize = Number(req.body.pageSize) || 4;
  db.query("select * from classify", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data.forEach(item => {
        if (gClassify == item["cname"]) {
          gClassify = item["value"];
        }
      });
      db.query(
        "select * from goods where gClassify=? and cID != 1",
        [gClassify],
        (err2, data2) => {
          if (err2) {
            res.send(err2);
          } else {
            db.query(
              "select * from goods where gClassify=? and cID !=1 limit ?,?",
              [gClassify, (page - 1) * pageSize, pageSize],
              (err3, data3) => {
                if (err3) {
                  res.send(err3);
                } else {
                  res.send({ data: data3, length: data2.length });
                }
              }
            );
          }
        }
      );
    }
  });
});

// // 根据促销ID获取商品信息
router.post("/api/discountGoods", (req, res) => {
  let cID = req.body.cID;
  db.query("select * from goods where cID=? limit 1,8", [cID], (err, data) => {
    if (err) {
      res.send(err);
      // console.log(err)
    } else {
      res.send(data);
    }
  });
});

// // 根据商品ID获取评论信息
router.post("/api/comment", (req, res) => {
  let gID = req.body.gID;
  db.query("select * from comments where gID=?", [gID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 添加评论
router.post("/api/comment/add", (req, res) => {
  let param = req.body.cparam;
  let cTime = moment(param.cTime).format("YYYY-MM-DD HH:mm:ss"),
    cname = param.cname,
    content = param.content,
    gID = param.gID,
    value = param.value;
  db.query(
    "insert into comments values(?,?,?,?,?)",
    [cTime, cname, content, gID, value],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 添加付款信息
router.post("/api/pay", (req, res) => {
  let param = req.body.payParam;
  let gID = param.gID,
    num = param.num,
    info = param.info,
    uname = param.uname,
    tel = param.tel,
    address = param.address,
    state = param.state,
    userID = param.userID,
    name = param.name,
    gPrice = param.gPrice,
    url = param.url,
    sTime = moment(param.sTime).format("YYYY-MM-DD HH:mm:ss");
  drawback = param.drawback;
  // console.log(sTime);
  db.query(
    "insert into pays values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      0,
      gID,
      num,
      info,
      uname,
      tel,
      address,
      state,
      userID,
      name,
      gPrice,
      url,
      sTime,
      drawback
    ],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 根据userID获取订单信息
router.post("/api/payInfo", (req, res) => {
  let userID = req.body.userID;
  db.query("select * from pays where userID=?", [userID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// // 根据 订单ID 更新付款ID
router.post("/api/topay", (req, res) => {
  let pID = req.body.pID;
  let sTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  db.query(
    "update pays set state=?,sTime=? where pID=?",
    [1, sTime, pID],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// // 根据 pID  删除订单信息
router.post("/api/pay/delete", (req, res) => {
  let pID = req.body.pID;
  db.query("delete from pays where pID=?", [pID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// // 根据用户ID、商品ID、付款ID 更新订单发货信息
router.post("/api/pay/update", (req, res) => {
  let pID = req.body.pID;
  let info = req.body.info;
  db.query("update pays set info=? where pID=?", [info, pID], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send("1");
    }
  });
});

// // 根据 付款信息 订单ID 添加售后信息
router.post("/api/pay/drawback", (req, res) => {
  let drawback = req.body.drawback;
  let pID = req.body.pID;
  db.query(
    "update pays set drawback=? where pID=?",
    [drawback, pID],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("1");
      }
    }
  );
});

// 获取商品排行
router.get("/api/home/goodsRank", (req, res) => {
  let temp = [];
  let value = [];
  db.query(
    "select gID,sum(value) as total from comments group by gID order by total desc",
    [],
    (err, data) => {
      if (err) {
        res.send(err);
        // console.log(err)
      } else {
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i].gID);
          value.push(data[i].total);
        }
        if (temp.length > 5) {
          temp = temp.slice(0, 5);
          value = value.slice(0, 5);
        }
        value.reverse();
        // console.log(value)
        db.query(
          "select name,gID from goods where gID in (?)",
          [temp],
          (err2, data2) => {
            if (err2) {
              res.send(err2);
            } else {
              res.send({ data: data2, value: value });
            }
          }
        );
      }
    }
  );
});

// 获取搜索结果
router.post("/api/goodsInfo/search", (req, res) => {
  let value = req.body.value;
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 8;
  db.query(
    "select * from goods where name like ?",
    ["%" + value + "%"],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        db.query(
          "select * from goods where name like ? limit ?,?",
          ["%" + value + "%", (page - 1) * pageSize, pageSize],
          (err2, data2) => {
            if (err2) {
              res.send(err2);
            } else {
              res.send({ data: data2, total: data.length });
            }
          }
        );
      }
    }
  );
});

// 获取所有商品信息
router.post("/api/goodsInfo", (req, res) => {
  db.query("select * from goods", [], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      db.query("select * from classify", [], (err2, data2) => {
        if (err2) {
          res.send(err2);
        } else {
          for (let i = 0; i < data.length; i++) {
            data2.forEach(item => {
              if (data[i].gClassify == item["value"]) {
                data[i].gClassify = item["cname"];
              }
            });
          }
          res.send(data);
        }
      });
    }
  });
});

// 通用
// // 根据商品ID 获取商品信息
router.post("/api/goodsInfoByid", (req, res) => {
  let id = req.body.gID;
  // console.log(id);
  db.query("select * from goods where gID=?", [id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      db.query("select * from classify", [], (err2, data2) => {
        if (err2) {
          res.send(err2);
        } else {
          // console.log(data2)
          // data2.forEach(item => {
          //   if (data[0].gClassify == item["value"]) {
          //     data[0].gClassify = item["cname"];
          //   }
          // });
          res.send(data);
        }
      });
    }
  });
});
module.exports = router;
