import helper from '../public/helpers.js';
export default {
  name: 'home',
  data () {
    return {
      registration: null,
      msg: 'This is the home page ',
      agreeinfo: '请同意网站发送通知',
      subscribe: false
    }
  },
  mounted() {
    // this.getPermissionGranted();
    this.registerServiceWorker();
    // this.setUpPushPermission();
  },
  methods: {

    // 注册service worker
    registerServiceWorker() {
      let self = this;
      // 检查是否支持service-worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
        .catch((err) => {
          self.showErrorMessage(
            '抱歉，无法注册serviceworker，不能使用各项服务。'
          );
          console.error(err);
        })
        .then(function (registration) {
            var serviceWorker;
            if (registration.active) {
                self.registration = registration;
                serviceWorker = registration.active;
                // self.subscribeDevice(registration)
                self.setUpPushPermission(registration);
            }
            if (serviceWorker) {
              // serviceWorker.addEventListener('statechange', function (e) {
              // });
            }
        });
      } else {
        self.showErrorMessage(
          'Service Worker Not Supported',
          'Sorry this service requires service worker support in your browser. ' +
          'Please try this in Chrome or Firefox Nightly.'
        );
      }
    },

    // 检查是否已经注册了设备
    setUpPushPermission() {
      let self = this;
      return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        return serviceWorkerRegistration.pushManager.getSubscription();
      }).then(function (subscription) {
        if (!subscription) {
          self.subscribeDevice();
          return;
        } else {
          self.deviceSubed();
        }
      }).catch(function (err) {
        console.log('setUpPushPermission() ', err);
      });
    },

    // 注册设备
    subscribeDevice() {
      let self = this;
      return self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: helper.base64UrlToUint8Array('BLg1zLaKf6zNf9OOxKDc_Frmnp6t71As5yCWl0nvxxUnMy7uBf7ofnvWeektc8KxuZfILf4nEeqQ1xWiYpKUP4I')
      })
      .then((subscription) => {
        self.showSubscription(subscription)
      })
      .catch((subscriptionErr) => {
        throw subscriptionErr;
      });
    },

    // 授权允许通知
    getPermissionGranted() {
      let self = this;
      return new Promise((resolve, reject) => {
        if (Notification.permission === 'denied') {
          return reject(new Error('Push messages are blocked.'));
        }

        if (Notification.permission === 'granted') {
          return resolve('granted');
        }

        if (Notification.permission === 'default') {
          Notification.requestPermission((result) => {
            if (result !== 'granted') {
              reject(new Error('Bad permission result'));
            }
            resolve('granted');
          });
        }
      })
    },

    // 设备已注册
    deviceSubed() {
      this.agreeinfo = '已经同意网站发送通知';
      this.subscribe = true;
    },

    showErrorMessage(msg) {
      alert(msg);
    },

    showSubscription(data) {
      let codeDom = document.querySelector('.subscription');
      codeDom.innerHTML  = JSON.stringify(data);
    }

  }
}
