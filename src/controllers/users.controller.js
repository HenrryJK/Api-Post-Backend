const pool =  require('../database');
const helpers = require('../libs/helpers');
const UserCtr = {}

UserCtr.readUsers = async (req, res) => {
    try {
        const response = await pool.query('select * from usuarios');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}

UserCtr.readUserid = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select u.idusuario , u.username , u.password , u.estado , r.nombre from usuarios u , roles r where u.idrol = r.idrol and idusuario =$1;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


UserCtr.createUser = async (req, res) => {
    try {
        const { username, password,idrol } = req.body;
        const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into usuarios(username, password, idrol , estado) values($1,$2 , $3 , 1)', [username, password2,idrol]);
        return res.status(200).json(
            `El Post ${username}  ha sido regisrado!.`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error!');
    }
}

UserCtr.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { username , password , idrol } = req.body;
        const response = await pool.query('update usuarios set username = $1 , password =$2 , idrol=$3  where idusuario = $4;', [username , password , idrol, id]);
        return res.status(200).send(`El Post ${id} se ha sifo modificado.`);
            
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


UserCtr.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('UPDATE usuarios SET estado = 0 where idusuario = $1;', [id]);
        return res.status(200).json(
            `El usuario  ${id} ha sido dado de baja correctamente.`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}




module.exports = UserCtr;