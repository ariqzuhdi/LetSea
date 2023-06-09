package com.example.letsea

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.example.letsea.Auth.LoginActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnLogin: Button = findViewById(R.id.btn_login)

        btnLogin.setOnClickListener{
            startActivity(Intent(this@MainActivity, LoginActivity::class.java))
            finish()
        }
    }
}