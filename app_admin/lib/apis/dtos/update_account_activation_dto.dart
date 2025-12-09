import 'package:json_annotation/json_annotation.dart';

part 'update_account_activation_dto.g.dart';

@JsonSerializable()
class UpdateAccountActivationDto {
  final String id;
  final bool is_activated;

  UpdateAccountActivationDto(this.id, this.is_activated);

  factory UpdateAccountActivationDto.fromJson(Map<String, dynamic> json) =>
      _$UpdateAccountActivationDtoFromJson(json);
  Map<String, dynamic> toJson() => _$UpdateAccountActivationDtoToJson(this);
}
