import admin from './firebase-admin';

type NotificationModel = {
  title: string;
  body: string;
  data?: {
    type: 'newFav' | 'newRecipe' | 'newFollower';
    recipeId?: string;
    userId?: string;
  };
};

const sendNotification = async (notif: NotificationModel, token: string): Promise<any> => {
  const message: any = {
    notification: {
      title: notif.title,
      body: notif.body,
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
        data: notif.data,
      },
    },
    token: token,
  };

  await admin.messaging().send(message);
};

const sendNotifications = async (notif: NotificationModel, tokens: string[]) => {
  const messages: any = {
    notification: {
      title: notif.title,
      body: notif.body,
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
        data: notif.data,
      },
    },
    tokens: tokens,
  };

  if (tokens.length > 0) await admin.messaging().sendMulticast(messages);
};

export default { sendNotification, sendNotifications };
