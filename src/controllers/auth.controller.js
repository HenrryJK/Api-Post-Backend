const pool = require('../database');

const jwt = require('jsonwebtoken');
const helpers = require('../libs/helpers'); 
const bcrypt = require('bcryptjs');
const refreshTokens = [];
const secret = "sos-secret-access-token";
const refreshTokenSecret = "sos-secret-refresh-access-token";

const authCtrl = {}

authCtrl.login = async (req, res)=>{
    try {
       const {username, password} = req.body;
       //console.log(pass);
       const response = await pool.query('select * from usuarios where username = $1', [username]);      
       if(response.rows.length!=0){           
           const passold = response.rows[0].password;
           if(await bcrypt.compare(password, passold)){
                const usuario = {
                    idusuario : response.rows[0].idusuario,                    
                    username : response.rows[0].nomuser
                }
                const accessToken = jwt.sign({usuario}, secret, {expiresIn:'7200s'});
                const refreshToken = jwt.sign({usuario}, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                
                
                
               
                return res.status(200).json({
                    accessToken,
                    refreshToken
                    
                });
           }else{
                return res.status(403).json({
                    message: 'Username o Password incorrectos...!'
                });
           }           
       }
       return res.status(403).json({
           message: 'Username o Password incorrectos...!'
       });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Error al validar usuario...!'});
    }    
};

module.exports = authCtrl;