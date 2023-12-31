import { Status } from '@grpc/grpc-js/build/src/constants';
import { BaseException, ErrorCodeType, MetadataType } from './base.exception';
import { IError } from './code.types';

export const CONFLICT: IError = {
  code: Status.FAILED_PRECONDITION, // grpc don't know about 409 so use precondition
  message: 'Conflict detected',
};

export class ConflictException extends BaseException {
  constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
    super(
      typeof customCode === 'string'
        ? { code: Status.FAILED_PRECONDITION, message: customCode }
        : customCode || CONFLICT,
      metadata,
    );
  }
}
