import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { OrderError, OrderErrorCode } from '../../core/orders/order.errors';

const STATUS_BY_CODE: Record<OrderErrorCode, HttpStatus> = {
  INVALID_CHECKOUT: HttpStatus.BAD_REQUEST,
  PRODUCT_NOT_AVAILABLE: HttpStatus.CONFLICT,
  INSUFFICIENT_STOCK: HttpStatus.CONFLICT,
  IDEMPOTENCY_CONFLICT: HttpStatus.CONFLICT,
  ORDER_NOT_FOUND: HttpStatus.NOT_FOUND,
  FORBIDDEN: HttpStatus.FORBIDDEN,
  INVALID_TRANSITION: HttpStatus.CONFLICT,
  PAYMENT_NOT_CONFIRMED: HttpStatus.CONFLICT,
  PAYMENT_REFUND_REQUIRED: HttpStatus.CONFLICT,
  PAYMENT_PROVIDER_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
  CHECKOUT_CONFIGURATION_INVALID: HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch(OrderError)
export class OrderExceptionFilter implements ExceptionFilter<OrderError> {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: OrderError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest();
    const status = STATUS_BY_CODE[exception.code];
    const message = status >= 500 ? 'Le traitement de la commande a échoué.' : exception.message;

    this.adapterHost.httpAdapter.reply(response, {
      statusCode: status,
      error: exception.code,
      message,
      requestId: request.headers['x-request-id'],
    }, status);
  }
}