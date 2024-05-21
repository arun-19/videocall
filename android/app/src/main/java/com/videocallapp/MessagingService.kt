package com.videocallapp

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import androidx.core.app.NotificationCompat
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingService
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
class MessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        displayNotification(remoteMessage)
    }

    private fun displayNotification(remoteMessage: RemoteMessage) {
        val channelId = "default"
        val notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle(remoteMessage.notification?.title)
            .setContentText(remoteMessage.notification?.body)
            .setSmallIcon(R.drawable.incoming)
            .build()

        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.notify(1, notification)
    }
}
