/**
 * Filename: g:\project\airplake\mdc-sms-alidayu-v2\lib\consumer.js
 * Path: g:\project\airplake\mdc-sms-alidayu-v2
 * Created Date: Wed Jul 05 2017
 * Author: Wy
 *
 * Copyright (c) 2017 Your Company
 */

'use strict'

const EventEmitter = require('events').EventEmitter
const AliyunSms = require('./sms')

/**
 *
 *
 * @class SmsConsumer
 * @extends {EventEmitter}
 */
class AliyunSmsConsumer extends EventEmitter {
  constructor (conf) {
    super()

    const self = this
    this.conf = conf || {}

    console.log('conf',conf)
    this.sms = new AliyunSms(this.conf)

// {
//       AccessKeyId: 'LTAICx31wDeCcck4',
//       AccessKeySecret: '6Sdl4lHj4wIZMIYSe23ij3JXWqwhvs'
//     }
    this.on('message', function (message, callback) {
     // self.conf.smsOption.sms_template_code = message.templateId

// self.send()

//       self.alidayu = new Alidayu(self.conf.clientOption, self.conf.smsOption)
console.log('message',message)
      self.send(message, function (err, info) {
        if (err) {
          console.error(err)
          return callback(err)
        }

        console.log('Sent.', info)
        return callback()
      })
    })
  }

  /**
   *
   *
   * @param {any} message
   * @param {any} callback
   * @memberof SmsConsumer
   */
  send (message, callback) {
    // let obj = {
    //   PhoneNumbers: '18575740461', // 要发送到短信的手机
    //   SignName: '悦夜NightPlus', // 短信签名，阿里云短信平台申请
    //   TemplateCode: 'SMS_76555069', // 短信模板Code，阿里云短信平台申请
    //   TemplateParam: '{"name":"徐晨"}', // 短信模板中参数指定，以你的为准替换之
    //   OutId: ''// 可选
    // }
    
    this.sms.sendRegistSms(message).then((res) => {
      console.log('res', res.Code)
      if (res.Code === 'OK') {
        console.log('发送成功')
        return callback(null, res)
      }
      console.log('失败', res.result)
      return callback(new Error((res || {}).errmsg || '未知错误。'))
    }).catch((err) => {
      console.error('err', err)
      return callback(err, null)
    })
  }
}

module.exports = AliyunSmsConsumer


