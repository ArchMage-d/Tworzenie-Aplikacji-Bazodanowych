const {pool} = require("../utils/db");

class ReviewsRecord {
    constructor(obj) {
        this.review = obj.review;
        this.book_title = obj.book_title;
        this.name = obj.name;
    }

    static async listAll() {
        const[result] = await pool.execute("SELECT `book_reviews`.`review`, `books`.`book_title`, `clients`.`name` FROM `book_reviews` JOIN `books` ON `book_reviews`.`book_isbn` = `books`.`book_isbn` JOIN `clients` ON `book_reviews`.`client_id` = `clients`.`client_id`;");
        console.log(result);
        return result.map(obj => new ReviewsRecord(obj));
    }
}
module.exports = {
    ReviewsRecord,
}