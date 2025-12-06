import 'package:app_admin/domains/models/account_model.dart';
import 'package:flutter/material.dart';

class AccountTable extends StatelessWidget {
  final List<AccountModel> accounts;

  const AccountTable({super.key, required this.accounts});

  @override
  Widget build(BuildContext context) {
    return DataTable(
      columns: [
        DataColumn(label: Text("ID")),
        DataColumn(label: Text("Name")),
        DataColumn(label: Text("Activated")),
      ],
      rows: accounts.map(_buildTableRowItem).toList(),
    );
  }

  DataRow _buildTableRowItem(final AccountModel account) {
    return DataRow(
      cells: [
        DataCell(Text(account.id)),
        DataCell(Text(account.name)),
        DataCell(Text(account.is_activated.toString())),
      ],
    );
  }
}
