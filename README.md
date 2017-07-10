# mdc-sms-alidayu

Message Distributing Center (MDC) 专用微信模板消息适配器。

## 安装

```console
$ npm install --save mdc-sms-aliyun
```
or
```console
$ yarn add  mdc-sms-aliyun
```

## 使用

### 配置

在 MDC 配置文件中做好配置，如：

```javascript
{
  ...,
  "pubsub": {
    ...,
    "consumerAdapters": [{
      queueName: 'sms-aliyun',
      require: 'mdc-sms-aliyun',
      AccessKeyId:'',  //填写你的AccessKeyId,可以登录阿里云查找
      AccessKeySecret:'' //填写你的AccessKeySecret，可以登录阿里云查找
    }]
  }
}
```



### 消息格式

在生产者端生产消息的时候，注意使用这样的消息格式：



``` bash
/api/sms     `发送验证消息`
```


```js 
    {
      "tel": "XXXX",//短信接收号码
    }
```


``` bash
/api/smsByTemplate    `发送模板消息`
```

```js
  {
    "templateid": "1",
    "tel": "XXXX",
    "message": "xxx"
  }
```


### 贡献者 Contributors
老魏 @503945930  
徐晨 @shadow88sky
