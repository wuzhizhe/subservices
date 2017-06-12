import helper from '../helpers.js';
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

    registerServiceWorker() {
      let self = this;
      // 检查是否支持service-worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./src/service-worker.js')
        .catch((err) => {
          self.showErrorMessage(
            'Unable to Register SW',
            'Sorry this demo requires a service worker to work and it ' +
            'failed to install - sorry :('
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
          'Sorry this demo requires service worker support in your browser. ' +
          'Please try this demo in Chrome or Firefox Nightly.'
        );
      }
    },
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