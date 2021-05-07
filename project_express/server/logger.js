const moment = require('moment');
const fs = require('fs');

const logUserAction = (req, action) => {
    fs.readFile('./server/db/userLog.json', 'utf-8',(err, data) => {
        if (err) {
            console.log(err);
        } else {
            let userLog = JSON.parse(data);
            fs.readFile('./server/db/products.json', 'utf-8',(err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let findItem = JSON.parse(data).find(el => el.id_product === +req.params.id);
                    if (findItem) {
                        let newAction = {
                            time: moment().format('DD MM YY, hh:mm:ss a'),
                            product: findItem.product_name,
                            action: action,
                        }
                        userLog.push(newAction);
                        fs.writeFile('./server/db/userLog.json', JSON.stringify(userLog, null, 4),(err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });
        }
    });
}

module.exports = logUserAction;