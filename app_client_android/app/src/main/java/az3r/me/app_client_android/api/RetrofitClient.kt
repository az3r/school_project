package az3r.me.app_client_android.api

import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory

object RetrofitClient {
    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl("http://10.89.203.111:3000")
        .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
        .build()

    val core_service: CoreService by lazy {
        retrofit.create(CoreService::class.java)
    }
}