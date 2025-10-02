/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} phone
 * @property {'customer'|'driver'|'admin'} role
 * @property {string} [avatar]
 * @property {boolean} [isApproved] // for drivers
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} label
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {{latitude: number, longitude: number}} coordinates
 */

/**
 * @typedef {Object} Package
 * @property {number} weight
 * @property {{length: number, width: number, height: number}} dimensions
 * @property {'fragile'|'standard'|'electronics'|'documents'} type
 * @property {string} [description]
 */

/**
 * @typedef {Object} TrackingUpdate
 * @property {string} id
 * @property {'created'|'assigned'|'picked_up'|'in_transit'|'delivered'|'cancelled'} status
 * @property {Date} timestamp
 * @property {{latitude: number, longitude: number}} [location]
 * @property {string} [note]
 */

/**
 * @typedef {Object} Shipment
 * @property {string} id
 * @property {string} customerId
 * @property {string} [driverId]
 * @property {Address} pickupAddress
 * @property {Address} deliveryAddress
 * @property {Package} package
 * @property {'created'|'assigned'|'picked_up'|'in_transit'|'delivered'|'cancelled'} status
 * @property {number} estimatedCost
 * @property {string} estimatedDeliveryTime
 * @property {'stripe'|'paypal'|'cash'} paymentMethod
 * @property {'pending'|'paid'|'failed'} paymentStatus
 * @property {Date} createdAt
 * @property {TrackingUpdate[]} trackingHistory
 */

/**
 * @typedef {User & {
 *   vehicle: {
 *     type: 'motorcycle'|'car'|'van'|'truck',
 *     licensePlate: string,
 *     model: string
 *   },
 *   documents: {
 *     license: string,
 *     insurance: string,
 *     vehicleRegistration: string
 *   },
 *   ratings: {
 *     average: number,
 *     count: number
 *   },
 *   isOnline: boolean,
 *   currentLocation?: { latitude: number, longitude: number }
 * }} Driver
 */
