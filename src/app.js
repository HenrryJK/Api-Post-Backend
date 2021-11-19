const express = require ('express')
const  morgan = require( 'morgan')

const  postsRoutes = require ('./routers/post.router')
const  rolesRoutes = require ('./routers/rol.router')
const  usersRoutes = require ('./routers/users.router')

const  authRoutes = require ('./routers/auth.router')
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/',function(req, res, next){
    res.send('Se ha establecido la Conexion , Bienvenido al Sistema!');
});
app.use('/auth', authRoutes);
app.use('/api/auth/posts', postsRoutes);
app.use('/api/auth/roles', rolesRoutes);
app.use('/api/auth/users', usersRoutes);
module.exports = app;