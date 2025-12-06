import 'dart:collection';

import 'package:app_admin/apis/account_api.dart';
import 'package:app_admin/apis/dtos/create_account_dto.dart';
import 'package:app_admin/domains/models/account_model.dart';
import 'package:flutter/material.dart';

class AccountStore extends ChangeNotifier {
  List<AccountModel> _accounts = [];

  UnmodifiableListView<AccountModel> get accounts =>
      UnmodifiableListView(_accounts);

  AccountStore() {
    set_accounts_from_api();
  }

  void set_accounts_from_api() async {
    final accounts = await get_account_list();
    _accounts = accounts;
    notifyListeners();
  }

  Future<void> add_new_account(String name) async {
    final account = await create_account(CreateAccountDto(name: name));
    _accounts.add(account);
    notifyListeners();
  }
}
