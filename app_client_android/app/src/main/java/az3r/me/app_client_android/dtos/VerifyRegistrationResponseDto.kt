package az3r.me.app_client_android.dtos

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

@Serializable
data class VerifyRegistrationResponseDto(
    val id: String,
    val response: JsonObject
)
