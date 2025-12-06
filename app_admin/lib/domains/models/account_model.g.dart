// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountModel _$AccountModelFromJson(Map<String, dynamic> json) => AccountModel(
  json['id'] as String,
  json['name'] as String,
  json['is_activated'] as bool,
  DateTime.parse(json['updated_at'] as String),
);

Map<String, dynamic> _$AccountModelToJson(AccountModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'is_activated': instance.is_activated,
      'updated_at': instance.updated_at.toIso8601String(),
    };
