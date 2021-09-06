<template>
  <h1>Array</h1>
  <button @click="setCityData">setCityData</button>
  <div>
    <h1>Array-Contains</h1>
    {{ array_contains }}
    <div><button @click="queryArrayContains">query array-contains</button></div>
  </div>

  <div>
    <h1>IN | NOT IN</h1>
    <button @click="queryIn">query in</button>
    <button @click="queryNotIn">query not in</button>
  </div>

  <div>
    <h1>Array-Contains-any</h1>
    <button @click="queryArrayContainsAny">array contains any</button>
  </div>

  <div>
    <h1>Compound Query</h1>
    <button @click="compoundQuery">Compound Query</button>
  </div>

  <div>
    <h1>collections Group</h1>
    <button @click="collectionGroup">collection group</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import firestore from '@/firebase/'
export default {
  name: 'Array',
  setup() {
    const array_contains = ref('')
    const refCity = firestore.collection('cities')
    const showDocs = (query) => {
      if (!query.empty) {
        query.docs.forEach((doc) => {
          console.log(doc.data())
        })
      } else {
        console.log('query is nothing', query)
      }
    }

    const setCityData = async () => {
      const result = await refCity.doc('IN').set({
        name: 'Indonesia',
        state: null,
        country: 'Jakarta',
        capital: true,
        population: 78000000,
        regions: ['white beach', 'west_coast', 'west_coast', 'island'],
      })
      console.log(result)
    }

    const queryArrayContains = async () => {
      try {
        const query = await refCity
          .where('regions', 'array-contains', 'hebei')
          .get()
        showDocs(query)
      } catch (e) {
        console.log(e)
      }
    }

    const queryIn = async () => {
      // 最後一個參數一定是要Array
      const query = await refCity
        .where('regions', 'in', [['east_coast'], ['west_coast', 'norcal']])
        .get()
      showDocs(query)
    }

    const queryNotIn = async () => {
      const query = await refCity
        .where('name', 'not-in', ['Japan', 'USA', ''])
        .get()
      showDocs(query)
    }

    const queryArrayContainsAny = async () => {
      const query = await refCity
        .where('regions', 'array-contains-any', [
          'jingjinji',
          'hebei',
          'hebei',
          'hebei',
          'hebei',
          'hebei',
          'hebei',
          'hebei',
        ])
        .get()
      showDocs(query)
    }

    const compoundQuery = async () => {
      const query = await refCity
        .where('state', '==', 'CA')
        .where('state', '<=', 'IN')
        .get()
      showDocs(query)
    }

    const collectionGroup = async () => {
      const museum = firestore
        .collectionGroup('landmarks')
        .where('type', '==', 'museum')
      const query = await museum.get()
      showDocs(query)
    }

    return {
      array_contains,
      queryArrayContains,
      setCityData,
      queryIn,
      queryNotIn,
      queryArrayContainsAny,
      compoundQuery,
      collectionGroup,
    }
  },
}
</script>

<style scoped></style>
