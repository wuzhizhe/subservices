import helper from '../public/helpers.js';
export default {
  name: 'home',
  data () {
    return {
      msg: 'This is the home page ',
      subscribe: false
    }
  },
  mounted() {
    this.getPermissionGranted();
    this.registerServiceWorker();
  },
  methods: {

    // 注册service worker
    registerServiceWorker() {
      let self = this;
      // 检查是否支持service-worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./src/public/service-worker.js')
        .catch((err) => {
          self.showErrorMessage(
            '抱歉，无法注册serviceworker，不能使用各项服务。'
          );
          console.error(err);
        })
        .then(function (registration) {
            var serviceWorker;
            if (registration.active) {
                serviceWorker = registration.active;
                self.subscribeDevice(registration)
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

    setUpPushPermission() {
        var _this2 = this;

        this._permissionStateChange(Notification.permission);

        return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
          // Let's see if we have a subscription already
          return serviceWorkerRegistration.pushManager.getSubscription();
        }).then(function (subscription) {
          if (!subscription) {
            // NOOP since we have no subscription and the permission state
            // will inform whether to enable or disable the push UI
            return;
          }

          _this2._stateChangeCb(_this2._state.SUBSCRIBED);

          // Update the current state with the
          // subscriptionid and endpoint
          _this2._subscriptionUpdate(subscription);
        }).catch(function (err) {
          console.log('setUpPushPermission() ', err);
          _this2._stateChangeCb(_this2._state.ERROR, err);
        });
      }
    },

    // 注册设备
    subscribeDevice(registration) {
      let self = this;
      return registration.pushManager.subscribe({
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

    showErrorMessage(msg) {
      alert(msg);
    },

    showSubscription(data) {
      let codeDom = document.querySelector('.subscription');
      codeDom.innerHTML  = JSON.stringify(data);
    }

  }
}
