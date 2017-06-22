const webpush = require('web-push');
const subscriptions = [
  '{"endpoint":"https://fcm.googleapis.com/fcm/send/e8RZJCMDl2w:APA91bH5knYYT_33EC2f_UGCYCRi-i5_GIvFVj6C4SkGIo36VuWL3bZDUge1VlmamG_ddwva6dhKrEC95UOapMccwrlgHygumY98Oh_VxOb_A7p38SnWBikZW2CN8VDCAHO_i1sYIMJZ","keys":{"p256dh":"BC-ikyUts7hG5eUVZa245DwTFvSpd4SW2PKOeZzcMxLNj9CdLP7yaE1ykZPllG1eRFuw5PKCrluxULmN08H6jEc=","auth":"hHT1W1SZsnUnCvDPRbvVwA=="}}'
];

const vapidKeys = {
  publicKey: 'BLg1zLaKf6zNf9OOxKDc_Frmnp6t71As5yCWl0nvxxUnMy7uBf7ofnvWeektc8KxuZfILf4nEeqQ1xWiYpKUP4I',
  privateKey: 'P-6qEYATyi82pvsoq61IBMQ04tID4VzJ7wu6omRfyso'
};

webpush.setVapidDetails(
  // 'mailto:web-push-book@gauntface.com',
  'mailto:wuzhizhemu569@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function sendMessage () {
  let promiseChain = Promise.resolve();
  for (let i = 0, length = subscriptions.length; i < length; i++) {
    promiseChain = promiseChain.then(() => {
      return triggerPushMsg(JSON.parse(subscriptions[i]), '你好啊');
    });
  }
}

const triggerPushMsg = function (subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
    .catch((err) => {
      if (err.statusCode === 410) {
        console.log(err)
      } else {
        console.log('Subscription is no longer valid: ', err);
      }
    });
};

sendMessage();