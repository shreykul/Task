package com.rtnmytoast

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class MyToastPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == MyToastModule.NAME) {
            MyToastModule(reactContext) as NativeModule 
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            moduleInfos[MyToastModule.NAME] = ReactModuleInfo(
                MyToastModule.NAME,
                MyToastModule.NAME,
                false,
                false,
                true,
                false,
                true
            )
            moduleInfos
        }
    }
}
