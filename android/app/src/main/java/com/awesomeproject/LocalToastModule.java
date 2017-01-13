package com.awesomeproject;

import android.widget.Toast;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import java.util.*;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class LocalToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public LocalToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LocalToastAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    //the annotation is for exposing the method to js
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message+"", duration).show();
    }


    //TODO: new ReactMethod to start intent ?
    @ReactMethod
    public void call(String number){
        Activity activity = getCurrentActivity();

        String uri = "tel:" + number.trim() ;
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setData(Uri.parse(uri));

        try {
            activity.startActivity(intent);
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(getReactApplicationContext(), "Could not find an activity to place the call: "+ uri, Toast.LENGTH_SHORT).show();
        }
    }
}