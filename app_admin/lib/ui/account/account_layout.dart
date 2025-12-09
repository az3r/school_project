import 'package:app_admin/domains/stores/account_store.dart';
import 'package:app_admin/ui/account/account_table.dart';
import 'package:app_admin/ui/account/add_account_dialog.dart';
import 'package:app_admin/ui/alerts/api_error_alert_dialog.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:provider/provider.dart';

class AccountLayout extends StatelessWidget {
  const AccountLayout({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AccountStore>(
      builder: (BuildContext context, AccountStore value, Widget? child) {
        final account_store = value;
        return Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 1600),
            child: Scaffold(
              appBar: AppBar(
                title: const Text('Manage Accounts'),
                actions: [
                  IconButton(
                    tooltip: "Add new account",
                    onPressed: () => _handleAddAccount(context, account_store),
                    icon: Icon(Icons.add),
                  ),
                ],
              ),
              body: AccountTable(accounts: account_store.accounts),
            ),
          ),
        );
      },
    );
  }

  void _handleAddAccount(
    BuildContext context,
    AccountStore account_store,
  ) async {
    final result =
        await showDialog(
              context: context,
              builder: (context) => AddAccountDialog(),
            )
            as String?;
    if (result == null) return;

    try {
      await account_store.add_new_account(result);
    } on ClientException catch (e) {
      if (context.mounted)
        showDialog(
          context: context,
          builder: (builder) {
            return ApiErrorAlertDialog(error: e);
          },
        );
    }
  }
}
