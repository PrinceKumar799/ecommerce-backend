/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Response,
  HttpCode,
  Inject,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SignInDto } from "src/auth/dto/singIn-dto";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Server } from "src/server/server.interface";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject("Server") private server: Server
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiCreatedResponse({ description: "User created successfully" })
  @ApiBadRequestResponse({ description: "User already exists" })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Log in existing user" })
  @ApiResponse({ status: 200, description: "User logged in successfully" })
  @ApiNotFoundResponse({ description: "user does not exist" })
  @ApiUnauthorizedResponse({ description: "Wrong Credentials" })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  singIn(@Body() singInDto: SignInDto) {
    return this.authService.singIn(singInDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all the users" })
  @ApiResponse({ status: 200, description: "All users reterived" })
  findAll() {
    const res = this.server.findAll();
    return res;
  }

  @UseGuards(AuthGuard)
  @Get("userDetails")
  @ApiOperation({ summary: "Get user by email" })
  @ApiResponse({
    status: 200,
    description: "User details retrieved successfully",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  findOne( @Request() req) {
   // if (req.user.userId !== +userId) throw new UnauthorizedException();
    return this.userService.findOneById(+req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update user by email" })
  @ApiResponse({
    status: 200,
    description: "User details updated successfully",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiInternalServerErrorResponse({
    description: "Could not complete the request",
  })
  update(
    @Param("id") email: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ) {
    if (req.user.email !== email) throw new UnauthorizedException();
    return this.userService.update(email, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":email")
  @ApiOperation({ summary: "Delete user by email" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiInternalServerErrorResponse({
    description: "Could not complete the request",
  })
  remove(@Param("email") email: string) {
    return this.userService.remove(email);
  }
}
