package com.iepsen.moviesapp

import android.app.Activity
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.Window
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.google.android.youtube.player.YouTubeIntents


class MainActivity : Activity() {
    private var webView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        setContentView(R.layout.activity_main)

        if (0 != applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) {
            WebView.setWebContentsDebuggingEnabled(true)
        }

        webView = findViewById(R.id.webview)
        webView?.settings?.javaScriptEnabled = true
        webView?.webViewClient = object : WebViewClient() {
            override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
                if (url === null) return

                val pattern = Regex("https?:\\/\\/[a-z0-9.:]+\\/#\\/video\\/([0-9a-zA-Z]+)")
                val match = pattern.find(url)
                if (match === null) return

                val (videoId) = match.destructured

                createIntent(videoId)

                super.doUpdateVisitedHistory(view, url, isReload)
            }
        }
        webView?.webChromeClient = WebChromeClient()
        webView?.loadUrl(BuildConfig.WEBVIEW_URL)
    }

    fun createIntent(videoId: String) {
        if (YouTubeIntents.canResolvePlayVideoIntent(this)) {
            startActivity(YouTubeIntents.createPlayVideoIntent(this, videoId))
        } else {
           val webIntent = Intent(Intent.ACTION_VIEW,
                Uri.parse("http://www.youtube.com/watch?v=$videoId"));

            startActivity(webIntent);
        }
        goBack()
    }

    private fun goBack() {
        when {
            webView?.canGoBack()!! -> webView!!.goBack()
            else -> super.onBackPressed()
        }
    }

    override fun onBackPressed() {
        goBack()
    }
}