package com.example.letsea

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Ship(
    val name: String
) :Parcelable
