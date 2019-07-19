# weapp-plugin-dashboard

[![npm](https://img.shields.io/npm/v/weapp-plugin-dashboard.svg)](https://www.npmjs.com/package/weapp-plugin-dashboard/)  [![license](https://img.shields.io/github/license/tower1229/weapp-plugin-dashboard.svg)]()

> 微信小程序仪表盘组件

![](https://refined-x.com/asset/a/weapp-plugin-dashboard.png)


## 安装与使用

1. 在小程序根目录（project.config.json中`miniprogramRoot`配置的目录）中执行`npm init`
2. 执行`npm i weapp-plugin-dashboard -S --production`
3. 微信开发者工具中打开`使用npm模块`配置，并执行“工具-构建npm”
4. 在小程序页面json文件中配置
```
"usingComponents": {
    "weapp-plugin-dashboard": "weapp-plugin-dashboard"
}
```
5. 在小程序页面中用`<weapp-plugin-dashboard />`标签引入组件

## 配置参数

完整的配置项及默认值如下：

```
<weapp-plugin-dashboard 
    min="0"                 // 最小值
    max="100"               // 最大值
    val="50"                // 当前值
    width="750"             // 组件宽度，单位rpx
    height="400"            // 组件高度，单位rpx
    colors="{{myColors}}"   // 仪表盘颜色分布
    >
</weapp-plugin-dashboard>
```

```
...
data: {
    myColors: [{
        percent: 50,
        color: '#67C23A'
    }, {
        percent: 80,
        color: '#E6A23C'
    }, {
        percent: 100,
        color: '#F56C6C'
    }]
}
...
```
