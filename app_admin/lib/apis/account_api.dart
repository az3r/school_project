import 'dart:convert';

import 'package:app_admin/apis/api.dart';
import 'package:app_admin/apis/dtos/create_account_dto.dart';
import 'package:http/http.dart' as http;
import 'package:app_admin/domains/models/account_model.dart';

Future<List<AccountModel>> get_account_list() async {
  var url = Uri.http(base_api_url, "get_account_list");
  var response = await http.get(url);
  var json = jsonDecode(response.body) as List;
  return json.map<AccountModel>((a) => AccountModel.fromJson(a)).toList();
}

Future<AccountModel> create_account(CreateAccountDto dto) async {
  final url = Uri.http(base_api_url, "create_account");
  final response = await http.post(url, body: dto.toJson());
  final json = jsonDecode(response.body);
  return AccountModel.fromJson(json);
}
