import { Status } from '@grpc/grpc-js/build/src/constants';
import { BaseException, MetadataType } from './base.exception';

export type ValidationError<T> = {
  [key in keyof T]: string[];
};

export class ValidationException<T> extends BaseException {
  constructor(
    validationErrors: ValidationError<T>,
    metadata: MetadataType = {},
  ) {
    super(
      {
        code: Status.INVALID_ARGUMENT,
        message: JSON.stringify(validationErrors),
      },
      metadata,
    );
  }
}
