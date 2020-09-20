var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');

GetConfigmethod = () => {
  var config = {
    server: 'mademyflat.database.windows.net',
    authentication: {
      type: 'default',
      options: {
        userName: 'finalflatmate', // update me
        password: 'P@ssw0rd123#', // update me
        encrypt: true,
      }
    },
    options: {
      database: 'finalflatmate',
      encrypt: true,
    }
    // When you connect to Azure SQL Database, you need these next options.
    //options: {encrypt: true, database: 'yourDatabase'}

  };
  return config;
}

//Users
function Registeruser(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";

    //console.log(sql);
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      newdata.push({
        "universalid": universalid
      });
      // newdata.push(dataset);



      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.on('row', function (columns) {

      columns.forEach(function (column) {
        dataset.push({
          col: column.metadata.colName,
          val: column.value
        });


      });


      newdata.push(dataset);

    });


    connection.execSql(request);

  });

}
function LoginUser(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    console.log(data);
    var sql = "select * from users where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        dataset.push({
          col: column.metadata.colName,
          val: column.value
        });


      });


      newdata.push(dataset);

    });


    connection.execSql(request);

  });

}


//Tenants
function TenantRegister(data, callback) {
  // console.log(data.userid);
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data.userid;

  connection.on('connect', function (err) {
    var sql = "AddTenants"; //"insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";

    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      console.log("jiopkpokoojioj" + data.userid);


      newdata.push({
        "universalid": universalid
      });
      // newdata.push(dataset);



      if (err) {
        console.log(err);
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.addParameter("userid", TYPES.VarChar, data.userid);
    request.addParameter("Room_in_an_existing", TYPES.NVarChar, data.Room_in_an_existing);
    request.addParameter("Area", TYPES.NVarChar, data.Area);
    request.addParameter("Rent", TYPES.NVarChar, data.Rent);
    request.addParameter("DatetoCome", TYPES.NVarChar, data.DatetoCome);
    request.addParameter("HowDays", TYPES.NVarChar, data.HowDays);
    request.addParameter("RoomFurnishing", TYPES.NVarChar, data.RoomFurnishing);
    request.addParameter("Internet", TYPES.NVarChar, data.Internet);
    request.addParameter("BathRoomType", TYPES.NVarChar, data.BathRoomType);
    request.addParameter("Parking", TYPES.NVarChar, data.Parking);
    request.addParameter("MaxNumberoflatemate", TYPES.NVarChar, data.MaxNumberoflatemate);
    request.addParameter("picstring", TYPES.NVarChar, data.picstring);
    request.addParameter("thisplaceisfor", TYPES.NVarChar, data.thisplaceisfor);
    request.addParameter("myname", TYPES.NVarChar, data.myname);
    request.addParameter("age", TYPES.NVarChar, data.age);
    request.addParameter("gender", TYPES.NVarChar, data.gender);
    request.addParameter("employeestatus", TYPES.NVarChar, data.employeestatus);
    request.addParameter("lifestyle", TYPES.NVarChar, data.lifestyle);
    request.addParameter("abouturselfparagraph", TYPES.NVarChar, data.abouturselfparagraph);
    request.addParameter("itemid", TYPES.NVarChar, data.itemid);
    request.addParameter("lifestyleid", TYPES.NVarChar, data.lifestyleid);
    request.addParameter("emploeestatusid", TYPES.NVarChar, data.emploeestatusid);
    request.addParameter("genderid", TYPES.NVarChar, data.genderid);
    request.addParameter("placeforid", TYPES.NVarChar, data.placeforid);

    //request.on('row', function (columns) {

    //columns.forEach(function (column) {
    // dataset.push({
    // col: column.metadata.colName,
    //  val: column.value
    //});


    //});


    newdata.push(dataset);

    //  });

    connection.callProcedure(request);
    //connection.execSql(request);

  });

}
function TenantLogin(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "select * from users where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        dataset.push({
          col: column.metadata.colName,
          val: column.value
        });


      });


      newdata.push(dataset);

    });


    connection.execSql(request);

  });

}
var TYPES = require('tedious').TYPES;
//Owners
function OwnerRegister(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data.userid;
  connection.on('connect', function (err) {
    var sql = "addowners"; // "insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";
    //console.log(sql);
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        console.log(err);
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });


    request.addParameter("LoginUserID", TYPES.NVarChar, data.LoginUserID);
    request.addParameter("location", TYPES.NVarChar, data.location);
    request.addParameter("typeofAccomodation", TYPES.NVarChar, data.typeofAccomodation);
    request.addParameter("propertyAddress", TYPES.NVarChar, data.propertyAddress);
    request.addParameter("totalbed", TYPES.NVarChar, data.totalbed);
    request.addParameter("totalbathrooms", TYPES.NVarChar, data.totalbathrooms);
    request.addParameter("parking", TYPES.NVarChar, data.parking);
    request.addParameter("internet", TYPES.NVarChar, data.internet);
    request.addParameter("roomename", TYPES.NVarChar, data.roomename);
    request.addParameter("roomtype", TYPES.NVarChar, data.roomtype);
    request.addParameter("roomfuninishing", TYPES.NVarChar, data.roomfuninishing);
    request.addParameter("bathroom", TYPES.NVarChar, data.bathroom);
    request.addParameter("bedsize", TYPES.NVarChar, data.bedsize);
    request.addParameter("roomfeatures", TYPES.NVarChar, data.roomfeatures);
    request.addParameter("rent", TYPES.NVarChar, data.rent);
    request.addParameter("bonds", TYPES.NVarChar, data.bonds);
    request.addParameter("bills", TYPES.NVarChar, data.bills);
    request.addParameter("picstring", TYPES.NVarChar, data.picstring);
    request.addParameter("picsstringone", TYPES.NVarChar, data.picstringone);
    request.addParameter("picsstringtwo", TYPES.NVarChar, data.picstringtwo);
    request.addParameter("picsstringthree", TYPES.NVarChar, data.picstringthree);




    connection.callProcedure(request);

  });

}
function OwnerLogin(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "select * from users where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        dataset.push({
          col: column.metadata.colName,
          val: column.value
        });


      });


      newdata.push(dataset);

    });


    connection.execSql(request);

  });

}


//Bid //get the clietns cards
function GetBids(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "SELECt o.Typeofacc, o.Rent ,o.Totalbed ,o.Propertyaddress ,o.picId ,o.active,w.Imagestr,o.ownerid FROM dbo.Ownerdisplay o inner join WebSiteImages w  ON o.picid = w.ImageId";//where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });
    request.on('row', function (columns) {
      newdata.push(columns);
    });
    connection.execSql(request);

  });

}


//Main page Cards
function GetCardOwners(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "select * from users where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        dataset.push({
          col: column.metadata.colName,
          val: column.value
        });


      });


      newdata.push(dataset);

    });


    connection.execSql(request);

  });

}
function GetCardTenants(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "select top 10 Area,Rent,DatetoCome,age,picstring,TenantId from Tenants";//users where UserEmail = '" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {

      if (err) {
        callback(err);
      } else {

        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });

    //  request.on('row', function (columns) {
    // columns.forEach(function (column) {
    //  dataset.push({
    //  col: column.metadata.colName,
    // val: column.value
    //});
    //  newdata.push(columns);


    //  });   


    request.on('row', function (columns) {
      newdata.push(columns);
    });
    connection.execSql(request);

  });

}

//Offer


//Profile


//files

function GetRegFiles(data, callback) {
  // console.log(data.userid);
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  connection.on('connect', function (err) {
    var sql = "AddWebSiteImage"; //"insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";

    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      if (err) {
        //console.log(err);
        callback(err);
      } else {
        if (rowCount < 1) {

          callback(null, false);
          // console.log("zijij");
        } else {
          callback(null, newdata);
          //  console.log(newdata);
        }
      }
    });

    request.addParameter("imagestr", TYPES.VarChar, data.picstring);
    request.addOutputParameter('documentID', TYPES.Int);


    request.on('returnValue', function (parameterName, value, metadata) {
      //console.log(parameterName + ' = ' + value);      // number = 42
      newdata.push({
        "universalid": value
      });
    });

    connection.callProcedure(request);


  });

}


//Bring Images by Id
function GetImageStr(data, callback) {
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  console.log(data);

  //[0][owner id]
  connection.on('connect', function (err) {
    var sql = "Select top 1 Imagestr from WebSiteImages where ownerid='" + data[0] + "'";
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      if (err) {
        callback(err);
      } else {
        if (rowCount < 1) {
          callback(null, false);
        } else {
          callback(null, newdata);
        }
      }
    });



    connection.execSql(request);


  });

}
//



module.exports = {
  GetConfigmethod,
  Registeruser,
  LoginUser,
  TenantRegister,
  TenantLogin,
  OwnerRegister,
  OwnerLogin,
  GetBids,
  GetCardOwners,
  GetCardTenants,
  GetRegFiles,
  GetImageStr
};

/*

doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
 conn.on("error", async err => {
    server.log(["error", "data"], "connection pool error");
    server.log(["error", "data"], err);
    const req =  conn.request();
    req.query("SELECT * FROM [SalesLT].[Customer]")
    .then(function (recordset) {
      console.log(recordset);
      conn.close();
    })
    // Handle sql statement execution errors
    .catch(function (err) {
      console.log(err);
      conn.close();
    })
    await closePool();
}).then(function () {

  })
  // Handle connection errors
  .catch(function (err) {
    console.log(err);
    conn.close();
  });

*/
