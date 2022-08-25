import { Relationship,CheckCounterparty, RelationshipsArray } from "./common"

export type CheckDepositStatus = "AwaitingImages" | "AwaitingFrontImage" | "AwaitingBackImage" | "Pending" | "PendingReview" |
    "Rejected" | "Clearing" | "Sent" | "Canceled" | "Returned"

export interface CheckDeposit {
    /**
     * Identifier of the check deposit resource.
     */
    id: string

    /**
     * 	Type of the check deposit resource. The value is always checkDeposit.
     */
    type: "checkDeposit"

    /**
     * JSON object representing the check deposit resource.
     */
    attributes: {
        /**
         * Date only. The date the resource was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * One of AwaitingImages, AwaitingFrontImage, AwaitingBackImage, Pending, PendingReview, Rejected, Clearing, Sent, Canceled, Returned.
         */
        status: CheckDepositStatus

        /**
         * Optional. More information about the status.
         */
        reason?: string

        /**
         * Check Deposit description (maximum of 50 characters).
         */
        description: string

        /**
         * The amount (cents) of the check deposit.
         */
        amount: number

        /**
         * Optional. The serial number printed at the bottom of the check
         */
        checkNumber?: number

        /**
         * Optional. The party the check belongs to.
         */
        counterparty?: CheckCounterparty

        /**
         * Optional. See Tags.
         */
        tags?: object

        /**
         * Optional. See Idempotency.
         */
        idempotencyKey?: string
        //TODO: do we need this?
    }

    /**
     * Describes relationships between the check deposit resource and other resources
     */
    relationships: {
        /**
         * The Deposit Account receiving the check deposit.
         */
        account: Relationship

        /**
         * The Customer the deposit account belongs to.
         * This relationship is only available if the account belongs to a single customer, business or individual.
         */
        customer?: Relationship

        /**
         * The list of Customers the deposit account belongs to.
         * This relationship is only available if the account belongs to multiple individual customers.
         */
        customers?: RelationshipsArray

        /**
         * The Check Deposit Transaction generated by this check deposit.
         */
        transaction: Relationship
    }
}

export interface CreateCheckDepositRequest {
    type: "checkDeposit"
    attributes: {
        /**
         * The check amount (in cents) to deposit.
         */
        amount: number

        /**
         * Optional. Description of the check deposit (maximum of 50 characters).
         */
        description?: string

        /**
         * Optional. See Tags.
         */
        tags?: object

        /**
         * Optional. See Idempotency.
         */
        idempotencyKey?: string
    }

    relationships: {
        /**
         * The account receiving the check deposit.
         */
        account: Relationship
    }
}

export interface PatchCheckDepositRequest {
    checkDepositId: string

    data: {
        type: "checkDeposit"
        attributes: {
            tags?: object
        }
    }
}

export interface UploadCheckDepositRequest {
    checkDepositId: string
    isBackSide?: boolean
    file: Buffer
}