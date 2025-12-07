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
import az3r.me.app_client_android.ui.theme.AppTheme
import kotlinx.coroutines.launch

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
            sign_in_with_passkeys(context, request_json)
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

private suspend fun sign_in_with_passkeys(context: Context, request_json: String) {
    Log.i("sign_in_with_passkeys", request_json)
    val request =
        CreatePublicKeyCredentialRequest(requestJson = "{\"challenge\":\"-aOX6pbJ8h8KkERfbh22KWko2aVJtMGo9VLreGgCl_Q\",\"rp\":{\"name\":\"Az3r\",\"id\":\"com.me.az3r\"},\"user\":{\"id\":\"AAAAAAAE\",\"name\":\"tyan\",\"displayName\":\"\"},\"pubKeyCredParams\":[{\"alg\":-8,\"type\":\"public-key\"},{\"alg\":-7,\"type\":\"public-key\"},{\"alg\":-257,\"type\":\"public-key\"}],\"timeout\":60000,\"attestation\":\"none\",\"excludeCredentials\":[],\"authenticatorSelection\":{\"residentKey\":\"preferred\",\"userVerification\":\"preferred\",\"requireResidentKey\":false},\"extensions\":{\"credProps\":true},\"hints\":[]}");

    val response = credential_manager.createCredential(
        context,
        request,
    )

    Log.i("sign_in_with_passkeys", response.data.toString())
}