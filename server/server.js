const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json())


const userRoutes = require('./Users');
const tenantroutes = require('./Tenants');
const OwnerRoutes=require('./Owners');
const CardsRoutes=require('./Cards');
//bring tenantsn and owner

const CardTenants=require('./Cardstenants');
const CardOwners=require('./CardOwners');
const Bids=require('./Bids');

const MyFiles=require('./MyFiles');



app.use('/api/users', userRoutes);
app.use('/api/tenant', tenantroutes);
app.use('/api/owner', OwnerRoutes);

app.use('/api/card', CardsRoutes);
app.use('/api/bids', Bids);

app.use('/api/cardtenants', CardTenants);
app.use('/api/cardowners', CardOwners);
app.use('/api/MyFiles', MyFiles);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});


app.get('*',(req,res)=>{
  res.sendfile(path.resolve(__dirname,'build','index.html'));
});

//for authenticateion
//https://stackoverflow.com/questions/54845053/express-react-with-cors-setting-http-only-secure-cookie-for-react-spa
