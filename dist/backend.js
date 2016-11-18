!function(e){function n(o){if(r[o])return r[o].exports;var t=r[o]={exports:{},id:o,loaded:!1};return e[o].call(t.exports,t,t.exports,n),t.loaded=!0,t.exports}var r={};return n.m=e,n.c=r,n.p="",n(0)}([function(module,exports,__webpack_require__){eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\"use strict\";\n\nimport express from 'express';\nimport graphqlHTTP from 'express-graphql';\nimport mongoose from 'mongoose';\nimport jwt from 'jsonwebtoken';\nimport schema from './graphql';\nimport jwt_express from 'express-jwt';\nimport dotenv from 'dotenv';\nimport config from './config/config';\nimport logger from './config/logger';\nimport webpack from 'webpack';\nimport webpackConfig from './webpack.server.config';\nimport webpackHotMiddleware from 'webpack-hot-middleware';\nimport webpackMiddleware from 'webpack-dev-middleware'\n\nconst isDeveloping = (undefined) !== 'production';\n\n\n\nconst app = express();\ndotenv.load();\n\n// app.use(function(req, res, next) {\n//     var token = req.query.token || req.headers['x-access-token'];\n\n//     if (token) {\n\n//         // verifies secret and checks exp\n//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {\n//             if (err) {\n//                 return res.json({ success: false, message: 'Failed to authenticate token.' });\n//             } else {\n//                 // if everything is good, save to request for use in other routes\n//                 req.decoded = decoded;\n//                 next();\n//             }\n//         });\n\n//     } else {\n\n//         return res.status(403).send({\n//             success: false,\n//             message: 'No token provided.'\n//         });\n\n//     }\n// })\n\nvar compiler = webpack(webpackConfig);\nvar middleware = new webpackMiddleware(compiler, {\n    publicPath: webpackConfig.output.publicPath,\n    contentBase: 'http://localhost:3000',\n    stats: {\n        colors: true,\n        hash: false,\n        timings: true,\n        chunks: true,\n        chunkModules: true,\n        modules: true\n    }\n})\n\napp.use(middleware);\napp.use(webpackMiddleware(compiler));\n\napp.use(express.static(__dirname + 'dist'));\n\n\nconst authenticate = jwt_express({\n    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),\n    audience: process.env.AUTH0_CLIENT_ID\n});\n\n//GraphqQL server route\napp.use('/product', graphqlHTTP(req => ({\n    schema,\n    pretty: true,\n    graphiql: true\n})));\n\napp.use('/user', graphqlHTTP(req => ({\n    schema,\n    pretty: true,\n    graphiql: true\n})));\n\napp.use('/',function(req,res){\n\tres.send('vl')\n})\n\n// Connect mongo database\nmongoose.connect(config.db.uri, config.db);\n\n// start server\nvar server = app.listen(config.port, () => {\n    logger.debug('Leflair API listening at port', server.address().port);\n});\n\n/* WEBPACK VAR INJECTION */}.call(exports, \"\"))\n\n//////////////////\n// WEBPACK FOOTER\n// ./app.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./app.js?")}]);