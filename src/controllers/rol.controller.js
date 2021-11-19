const pool =  require('../database');
const RolCtr = {}


RolCtr.readRoles = async (req, res) => {
    try {
        const response = await pool.query('select * from roles');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}

RolCtr.readRolid = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from roles where idrol = $1;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


RolCtr.createRol = async (req, res) => {
    try {

        const { nombre } = req.body;
        await pool.query('INSERT INTO roles( nombre) values ($1);', [nombre]);
        return res.status(200).json(
            `El Rol ${nombre}  ha sido regisrado!.`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error!');
    }
}

//// falta aqui avanza rapido por favor 
RolCtr.updateRol = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {  nombre } = req.body;
        const response = await pool.query('update roles set nombre = $1 where idrol = $2;', [nombre, id]);
        return res.status(200).send(`El Rol ${id} se ha sifo modificado.`);
            
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


RolCtr.deleteRol = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM roles where idrol=$1', [id]);
        return res.status(200).json(
            `El Rol  ${id} se ha eliminado correctamente.`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}

module.exports = RolCtr;