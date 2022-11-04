const axios = require('axios');
// 设置跨域请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 定义post请求方法
const axiosPost = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
// 定义get请求方法
const axiosGet = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params,
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
//  定义获取token方法
async function getToken() {
    const params = {
        grant_type: 'client_credential',
        appid: 'wxc8f1de19677636e0', // appid  
        secret: 'e65cb73a29de83bdb1085ce7c24beb96', // AppSecret
    };
    let res = await axiosGet('https://api.weixin.qq.com/cgi-bin/token', params);
    return res.data.access_token;
};

async function getQingHua(){
    let res = await axiosGet('https://api.vvhan.com/api/moyu?type=json')
    return res.data.url;
};

async function templateMessageSend() {
    const token = await getToken();// 获取token
    const QingHua = await getQingHua()
    // 
    const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
    const params = {
        touser: 'oLs2s5w7ztacdbpUjfFgHt4Hai8I', // 用户openid 
        template_id: 'l32PwCFVJtT7PoJPbYBk3vp_U6rymEjyG-NxDbEI9PM', // 模板id 
        // url: 'http://www.baidu.com', // 
        topcolor: '#FF0000',// 标题颜色
        data: {
            text1: {
                "value": "内容1",
                "color": "#FCA60B"  
            },
            text2: {
                "value": "内容2",
                "color": "#FCA60B"  
            },
            QingHua: {
                "value": QingHua,
                "color": "#ff1a75"
            },
            // 以此类推
        },
    };
    let res = await axiosPost(url, params);
    console.log('res: ', res.data);
}
//  执行发送订阅消息
templateMessageSend();

