const express = require("express");
const cors = require("cors");
const app = express();
const publicFolder = '../frontend/build';
const fs = require( "fs");


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/hopper.routes')(app);
// require('./routes/native.routes')(app);
require('./routes/tokenset.routes')(app);

app.use(express.static(publicFolder))
app.use('*',express.static(publicFolder))
const db = require("./models");
const Role = db.role;

//initial();
db.sequelize.sync({alter: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

async function initial() {

  let Roles = await db.role.findAll();
  if(!Roles || Roles.length==0){
      await Role.create({
        id: 1,
        name: "user"
      });
     
      await  Role.create({
        id: 2,
        name: "moderator"
      });
     
      await Role.create({
        id: 3,
        name: "admin"
      });
  }
}
app.listen(3000,"0.0.0.0" ,() => console.log(`Started server at http://localhost:3000!`));
