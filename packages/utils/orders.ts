import { ExecutedOrder, OrderOptions, OrderType } from '@debut/types';
import { getPrecision, percentChange } from './math';

/**
 * Reverse order type
 */
export function inverseType(type: OrderType) {
    return type === OrderType.BUY ? OrderType.SELL : OrderType.BUY;
}

/**
 * Generate synthetic order id from order
 */
export function syntheticOrderId(order: ExecutedOrder | OrderOptions) {
    return `${order.time}-${order.type}-${order.price}`;
}

/**
 * Get minimal increment value for float number with current precision
 */
export function getMinIncrementValue(price: number | string) {
    const precision = getPrecision(price);
    return Number(`${parseFloat('0').toFixed(precision - 1)}1`);
}

/**
 * Calculate order profit
 */
export function getProfit(order: ExecutedOrder, price: number) {
    const rev = order.type === OrderType.SELL ? -1 : 1;

    return (percentChange(price, order.price) / 100) * rev * order.executedLots;
}

/** Calculate batch orders profit */
export function getBatchProfit(orders: ExecutedOrder[], price: number) {
    let totalProfit = 0;

    for (const order of orders) {
        totalProfit += getProfit(order, price);
    }

    return totalProfit;
}
