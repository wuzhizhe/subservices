/* eslint-env browser */
window.onload = function() {
  registerServiceWorker();
  subscribeDevice();
}

function registerServiceWorker() {
  // 检查是否支持service-worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .catch((err) => {
      showErrorMessage(
        'Unable to Register SW',
        'Sorry this demo requires a service worker to work and it ' +
        'failed to install - sorry :('
      );
      console.error(err);
    });
  } else {
    showErrorMessage(
      'Service Worker Not Supported',
      'Sorry this demo requires service worker support in your browser. ' +
      'Please try this demo in Chrome or Firefox Nightly.'
    );
  }
}

function subscribeDevice() {
  return new Promise((resolve, reject) => {
    if (Notification.permission === 'denied') {
      return reject(new Error('Push messages are blocked.'));
    }

    if (Notification.permission === 'granted') {
      return resolve();
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission((result) => {
        if (result !== 'granted') {
          reject(new Error('Bad permission result'));
        }

        resolve();
      });
    }
  })
  .then(() => {
    // We need the service worker registration to access the push manager
    return navigator.serviceWorker.ready
    .then((serviceWorkerRegistration) => {
      return serviceWorkerRegistration.pushManager.subscribe(
        {
          userVisibleOnly: true,
          applicationServerKey: window.base64UrlToUint8Array('BLg1zLaKf6zNf9OOxKDc_Frmnp6t71As5yCWl0nvxxUnMy7uBf7ofnvWeektc8KxuZfILf4nEeqQ1xWiYpKUP4I')
          // applicationServerKey: this._publicApplicationKey,
        }
      );
    })
    .then((subscription) => {
      console.log(subscription);
      alert(JSON.stringify(subscription));
      showSubscription(subscription)
    })
    .catch((subscriptionErr) => {
      throw subscriptionErr;
    });
  })
  .catch(() => {
    // Check for a permission prompt issue
  });
}

function showSubscription(data) {
  let codeDom = document.querySelector('.subscription');
  codeDom.innerHTML  = JSON.stringify(data);
}

function showErrorMessage(msg) {
  alert(msg);
}