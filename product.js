import Contract from 'Contract'
class Product extends Contract {
  async createProduct (type) {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: type,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  async addProduct (type) {
    let address = await this.createProduct(type)
    this.setToAddress(address)
    return { type: address }
  }
  getProductByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getProductsByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Product