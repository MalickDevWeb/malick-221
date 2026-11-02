# Backend Core

The orders vertical slice follows dependency inversion and can be extracted behind an HTTP or message adapter without moving domain rules:

- `src/core/orders`: framework-free contracts, pricing, status policy, and repository/provider ports.
- `src/application/orders`: use-case orchestration and reservation-expiry worker.
- `src/infrastructure/orders`: Prisma repositories and environment-backed adapters.
- `src/api/orders`: NestJS controllers, DTO validation, response mapping, and HTTP exception mapping.
- `src/common/auth`: JWT verification, live account/role revalidation, and RBAC guards.

The Nest module binds interfaces with explicit tokens (`ORDERS_REPOSITORY`, `CHECKOUT_POLICY`, and `PAYMENT_AVAILABILITY`). Application and core code do not import Prisma models. `OutboxEvent` records domain events in the same transaction as the order; a separate publisher can later deliver them to Redis/BullMQ or a message broker.

## Order API

All order routes require `Authorization: Bearer <JWT>`. The token must contain `sub` (user ID) and `role`; the API also confirms that the account remains active and that the role still matches the database.

- `POST /orders/checkout` (`CLIENT`): requires `Idempotency-Key`, `paymentMethod`, `shippingAddress`, and `{ productId, quantity }[]`. Prices, stock, shop status, delivery fee, and commission are calculated on the server. A basket is split into one sub-order per shop.
- `GET /orders/me` and `GET /orders/me/:id` (`CLIENT`): only the authenticated client's orders are returned.
- `GET /orders/vendor/sub-orders` and `GET /orders/vendor/sub-orders/:id` (`VENDOR`): only sub-orders for shops owned by the authenticated seller are returned.
- `PATCH /orders/vendor/sub-orders/:id/status` (`VENDOR`): accepts `ACCEPTED`, `PREPARING`, `SHIPPED`, or `REJECTED`, subject to the server-side state machine. Refusal requires a reason.

The checkout currently enables cash on delivery only. Wave/Orange Money/Free Money return `503` until their payment adapters and signature-verified webhook handlers are configured. A redirect, screenshot, or client-supplied payment status never confirms a payment. No card number, CVV, wallet PIN, or OTP is accepted or stored by this order API.

## Database and validation

After setting `DATABASE_URL` and `JWT_ACCESS_SECRET` (at least 32 random characters):

```sh
npm run prisma:generate --workspace=backend
npm run prisma:migrate --workspace=backend
npm run test --workspace=backend
npm run build --workspace=backend
```

The initial PostgreSQL migration is versioned under `prisma/migrations`. The checkout locks product rows in deterministic order, persists stock reservations/movements, sub-orders, commission snapshots, and outbox events in one transaction. Unpaid reservation expiry is processed with `FOR UPDATE SKIP LOCKED`, allowing multiple API instances to run the worker safely.

The API exposes `GET /health/live` as a process liveness check and `GET /health/ready` as a readiness check that executes `SELECT 1` against PostgreSQL. Readiness returns a server error if the database is unreachable, so load balancers and deployment smoke tests can keep an unhealthy instance out of service.

`DEFAULT_COMMISSION_PERCENTAGE`, `DEFAULT_SHIPPING_FEE_PER_SHOP`, and `STOCK_RESERVATION_MINUTES` configure the initial pricing policy. Commission applies to item totals only; delivery is excluded. Future versioned commission rules should replace this adapter without changing checkout planning.

## Production launch rules

These rules are mandatory before going live:

- WhatsApp messages, screenshots, or client messages are not proof of payment or purchase.
- A checkout order is only valid once it has been created and validated by the business workflow.
- Commission calculation is allowed only after a valid order and controlled payout eligibility.
- Vendor withdrawal is blocked if available balance is insufficient or the order is disputed/refunded.
- All changes to order status, payout state, and payment status must produce audit entries.
- Payment providers must use webhook verification and signed callbacks before confirming success.

This backend is designed to enforce these rules server-side; the UI alone must never be trusted as a source of truth for money movement.