<template>
  <div>
    <p>{{ cities }}</p>
    <button @click="transactionIncrementPopulation">
      increment population
    </button>

    <p>Multiple Doc: {{}}</p>
    <ul>
      <li v-for="doc in multiple_doc" :key="doc.country">{{ doc }}</li>
    </ul>
    <div>
      <button @click="fetchMultipleDoc">multiple doc</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import firestore from '../firebase'
export default {
  name: 'Transaction',
  setup() {
    const cityRef = firestore.collection('cities')
    const DCRef = firestore.collection('cities').doc('DC')
    const cities = ref({})
    const multiple_doc = ref([])
    const realtime = async () => {
      cityRef.doc('DC').onSnapshot((doc) => {
        cities.value = doc.data()
      })
    }
    realtime()

    const transactionIncrementPopulation = async () => {
      await firestore.runTransaction(async (transaction) => {
        const DC = await transaction.get(DCRef)
        const newPopulation = DC.data().population + 1
        await transaction.update(DCRef, { population: newPopulation })
      })
    }

    const fetchMultipleDoc = async () => {
      multiple_doc.value = []
      const querySnapshot = await cityRef
        .where('population', '>', 1000000)
        .orderBy('population')
        .get()
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        multiple_doc.value.push(doc.data())
      })
    }

    return {
      cities,
      multiple_doc,
      transactionIncrementPopulation,
      fetchMultipleDoc,
    }
  },
}
</script>

<style scoped></style>
