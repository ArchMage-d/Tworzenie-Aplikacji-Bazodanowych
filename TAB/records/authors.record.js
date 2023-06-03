const {pool} = require("../utils/db");
const {ValidationError} = require("../utils/errors");

class AuthorsRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
            throw new ValidationError('Imie powinno mieć od 3 do 55 znaków,')
        }
        if (!obj.surname || obj.surname.length < 3 || obj.surname.length > 55) {
            throw new ValidationError('Nazwisko powinno mieć od 3 do 55 znaków,')
        }
        this.author_id = obj.author_id;
        this.name = obj.name;
        this.surname = obj.surname;
    }
    async delete() {
        await pool.execute("DELETE FROM `authors` WHERE `author_id` = :id;", {
            id: this.author_id,
        });
    }
    async insert() {
        await pool.execute("INSERT INTO `authors` VALUES(:id, :name, :surname)", {
            id: '',
            name: this.name,
            surname: this.surname
        });
    }
    static async listAll() {
        const[result] = await pool.execute("SELECT * FROM `authors`");
        console.log(result);
        return result.map(obj => new AuthorsRecord(obj));
    }
    async update() {
        await  pool.execute("UPDATE `authors` SET `name` = :name, `surname` = :surname WHERE `author_id` = :id;", {
            id: this.author_id,
            name: this.name,
            surname: this.surname,
        });
    }

}
module.exports = {
    AuthorsRecord,
}