/**
 * Filename: g:\project\airplake\mdc-sms-aliyun\lib\consumer.js
 * Path: g:\project\airplake\mdc-sms-aliyun
 * Created Date: Mon Jul 10 2017
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

    this.sms = new AliyunSms(this.conf)
    this.on('message', function (message, callback) {
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
