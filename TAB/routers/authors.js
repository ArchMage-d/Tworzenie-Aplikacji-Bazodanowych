const {Router} = require("express");
const {AuthorsRecord} = require("../records/authors.record");

const authorsRouter = Router();

authorsRouter
    .get('/', async (req, res) => {
        const authorsList = await  AuthorsRecord.listAll();

        res.render('authors/authorsList', {
            authorsList,
        });

    })
    .post('/', async (req, res) => {
        const data = {
            ...req.body,
        }

        const newAuthor = new AuthorsRecord(data);
        await newAuthor.insert();

        res.redirect('/authors');
    })
    .patch('/', async (req, res) =>{
        const updatedData = {
            ...req.body,
        }

        const updatedAuthor = new AuthorsRecord(updatedData);
        await updatedAuthor.update();

        res.redirect('/authors');
    })


module.exports = {
    authorsRouter,
}