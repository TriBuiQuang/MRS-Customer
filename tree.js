import Contract from 'Contract'
class Tree extends Contract {
  async createTree () {
    console.log(this.name)
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'TREE',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getTreeByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getTrees () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'TREE') lists.push(account)
    })
    return lists
  }
}
export default Tree