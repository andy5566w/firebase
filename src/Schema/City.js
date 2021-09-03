class City {
  constructor() {
    // capital
    // country
    // name
    // population
    // regions
    // state
    for (const key in arguments[0]) {
      this[key] = arguments[0][key]
    }
    this.test = 'this si just test'
  }
}

export const cityConverter = {
  toFirestore: function () {
    const data = {}
    for (const key in arguments[0]) {
      data[key] = arguments[0][key]
    }
    console.log('set data to firebase ', data)
    data['extra'] = 'this is extra message'
    return data
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    console.log('come from firebase ', data)
    return new City(data)
  },
}
