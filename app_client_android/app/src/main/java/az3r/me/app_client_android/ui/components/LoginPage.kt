package az3r.me.app_client_android.ui.components

import android.app.Activity
import android.content.Context
import android.util.Log
import androidx.activity.compose.LocalActivity
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.credentials.CreatePublicKeyCredentialRequest
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetPasswordOption
import androidx.credentials.GetPublicKeyCredentialOption
import androidx.credentials.PublicKeyCredential
import az3r.me.app_client_android.api.RetrofitClient.core_service
import az3r.me.app_client_android.dtos.RegistrationOptionsDto
import az3r.me.app_client_android.dtos.VerifyRegistrationResponseDto
import az3r.me.app_client_android.globals.GlobalModules.credential_manager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

@Composable
fun LoginPage(modifier: Modifier = Modifier) {
    val context = LocalActivity.current as Activity
    val coroutine = rememberCoroutineScope()
    val state = rememberTextFieldState()
    val exception = remember { mutableStateOf<Exception?>(null) }

    return Column(
        modifier = modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
    ) {
        Text("Welcome to School", style = MaterialTheme.typography.headlineLarge)
        OutlinedTextField(
            state = state, label = { Text("ID") },
            placeholder = {
                Text("Enter your ID")
            },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            onKeyboardAction = {
                handle_sign_in(coroutine, context, state.text.toString(), exception)
            }
        )
        Button(onClick = {
            handle_sign_in(
                coroutine,
                context,
                state.text.toString(),
                exception
            )
        }) {
            Text("Sign in")
        }

        ErrorDialog(onDismissRequest = { exception.value = null }, exception = exception.value)
    }
}

private fun handle_sign_in(
    coroutine: CoroutineScope,
    context: Context,
    id: String,
    showDialog: MutableState<Exception?>
) {
    if (id.isEmpty()) return;

    coroutine.launch {
        runCatching {
            val is_registered = verify_account_registration(id)
            if (!is_registered) register_account_with_passkeys(context, id)
            else login_account_with_passkeys(context, id)
        }.onFailure {
            Log.e("passkeys", it.toString())
            showDialog.value = it as Exception
        }
    }
}

private suspend fun verify_account_registration(id: String): Boolean {
    val account = core_service.verify_account_registration(id)
    return account.is_activated
}

private suspend fun register_account_with_passkeys(context: Context, id: String) {
    val registration_options =
        core_service.generate_registration_options(RegistrationOptionsDto(id))

    val create_public_key_credential_request =
        CreatePublicKeyCredentialRequest(registration_options.toString())

    val create_credential_response = credential_manager.createCredential(
        context,
        create_public_key_credential_request,
    )

    val data =
        create_credential_response.data.getString("androidx.credentials.BUNDLE_KEY_REGISTRATION_RESPONSE_JSON")

    val response = data?.let {
        Json.decodeFromString<JsonObject>(data)
    }

    response?.let {
        core_service.verify_registration_response(
            VerifyRegistrationResponseDto(
                id,
                response
            )
        )
    }
}

private suspend fun login_account_with_passkeys(context: Context, id: String) {
    val registration_options = core_service.get_registration_options(id)
    val public_key_credential_options =
        GetPublicKeyCredentialOption(Json.encodeToString(registration_options))

    val credential_request = GetCredentialRequest(
        listOf(public_key_credential_options, GetPasswordOption()),
    )

    Log.i("passkeys", registration_options.toString())
    val get_credential_response = credential_manager.getCredential(context, credential_request)
    Log.i("passkeys", get_credential_response.credential.toString())

    val credential = get_credential_response.credential as PublicKeyCredential
    val responseJson = credential.authenticationResponseJson
    Log.i("passkeys", responseJson)
}