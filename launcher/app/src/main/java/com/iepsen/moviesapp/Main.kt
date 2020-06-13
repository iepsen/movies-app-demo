package com.iepsen.moviesapp

import android.app.Activity
import android.os.Bundle
import android.view.Window
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        setContentView(R.layout.activity_main)
        val webview: WebView = findViewById(R.id.webview)
        webview.settings.javaScriptEnabled = true
        webview.webViewClient = WebViewClient()
        // webview.loadUrl("http://192.168.10.190:8080")
        webview.loadUrl("http://movies-app-demo.s3-website-us-west-2.amazonaws.com/")
    }
}