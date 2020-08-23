const express = require('express')
const fs = require('fs')
const router = express.Router()


function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' +
        date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds()
}
function getRandomId() {
    return Math.floor(Math.random() * 100000000);
}

router.get('/', (req, res) => {
    fs.readFile(req.path1, function (err, data) {
        var person = data.toString();
        person = JSON.parse(person);
        res.render('index', {
            person,
        })
    })

})
router.post('/add', (req, res) => {
    var { text, sureBtn } = req.body
    var newObj = {
        id: String(getRandomId()),
        text,
        sureBtn: parseFloat(sureBtn),
        time: formatDate(new Date())
    }
    fs.readFile(req.path1, function (err, data) {
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.data.unshift(newObj);
        if (parseFloat(sureBtn) >= 0) {
            person.income += parseFloat(sureBtn)
        } else {
            sureBtn = Math.abs(sureBtn)
            person.pay += parseFloat(sureBtn)
        }
        person.balance = person.income - person.pay
        var str = JSON.stringify(person);
        fs.writeFile(req.path1, str, function (err) {
            if (err) {
                console.error(err);
            } else {
                res.send({
                    code: 200
                })
            }
        })
    })

})
router.get('/delete', (req, res) => {
    let { id } = req.query
    fs.readFile(req.path1, function (err, data) {
        var person = data.toString();
        person = JSON.parse(person);
        for (var i = 0; i < person.data.length; i++) {
            if (person.data[i]['id'] === id) {
                console.log(i)
                if (parseFloat(person.data[i].sureBtn) >= 0) {
                    person.balance -= parseFloat(person.data[i].sureBtn)
                    person.income -= parseFloat(person.data[i].sureBtn)
                } else {
                    person.balance += Math.abs(person.data[i].sureBtn)
                    person.pay -= Math.abs(person.data[i].sureBtn)
                }
                person.data.splice(i, 1);
            }
        }
        var str = JSON.stringify(person);

        fs.writeFile(req.path1, str, function (err) {
            if (err) {
                console.error(err);
            } else {
                res.send({
                    code: 200
                })
            }

        })
    })
})
module.exports = router