package az3r.me.app_client_android.api

import az3r.me.app_client_android.domains.AccountModel
import az3r.me.app_client_android.dtos.RegistrationOptionsDto
import az3r.me.app_client_android.dtos.VerifyRegistrationResponseDto
import kotlinx.serialization.json.JsonObject
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface CoreService {
    @POST("/generate-registration-options")
    suspend fun generate_registration_options(@Body payload: RegistrationOptionsDto): JsonObject

    @POST("/verify-registration-response")
    suspend fun verify_registration_response(@Body payload: VerifyRegistrationResponseDto)

    @GET("/verify-account-registration")
    suspend fun verify_account_registration(@Query("id") id: String): AccountModel

    @POST("/generate-authentication-options")
    suspend fun generate_authentication_options(@Body payload: RegistrationOptionsDto): JsonObject

    @POST("/verify-authentication-response")
    suspend fun verify_authentication_response(@Body payload: VerifyRegistrationResponseDto): JsonObject
}
