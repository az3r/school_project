import 'package:app_admin/ui/account/add_account_form.dart';
import 'package:flutter/material.dart';

class AddAccountDialog extends StatelessWidget {
  const AddAccountDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return SimpleDialog(
      constraints: BoxConstraints(minWidth: 600, minHeight: 200),
      title: Row(
        children: [
          Text("Add New Account"),
          Spacer(),
          CloseButton(onPressed: () => Navigator.pop(context)),
        ],
      ),

      contentPadding: EdgeInsetsGeometry.symmetric(
        horizontal: 16,
        vertical: 12,
      ),
      children: [
        AddAccountForm(onSubmit: (name) => _handleAddAccount(context, name)),
      ],
    );
  }

  void _handleAddAccount(BuildContext context, String name) {
    Navigator.pop(context, name);
  }
}
