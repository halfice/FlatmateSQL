
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

function getCustomers() {
  var data = [];
  var result = {};
  var connection = new Connection(GetConfigmethod());
  connection.on('connect', function (err) {
    var sql = 'select * from users';
    var request = new Request(sql, function (err) {
      if (err) {
        console.log(err);
      }
    });

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        result[column.metadata.colName] = column.value;
      });
      // console.log(result)
      return result;
    });
    connection.execSql(request);
  });

}


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



module.exports = {
  GetConfigmethod,
  getCustomers,
  Registeruser,
  LoginUser
  // anotherMethod
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