/// <reference path="../typings/index.d.ts" />

import { get } from 'axios';
import { Decode } from './utils'
import { isRegExp } from 'util';
class GoogleMirror {
    public sourceUrl = 'https://raw.githubusercontent.com/xiaoyaozi1010/googleMirrorJson/master/googleMirror.json'
    constructor() {
        chrome.browserAction.onClicked.addListener((tab) => {
            // 删掉popup
            chrome.browserAction.setPopup({ popup: '' })
            chrome.browserAction.setIcon({ path: '../icons/loading.gif' }, () => {
                console.log('设置 icon 为 loading');
            })
            this.getData(this.sourceUrl)
                .then(res => {
                    chrome.browserAction.setIcon({ path: '../icons/icon128.png' }, () => {
                        console.log('设置 icon 为 normal')
                    });
                    if(res.status == 200 || res.status == 304) {
                        return this.getMirrorUrl(res.data)
                    }
                })
                .then(url => {
                        chrome.tabs.create({ url });
                        // chrome.browserAction.setPopup({
                        //     popup: './../popup.html'
                        // })
                    })
        })
    }
    async getMirrorUrl(urlHashes: string[]): Promise<any> {
        const urls = this.parseData(urlHashes);
        const url: string = await this.getFastest(urls);
        return new Promise((resolve, reject) => {
            resolve(url)
        })
    }
    private getData(url: string): any {
        return get(this.sourceUrl)
    }

    private parseData(allHash: string[]): any {
        let decode = new Decode();
        return allHash.map(_ => decode.resolve(_))
    }

    getFastest(urls: [string]) {
        let res: string = '';
        let temp: number[] = [];
        let allPromise = [];
        // todo: Promise 
        urls.forEach((url, i) => {
            allPromise.push(this.getRequestTime(url))
        })
        return Promise.race(allPromise)
    }
    getRequestTime(url): any {
        let imgEle: HTMLImageElement = document.createElement('img');
        let timestamp: number = Date.now();
        return new Promise((resolve, reject) => {
            let counter: number = 0;
            const sep = url[url.length - 1] === '/' ? '' : '/';
            imgEle.src = `${url}${sep}favicon.ico`;
            imgEle.addEventListener('load', () => {
                resolve(url)
            });
            // TODO: 请求成功后的url存入 cookie 或者 webDB, 设置过期时间
        })
    }
}

new GoogleMirror();