package az3r.me.app_client_android.api

import az3r.me.app_client_android.dtos.VerifyRegistrationResponseDto
import kotlinx.serialization.json.JsonObject
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface CoreService {
    @POST("/generate-registration-options")
    suspend fun generate_registration_options(): JsonObject

    @Headers(
        "Content-Type: application/json",
    )
    @POST("/verify-registration-response")
    suspend fun verify_registration_response(@Body response: VerifyRegistrationResponseDto)
}
