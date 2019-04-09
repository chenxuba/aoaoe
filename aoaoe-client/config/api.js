const host = process.env.API_HOST

module.exports = {
    API_MENU: host + '/api/menu', //获取分类列表
    API_BANNER: host + '/api/banner',//获取轮播图
    API_SHOPLIST: host + '/api/shoplist/all',//获取全部商铺
}