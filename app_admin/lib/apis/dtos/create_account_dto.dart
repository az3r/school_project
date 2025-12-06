import 'package:json_annotation/json_annotation.dart';

part 'create_account_dto.g.dart';

@JsonSerializable()
class CreateAccountDto {
  final String name;

  factory CreateAccountDto.fromJson(Map<String, dynamic> json) =>
      _$CreateAccountDtoFromJson(json);

  CreateAccountDto({required this.name});
  Map<String, dynamic> toJson() => _$CreateAccountDtoToJson(this);
}
