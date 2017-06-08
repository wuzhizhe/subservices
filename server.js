const webpush = require('web-push');
const subscriptions = [
  '{"endpoint":"https://fcm.googleapis.com/fcm/send/eqlzt6VSAvU:APA91bHlT27TgEXaMiOVxf-ebmavbfLCbOq_QoURn36_c1y3rIX9NxnQPhl4fjn_cXFO6i2E1mdFmp8xma9KICdvolCwUUvxDH3gci7WDjsG8w1YzplpR3c4krVTAUli9GKgNt4ut3iy","keys":{"p256dh":"BIELmT3zDGYfGHTsnlj0kuF3JiV2TJqSFwhYr-lEK_3spHLUJGN9pzLoJQcr7w9HDToV1yA7GZ_rWlOzoFO-dzU=","auth":"R5sPKqwneEtJ8X29VQqQoA=="}}',
	'{"endpoint":"https://fcm.googleapis.com/fcm/send/cp7w2zN8MqU:APA91bEWsfZr5JV4CuFZsTDTO6uMpUgJp26GdTp5rKOsgXy2__TTL4RhdetZF66RwbTs1r4QSKYlkAgr_MdjcvpmwkwSfXlNaygRdfdlLUU4NE82JiARnDzm9rQsa8URbvFDHl6H2e_L","keys":{"p256dh":"BG1kwBW66ZAkn5Kx8VMSSucEiyQo_cbD7mW0U5CFKVsIzEKpxBr5HoiWdpvZX4ycEdFIK5ZWgnOQv7r_M4ojkUk=","auth":"9FiQrkreRXgjkaES6SmCGQ=="}}',
	'{"endpoint":"https://fcm.googleapis.com/fcm/send/e8V5Tf9Ra5A:APA91bFmRZXhUHv1bsrNC1aJ4xSESgdaW7GAlLSolQqLUzlQzSRib9MX0J7Dn4QJlHiRYL--eyK6aXcuv1h8iRvwtIgtF_WEXu7GiZrVtlQU9zx1XY7tiapf2hGrptkKYVvX-6tbULPw","keys":{"p256dh":"BPKwZ7HIraIbahrLF9bYXqF86whwsNUtuVGT-MJx5T80XLgL3sSkBX314-3yyDArlT3IUI5VPzSdcWiysHaqpgM=","auth":"WDB-eFwSR7xVeoWs-EBwbw=="}}'
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

function sendMessage() {
	let promiseChain = Promise.resolve();
	for (let i = 0, length = subscriptions.length; i <  length; i++) {
	  promiseChain = promiseChain.then(() => {
	    return triggerPushMsg(JSON.parse(subscriptions[i]), '你好啊');
	  });
	}
}

const triggerPushMsg = function(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  });
};

sendMessage();