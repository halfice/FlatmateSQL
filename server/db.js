
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');

GetConfigmethod = () => {
  var config = {
    server: 'abdulazizdevops.database.windows.net',
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
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "AddTenants"; //"insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";

    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      
      request.input("userid",sql.Nvarchar(450), data.userid);
      request.input("Room_in_an_existing",sql.Nvarchar(450), data.Room_in_an_existing);
      request.input("Area",sql.Nvarchar(1450), data.Area);
      request.input("Rent",sql.Nvarchar(450), data.Rent);
      request.input("DatetoCome",sql.Nvarchar(450), data.DatetoCome);
      request.input("HowDays",sql.Nvarchar(450), data.HowDays);
      request.input("RoomFurnishing",sql.Nvarchar(450), data.RoomFurnishing);
      request.input("Internet",sql.Nvarchar(450), data.Internet);
      request.input("BathRoomType",sql.Nvarchar(450), data.BathRoomType);
      request.input("Parking",sql.Nvarchar(450), data.Parking);
      request.input("MaxNumberoflatemate",sql.Nvarchar(450), data.MaxNumberoflatemate);
      request.input("picstring",sql.Nvarchar(max), data.picstring);
      request.input("thisplaceisfor",sql.Nvarchar(450), data.thisplaceisfor);
      request.input("myname",sql.Nvarchar(450), data.myname);
      request.input("age",sql.Nvarchar(450), data.age);
      request.input("gender",sql.Nvarchar(450), data.gender);
      request.input("employeestatus",sql.Nvarchar(450), data.employeestatus);
      request.input("lifestyle",sql.Nvarchar(450), data.lifestyle);
      request.input("abouturselfparagraph",sql.Nvarchar(450), data.abouturselfparagraph);
      request.input("itemid",sql.Nvarchar(450), data.itemid);
      request.input("lifestyleid",sql.Nvarchar(450), data.lifestyleid);
      request.input("emploeestatusid",sql.Nvarchar(450), data.emploeestatusid);
      request.input("genderid",sql.Nvarchar(450), data.genderid);
      request.input("placeforid",sql.Nvarchar(450), data.placeforid);
      
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

//Owners
function OwnerRegister(data, callback) {
  console.log(data);
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  var universalid = data[2];
  connection.on('connect', function (err) {
    var sql = "AddOwner"; // "insert into users values ('" + data[1] + "','" + data[0] + "','" + data[3] + "','" + data[2] + "','" + data[2] + "','" + data[2] + "')";

    //console.log(sql);
    var Request = require('tedious').Request;
    var request = new Request(sql, function (err, rowCount) {
      request.input("LoginUserID", sql.Nvarchar(450), data.LoginUserID);
      request.input("location", sql.Nvarchar(450), data.location );
      request.input("typeofAccomodation", sql.Nvarchar(450), data.typeofAccomodation );
      request.input("propertyAddress", sql.Nvarchar(450), data.propertyAddress );


      request.input("totalbed", sql.Nvarchar(450), data.totalbed );
      request.input("totalbathrooms", sql.Nvarchar(450), data.totalbathrooms );
      request.input("parking", sql.Nvarchar(450), data.parking );
      request.input("internet", sql.Nvarchar(450), data.internet );


      request.input("roomename", sql.Nvarchar(450), data.roomename );
      request.input("roomtype", sql.Nvarchar(450), data.roomtype );
      request.input("roomfuninishing", sql.Nvarchar(450), data.roomfuninishing );
      request.input("bathroom", sql.Nvarchar(450), data.bathroom );


      request.input("bedsize", sql.Nvarchar(450), data.bedsize );
      request.input("roomfeatures", sql.Nvarchar(450), data.roomfeatures );
      request.input("rent", sql.Nvarchar(450), data.rent );
      request.input("bonds", sql.Nvarchar(450), data.bonds );

      request.input("bills", sql.Nvarchar(450), data.bills );
      request.input("picstring", sql.Nvarchar(450), data.picstring );
      
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

//Bid
function GetBids(data, callback) {
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

//Offer


//Profile


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