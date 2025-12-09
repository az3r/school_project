import 'dart:collection';

import 'package:app_admin/apis/dtos/create_account_dto.dart';
import 'package:app_admin/apis/dtos/update_account_activation_dto.dart';
import 'package:app_admin/apis/retrofit.dart';
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
    final accounts = await api.get_account_list();
    _accounts = accounts;
    notifyListeners();
  }

  Future<void> add_new_account(String name) async {
    final account = await api.create_account(CreateAccountDto(name: name));
    _accounts.add(account);
    notifyListeners();
  }

  Future<void> set_account_activation(
    AccountModel account,
    bool activated,
  ) async {
    final result = await api.update_account_activation(
      UpdateAccountActivationDto(account.id, activated),
    );
    final i = _accounts.indexOf(result);
    _accounts[i] = result;

    notifyListeners();
  }
}
