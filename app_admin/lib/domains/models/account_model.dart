import 'package:json_annotation/json_annotation.dart';

part 'account_model.g.dart';

@JsonSerializable()
class AccountModel {
  final String id;
  final String name;
  final bool is_activated;
  final DateTime updated_at;

  AccountModel(this.id, this.name, this.is_activated, this.updated_at);

  factory AccountModel.fromJson(Map<String, dynamic> json) =>
      _$AccountModelFromJson(json);
  Map<String, dynamic> toJson() => _$AccountModelToJson(this);
}
