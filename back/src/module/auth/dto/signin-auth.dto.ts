import { PartialType } from "@nestjs/mapped-types";
import { SigUpAuthDto } from "./signup-auth.dto";

export class SigninAuthDto extends PartialType(SigUpAuthDto) {}
