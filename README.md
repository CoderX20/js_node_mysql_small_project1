# js_node_mysql_small_project1
学习node.js期间利用原生js做的小型项目，主要测试前后端数据传输的问题

## 运行项目

在项目文件夹所在终端中输入命令

```
node node_main.js
```

在浏览器中输入url:http://127.0.0.1:5500/login/

## 所用框架express

下载express

```
npm install express
```

## 数据库表结构

| id | username | password | status |
| -- | -------- | -------- | ------ |
| int | varchar(45) | varchar(45) | tinyint(1) |

