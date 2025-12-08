package az3r.me.app_client_android

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.credentials.CreatePublicKeyCredentialRequest
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetPublicKeyCredentialOption
import az3r.me.app_client_android.api.RetrofitClient
import az3r.me.app_client_android.ui.theme.AppTheme
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

private lateinit var credential_manager: CredentialManager;

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        credential_manager = CredentialManager.create(this)

        setContent {
            AppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    SignIn(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun SignIn(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val request_json = stringResource(R.string.server_register_options)
    val coroutine = rememberCoroutineScope()

    Log.i("SignIn", request_json)

    val handleSignIn: () -> Unit = {
        coroutine.launch {
            sign_in_with_passkeys(context)
        }
    }

    return Column(
        modifier = modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
    ) {
        Text("Welcome to School", style = MaterialTheme.typography.headlineLarge)
        Button(onClick = handleSignIn) {
            Text("Sign in")
        }
    }
}

private suspend fun sign_in_with_passkeys(context: Context) {
    val core_service = RetrofitClient.core_service
    val registration_options = core_service.generate_registration_options()
    val create_public_key_credential_request =
        CreatePublicKeyCredentialRequest(registration_options.toString())

    val create_credential_response = credential_manager.createCredential(
        context,
        create_public_key_credential_request,
    )

    val public_key_credential_options =
        GetPublicKeyCredentialOption(Json.encodeToString(registration_options))

    val credential_request = GetCredentialRequest(
        listOf(public_key_credential_options),
    )

    val prepare_get_credential = credential_manager.prepareGetCredential(credential_request)
    val get_credential_response = prepare_get_credential.pendingGetCredentialHandle.let {
        if (it == null)
            credential_manager.getCredential(context, credential_request)
        else credential_manager.getCredential(context, it)
    }


    val credential = get_credential_response.credential
    Log.i("passkeys", credential.toString())

//    val dto = VerifyRegistrationResponseDto("3Fv1me")
//    core_service.verify_registration_response()
}