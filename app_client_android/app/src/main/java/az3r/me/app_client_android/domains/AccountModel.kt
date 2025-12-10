package az3r.me.app_client_android.domains

import kotlinx.serialization.Serializable

@Serializable
data class AccountModel(
    val id: String,
    val is_activated: Boolean
)
