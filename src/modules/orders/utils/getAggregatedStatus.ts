import type { DELIVERY_STATUS, ORDER_STATUS } from '../types'

export const getAggregatedStatus = (orderStatus: ORDER_STATUS, deliveryStatus: DELIVERY_STATUS) => {
  // Define the mappings for the aggregated statuses based on orderStatus and deliveryStatus
  const statusMappings = {
    completed: ['Order completed', 2]

    // Add more mappings as needed
  }

  // Find the matching aggregated status based on orderStatus and deliveryStatus
  for (const [aggregatedStatus, statusArr] of Object.entries(statusMappings)) {
    if (statusArr.includes(orderStatus) && statusArr.includes(deliveryStatus)) {
      console.log('aggregatedStatus', aggregatedStatus)
      return aggregatedStatus
    }
  }
}
