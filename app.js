const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(function (req, res, next) {
    req.path1 = path.join(__dirname, 'data', 'data.json')
    next()
})


// 配置模板引擎
// 1.定义模板引擎---访问html后缀文件时，引擎都会调用swig.renderFile方法解析文件
app.engine('html', swig.renderFile)
// 2.配置模板文件存放目录---第一个是固定参数，第二个是设置的当前的目录
app.set('views', './views')
// 3.注册所使用的模板引擎---第一个参数固定，第二个参数为app.engine中第一个参数
app.set('view engine', 'html')
// 开发时使用---默认会读取缓存的文件，这个是要每次去除缓存
swig.setDefaults({ cache: false })

app.use(bodyParser.urlencoded({ extended: false }))

// 静态资源配置
app.use(express.static(__dirname + '/public'))


// 划分路由
app.use('/', require('./routers/main'))

app.listen(80)
console.log('程序运行在80端口')