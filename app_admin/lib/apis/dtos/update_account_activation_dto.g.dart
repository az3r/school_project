// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'update_account_activation_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UpdateAccountActivationDto _$UpdateAccountActivationDtoFromJson(
  Map<String, dynamic> json,
) => UpdateAccountActivationDto(
  json['id'] as String,
  json['is_activated'] as bool,
);

Map<String, dynamic> _$UpdateAccountActivationDtoToJson(
  UpdateAccountActivationDto instance,
) => <String, dynamic>{
  'id': instance.id,
  'is_activated': instance.is_activated,
};
