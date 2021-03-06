// CODE
db.code.createIndex( { category:1, code: 1 }, { unique: true } )
db.code.insertMany([
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'lotteryStatus',
    code: '1',
    categoryName: '一番赏状态',
    codeName: '新建',
    pid: null,
    order: 1
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'lotteryStatus',
    code: '2',
    categoryName: '一番赏状态',
    codeName: '使用中',
    pid: null,
    order: 2
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'lotteryStatus',
    code: '9',
    categoryName: '一番赏状态',
    codeName: '失效',
    pid: null,
    order: 9
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'machineLotteryStatus',
    code: '1',
    categoryName: '售货机一番赏状态',
    codeName: '即将到来',
    pid: null,
    order: 1
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'machineLotteryStatus',
    code: '2',
    categoryName: '售货机一番赏状态',
    codeName: '在售',
    pid: null,
    order: 2
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'machineLotteryStatus',
    code: '3',
    categoryName: '售货机一番赏状态',
    codeName: '售磐',
    pid: null,
    order: 3
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'machineLotteryStatus',
    code: '9',
    categoryName: '售货机一番赏状态',
    codeName: '失效',
    pid: null,
    order: 9
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'orderStatus',
    code: '0',
    categoryName: '订单状态',
    codeName: '未支付',
    pid: null,
    order: 1
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'orderStatus',
    code: '1',
    categoryName: '订单状态',
    codeName: '已支付',
    pid: null,
    order: 2
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    category: 'orderStatus',
    code: '9',
    categoryName: '订单状态',
    codeName: '已关闭',
    pid: null,
    order: 9
  },
]);



// 模块
db.module.createIndex( { code: 1 }, { unique: true } );
db.module.insertMany([
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'user',
    desc: '用户管理'
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'role',
    desc: '权限管理'
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'machine',
    desc: '售货机管理'
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'product',
    desc: '商品一览'
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'lottery',
    desc: '一番赏管理'
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'sales',
    desc: '销售一览'
  },
]);



// 角色
db.role.createIndex( { code: 1 }, { unique: true } );
db.role.insertMany([
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'MA',
    desc: '管理员',
    modules: ['user', 'role', 'machine', 'product', 'lottery', 'sales']
  },
  {
    createdAt: 1583239901945,
    updatedAt: 1583303619746,
    code: 'OP',
    desc: '操作员',
    modules: ['machine']
  },
]);



// 用户
db.user.createIndex( { emailAddress: 1 }, { unique: true } );
db.user.createIndex( { accountName: 1 }, { unique: true } );
db.user.insertMany([
    {
      createdAt: 1583239901945,
      updatedAt: 1583303619746,
      accountName: 'admin',
      emailAddress: 'admin@example.cn',
      password: '$2a$10$nd5LZPfrDoaSxYrilWoQ7udXhtltlWTkr3tW3.gKjKQRSwhraa5Pe',
      fullName: '系统管理员',
      isSuperAdmin: true,
      passwordResetToken: 'Z2Nud3P9vKRVEifWyhBWJw',
      passwordResetTokenExpiresAt: 1583377262413,
      tosAcceptedByIp: '',
      lastSeenAt: 1583303619746,
      role:'5e6091f71760196beb833e29'
    },
  ]
);



// 商品
db.product.createIndex( { ppid: 1 }, { unique: true } );



// 抽奖活动
db.lottery.createIndex( { name: 1 }, { unique: true } );



// 售货机
db.machine.createIndex( { machine_id:1 }, { unique: true } );



// 售货机库存
db.machine_stock.createIndex( { machine_id:1, product_id:1 }, { unique: true } );



// 微信用户
db.wxuser.createIndex( { openid:1 }, { unique: true } );



// 订单
db.order.createIndex( { orderNo:1 }, { unique: true } );



// 更新用户角色位MA的_id
var roleCursor = db.role.find({code: 'MA'});
var roleInfo = roleCursor.next();
db.user.update({accountName: 'admin'},{$set:{'role':roleInfo._id}});
