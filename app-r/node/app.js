var express = require('express');
var server = express();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var qs = require('querystring');
var axios = require('axios')
var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'hmsystem',
    port:'3306'
})

server.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    next();
});

// 人脸识别-获取Access Token
server.post('/getToken',function(req,res){
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'LgGclCtnYnE6iGHxfxsRtAug',
        'client_secret': '0RXVdeWFq04onGEy7lpDhE3ygqoZnUWW'
    });
    axios.post('https://aip.baidubce.com/oauth/2.0/token', param).then((msg) => {
        // 获取access_token
        res.send(msg.data)
    }).catch((err)=>{
        console.log(err)
    })
})
//注册人脸库
server.post('/initFace',function(req,res){
    // 请求接口
    var url = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + req.query.access_token;
    // 请求的图片数据
    // 请求数据
    var data = {
        image_type: 'BASE64',
        image: req.query.img,
        group_id: 'hmsystem_face', // 之前注册人脸管理库的名字
        user_id: '10000002' ,      // 这张图片的id
    }
    axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: url,
        data: qs.stringify(data),
    }).then((msg)=>{
        console.log(msg.data)
        res.send(msg.data)
    }).catch((err)=>{
        console.log(err)
    })

})
//检测人脸
server.post('/checkFace',function(req,res){
    console.log(res)
    let token = '24.0404c5eff957aec2907cf4fbf2c8803b.2592000.1619852834.282335-23905547';
    // 请求接口
    var url = 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + req.headers.access_token;
    // 请求的图片数据
    // 请求数据
    var data = {
        image_type: 'BASE64',
        image: req.body.img,
        group_id_list: 'hmsystem_face', // 之前注册人脸管理库的名字
        liveness_control: 'HIGH'     // 活体监测
    }

    axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: url,
        data: qs.stringify(data),
    }).then((msg)=>{
        res.send(msg.data)
    }).catch((err)=>{
        console.log(err)
    })

})
//获取人员信息，aboutme.vue
server.get('/getPeoMessage',function (req,res){
    let sql = 'select * from tbl_personinfomation where manID=' + req.query.manID+';';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//退房、续住 fetchroommsg checkout.vue
//tbl_room修改checkin
//续住 tbl_personinfo 修改staywith
server.get('/xuzhu',function (req,res){
    let sql = 'UPDATE `tbl_personinfo` SET`staywith`="'+req.query.staywith +'" WHERE `manID`="'+ req.query.manID+'" and `roomID`="'+ req.query.roomID+'" and `paid`=0';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not update',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
server.get('/tuifangle',function (req,res){
    let sql = 'UPDATE `tbl_room` SET `checkin`=0 WHERE `roomID`="'+req.query.roomID+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'fail',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
server.post('/fetchroommsg',function (req,res){
    let sql = 'SELECT * FROM `tbl_personinfo` WHERE `manID`="'+req.query.manID+'" and `paid`=0';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//获取入住信息，aboutme.vue checkindetail.vue
server.get('/findcheckin',function (req,res){
    let sql = 'select * from tbl_room where roomID=' + req.query.roomID+';';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//获取空房信息，checkin.vue
server.get('/getRoomInfo',function (req,res){
    let sql = 'select * from tbl_room where checkin=0;';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//注册 register.vue
server.post('/registers',function (req,res){
    console.log('get-----',req.query);
    console.log('post-----',req.body);
    const sql = `insert into tbl_personinfomation(manID,name,age,ID,sex,phone,faceimg,pwds)values(null,"${req.query.name}","${req.query.age}","${req.query.ID}","${req.query.sex}","${req.query.phone}",null,"${req.query.pass}");`;
   console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//入住 checkin.vue 需要修改tbl_room里面checkin 0=>1 insert tbl_personinfo
//insert tbl_order
server.post('/chooseroom',function (req,res){
    const sql ='INSERT INTO `tbl_personinfo`(`manID`, `checkintime`, `staywith`, `roomID`, `orderID`, `paid`, `checkoutime`) VALUES ("'
    + req.query.manID + '","' + req.query.checkintime + '",0,"' + req.query.roomID+ '",NULL,0,"' +req.query.checkoutime+'");';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//登录 login.vue
server.post('/login',function (req,res){
    let sql = 'select * from tbl_personinfomation where name="'+req.query.userName+'" and pwds="'+req.query.userPw+'";';
    console.log(sql);
    db.query(sql,function (err,data){
        setTimeout(function () {
            if (err) {
                res.json({msg: err, code: 110});
            } else {
                if (data.length) {
                    let token = "11111";
                    res.json({msg: 'success', code: 200, data: data,token:token});
                } else {
                    res.json({msg: 'not find', code: 201});
                }
            }
        },2000)
    })
})

//访客历史记录 visitorhistory.vue
server.get('/getvisitorhistory',function (req,res){
    let sql = 'select * from tbl_visitreserve where manID=' + req.query.manID +';'
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//订单历史记录 orders.vue
server.get('/getorders',function (req,res){
    let sql = 'select * from tbl_personinfo where manID="' + req.query.manID+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//路径规划页面 mapguide.vue
server.get('/checkmap',function (req,res){
    let sql = 'select * from tbl_guide where value="' + req.query.value+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//修改personinfo里面的paid信息 checkout.vue
server.get('/personinfochange',function (req,res){
    let sql = 'UPDATE `tbl_personinfo` SET `paid`=1 WHERE `manID`="'+req.query.manID +'" and `roomID`="'+ req.query.roomID+  '" AND `paid`=0';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//账单历史记录 bills.vue
server.get('/getBillshis',function (req,res){
    let sql = 'select * from tbl_totalprice where manID="' + req.query.manID+'";';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//发票历史记录 tickethistory.vue
server.get('/getTicketHis',function (req,res){
    console.log('get-----',req.query);
    console.log('post-----',req.body);
    let sql = 'select * from tbl_invoice where manID=' + req.query.manID +';';
    console.log(sql);
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//系统推荐 recommendsys
server.get('/getRecSer',function (req,res){
    console.log('get-----',req.query);
    console.log('post-----',req.body);
    let sql = 'select * from tbl_price';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//查看入住信息 checkindetail.vue
server.get('/tbl_personinfo',function (req,res){
    console.log('get-----',req.query);
    console.log('post-----',req.body);
    let sql = 'select * from tbl_personinfo where manID="' + req.query.manID + '" and paid="'+ req.query.paid + '";';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//我的偏好 mypreference- 展示喜好信息
server.get('/getpreference',function (req,res){
    let sql = 'select * from tbl_personalizedservice where manID=' + req.query.manID+';';
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'success',code:200,data:data});
            } else {
                res.json({msg:'not find',code:201});
            }
        }
    })
})
//删除我的偏好 deletemyservice myperfence.vue
server.get('/deletemyservice',function (req,res){
    let sql = 'DELETE FROM `tbl_personalizedservice` WHERE manID="' + req.query.manID +'" and serviceID="' + req.query.serviceID +'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'fail',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//删除发票 tickethistory.vue
server.get('/deleteticket',function (req,res){
    let sql = 'DELETE FROM `tbl_invoice` WHERE manID="' + req.query.manID +'" and faxID="' + req.query.faxID +'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'fail',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//修改个人信息 aboutme.vue changepersonmsg
server.get('/changepersonmsg',function (req,res){
    let sql = 'UPDATE `tbl_personinfomation` SET `phone`="'+req.query.phone+'",`pwds`="'+ req.query.pwds +'" WHERE manID="'+req.query.manID+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//修改房间状态信息
server.get('/changeroominfo',function (req,res){
    let sql = 'UPDATE `tbl_room` SET `checkin`=1 WHERE roomID="'+req.query.roomID+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})

//账单管理 完成支付 bills.vue
server.get('/paybills',function (req,res){
    let sql = 'UPDATE `tbl_totalprice` SET `paid`=1 WHERE `manID`="' + req.query.manID +'"and `serviceID`="' +  req.query.serviceID+'";';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//insertservice 添加到我的库 recommendsys.vue
server.get('/insertservice',function (req,res){
    let sql = 'INSERT  tbl_personalizedservice (manID,servicename,price,serviceID) SELECT "'+ req.query.manID+'","'+req.query.servicename+'","'+req.query.price+'","'+req.query.serviceID +
        '" WHERE   NOT EXISTS (   SELECT  1    FROM    tbl_personalizedservice   WHERE   manID ="' + req.query.manID+'" AND  serviceID = "'+ req.query.serviceID+'" );';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})

//addtotalprice 选择该服务 recommendsys.vue
server.get('/addtotalprice',function (req,res){
    let sql = 'insert into tbl_totalprice(manID,totaldate,serviceID,totalprice,paid,servicename)values("'
        + req.query.manID + '","' + req.query.totaldate + '","' + req.query.serviceID + '","' + req.query.totalprice+
        '","' + req.query.paid +'","' + req.query.servicename +'");';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//增加访客预约 vissitorserv.vue
server.get('/addvisitorser',function (req,res){
    let sql = 'insert into tbl_visitreserve(visitorname,visitorID,mastername,roomID,visitTime,manID) ' +
        'values("'+req.query.visitorname+'","'+req.query.visitorID+'","'+req.query.mastername
         + '","' + req.query.roomID +'","' + req.query.visitTime + '","' + req.query.manID +'");';
    console.log(sql);
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
//新增发票地址
server.get('/insertticket',function (req,res){
    console.log('get-----',req.query);
    console.log('post-----',req.body);
    let sql = 'insert into tbl_invoice(manID,unitname,faxID,registadd,tel,bankname,bankaccount) ' +
        'values("'+req.query.manID+'","'+req.query.unitname+'","'+req.query.faxID+'","' +
        +req.query.registadd+'","'+req.query.tel+'","'+req.query.bankname+'","' + req.query.bankaccount +'");';
    console.log(sql)
    db.query(sql,function (err,data){
        if (err){
            res.json({msg:err,code:110});
        }else {
            if (data.length){
                res.json({msg:'not insert',code:200,data:data});
            } else {
                res.json({msg:'success',code:201});
            }
        }
    })
})
server.listen(8081,function (){
    console.log('服务器正在运行：http://localhost:8081');
});
