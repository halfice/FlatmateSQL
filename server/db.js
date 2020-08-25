

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
    var sql='select * from users';
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

function Getusersd() {

  var data = [];
  var result = {};
  var connection = new Connection(GetConfigmethod());
  connection.on('connect', function (err) {
    request = new Request("select 42, 'hello world'", function(err, rowCount) {
      if (err) {
       // console.log(err);
      } else {
       // console.log(rowCount + ' rows');
      }
  
      connection.close();
    });
  
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          //console.log('NULL');
        } else {
          result[column.metadata.colName] = column.value;
        }
      });
    });
  
    request.on('done', function(rowCount, more) {
      //console.log(rowCount + ' rows returned');
      console.log(result);
      return result;
    });
  
    // In SQL Server 2000 you may need: connection.execSqlBatch(request);
    connection.execSql(request);
      
    }
  );
  

  
}

 function Getusers(data, callback){
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  connection.on('connect', function(err) {
  var sql = "SELECT * FROM users WHERE "+data.field+" LIKE '%"+data.params+"%'";;
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

      request.on('row', function(columns) {

          columns.forEach(function(column) {
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

function Registeruser(data, callback){
  var connection = new Connection(GetConfigmethod());
  var newdata = [];
  var dataset = [];
  connection.on('connect', function(err) {
 // var sql = "SELECT * FROM dbo."+data.entity+" WHERE "+data.field+" LIKE '%"+data.params+"%'";
var sql='insert into users values ()';
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

      request.on('row', function(columns) {

          columns.forEach(function(column) {
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
  Getusers,
  Registeruser
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