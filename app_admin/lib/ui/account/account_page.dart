import 'package:app_admin/domains/stores/account_store.dart';
import 'package:app_admin/ui/account/account_layout.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<AccountStore>(
      create: (BuildContext context) => AccountStore(),
      child: AccountLayout(),
    );
  }
}
