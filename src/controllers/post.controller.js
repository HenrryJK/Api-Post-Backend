const pool =  require('../database');
const PostCtr = {}

PostCtr.readPosts = async (req, res) => {
    try {
        const response = await pool.query('select * from posts');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}

PostCtr.readPostid = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from posts where idpost = $1;', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


PostCtr.createPost = async (req, res) => {
    try {

        const { titulo , descripcion } = req.body;
        await pool.query('INSERT INTO posts( titulo,descripcion) values ($1,$2   );', [titulo, descripcion]);
        return res.status(200).json(
            `El Post ${titulo}  ha sido regisrado!.`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error!');
    }
}

PostCtr.updatePost = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo , descripcion } = req.body;
        const response = await pool.query('update posts set titulo = $1 , descripcion =$2  where idpost = $3;', [titulo, descripcion, id]);
        return res.status(200).send(`El Post ${id} se ha sifo modificado.`);
            
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}


PostCtr.deletePost = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM posts where idpost=$1', [id]);
        return res.status(200).json(
            `El Post  ${id} se ha eliminado correctamente.`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error!');
    }
}




module.exports = PostCtr;