import 'dart:developer';

import 'package:app_admin/domains/models/account_model.dart';
import 'package:app_admin/domains/stores/account_store.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AccountTable extends StatelessWidget {
  final List<AccountModel> accounts;

  const AccountTable({super.key, required this.accounts});

  @override
  Widget build(BuildContext context) {
    return SelectionArea(
      child: DataTable(
        columns: [
          DataColumn(label: Text("ID")),
          DataColumn(label: Text("Name")),
          DataColumn(label: Text("Activated")),
        ],
        rows: accounts.map((v) => _build_table_row_item(context, v)).toList(),
      ),
    );
  }

  DataRow _build_table_row_item(BuildContext context, AccountModel account) {
    return DataRow(
      cells: [
        DataCell(Text(account.id)),
        DataCell(Text(account.name)),
        DataCell(
          Switch(
            value: account.is_activated,
            onChanged: (activated) {
              _update_account_activation(context, account, activated);
            },
          ),
        ),
      ],
    );
  }

  void _update_account_activation(
    BuildContext context,
    AccountModel account,
    bool activated,
  ) {
    log("update_account_activation");
    final store = Provider.of<AccountStore>(context, listen: false);
    store.set_account_activation(account, activated);
  }
}
