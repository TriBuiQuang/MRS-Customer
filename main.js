import Contract from 'Contract'
import Product from './product'
import User from './users'
class TokenMain extends Contract {
  static viewFuncs = [
    'getRequestSMS',
    'getRecieveTheConfirmSMS',
    'getCompleteRegistration'
  ]
  static authenticationFuncs = [
    'checkSMSFormat',
    'checkSMSFormatAfterConfirmSMS',
    'verify'
  ]
  static publicFuncs = [
    'createRegistrationRequestSMS',
    'getRequestSMS',
    'checkSMSFormat',
    'getRecieveTheConfirmSMS',
    'checkSMSFormatAfterConfirmSMS',
    'verify',
    'getCompleteRegistration'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MRSCUSTOMER'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._product = new Product(data)
    this._user = new User(data)
  }
   //---------------------Customer------------------------------
  async createRegistrationRequestSMS() {
    let customer = await this._user.createUsers('CUSTOMERSMS')
    return customer
  }
  getRequestSMS() {
    let customer = this._user.getUsersByType('CUSTOMERSMS')
    return customer
  }

  async checkSMSFormat() {
    let checkSMSFormat = this._product.getProductByAddress(this.sender)
    if (!checkSMSFormat || checkSMSFormat.type !== 'CUSTOMERSMS') throw 'SMS FORMAT IS NOT EXIST'
    let confirmSMS = await this._product.createProduct('CONFIRMSMS')
    this.setToAddress(confirmSMS.address)
    return { confirmSMS }
  }

  getRecieveTheConfirmSMS() {
    let recieveConfirmSMS = this._user.getUsersByType('CONFIRMSMS')
    return recieveConfirmSMS
  }

  async checkSMSFormatAfterConfirmSMS() {
    let CheckSMSFormatAfterConfirmSMS = this._product.getProductByAddress(this.sender)
    if (!CheckSMSFormatAfterConfirmSMS || CheckSMSFormatAfterConfirmSMS.type !== 'CONFIRMSMS') throw 'SMS FORMAT IS NOT EXIST'
    let exactData = await this._product.createProduct('EXACTDATA')
    this.setToAddress(exactData.address)
    return { exactData }
  }

  async verify() {
    let verify = this._product.getProductByAddress(this.sender)
    if (!verify || verify.type !== 'EXACTDATA') throw 'REGISTRATION IS FAILURE'
    let information = await this._product.createProduct('INFORMATION')
    this.setToAddress(information.address)
    return { information }
  }

  getCompleteRegistration() {
    let completeRegistration = this._user.getUsersByType('INFORMATION')
    return completeRegistration
  }

}
export default TokenMain