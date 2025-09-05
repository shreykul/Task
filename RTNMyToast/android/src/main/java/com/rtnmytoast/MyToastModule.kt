package com.rtnmytoast

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext


class MyToastModule(val context: ReactApplicationContext) :NativeMyToastSpec(context){

    companion object {
        const val NAME = "RTNMyToast"
    }

 override fun initialize() {
    }

    override fun invalidate() {
    }

    override fun showToast(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
}
