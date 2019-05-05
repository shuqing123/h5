// 用来管理离线存储功能的文件
// 相当于window

// 想要缓存
// 名字 版本号
const name = 'dachuiV7';
// 缓存哪些东西
// 想让浏览器去请求什么一个不落都填写在这里
const list = [
    './aa.html',
    './sw.js',
    './1.jpg',
];
// 用js控制让浏览器进行缓存
// 开始进行缓存 第一次进入到网页的时候触发
self.addEventListener('install', function (e) {
    // e.waitUntil 等代码之后才开始做事
    // caches缓存
    e.waitUntil(
        caches.open(name).then((cache) => cache.addAll(list))
    )
});

// 更新
self.addEventListener('activate', function (e) {
    // 1. 读取缓存列表
    e.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key => key !== name && caches.delete(key)))
        )
    );
    return self.clients.claim()
});

// fetch事件监听浏览器请求的事件
// f12里 network里显示的所有请求 都能被这个事件监听到
self.addEventListener('fetch', function (e) {
    // 如何去拦截浏览器默认向服务器请求的
    // 拦截浏览器请求, 别切可以指定请求哪些内容
    // 打开01.html的时候 浏览器是请求01.html
    // 拦截了 浏览器的请求 , 并且让浏览器去请求 test.html
    console.log(e.request);
    e.respondWith(
        // 如果缓存里有, 那么就使用缓存的内容, 没有的话 fetch去向服务器请求
        caches.match(e.request).then( response => response || fetch(response) )
    )
});
