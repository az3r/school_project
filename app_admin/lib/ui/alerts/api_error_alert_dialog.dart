import 'package:flutter/material.dart';
import 'package:http/http.dart';

class ApiErrorAlertDialog extends StatelessWidget {
  final ClientException error;
  const ApiErrorAlertDialog({super.key, required this.error});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return AlertDialog(
      constraints: BoxConstraints(minWidth: 600, minHeight: 200),
      backgroundColor: colorScheme.error,
      title: Text("Api Error", style: TextStyle(color: colorScheme.onError)),
      content: Text(
        error.toString(),
        style: TextStyle(color: colorScheme.onError),
      ),
    );
  }
}
