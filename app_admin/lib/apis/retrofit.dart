import 'package:app_admin/apis/dtos/create_account_dto.dart';
import 'package:app_admin/apis/dtos/update_account_activation_dto.dart';
import 'package:app_admin/domains/models/account_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'retrofit.g.dart';

@RestApi(baseUrl: "http://localhost:3000")
abstract class RetrofitClient {
  factory RetrofitClient(Dio dio, {String? baseUrl}) = _RetrofitClient;

  @GET("/get_account_list")
  Future<List<AccountModel>> get_account_list();

  @POST("/create_account")
  Future<AccountModel> create_account(@Body() CreateAccountDto dto);

  @POST("/update_account_activation")
  Future<AccountModel> update_account_activation(
    @Body() UpdateAccountActivationDto dto,
  );
}

final api = RetrofitClient(Dio());
