<template>
  <div>
    <form action="">
      <div>
        <BaseCheckbox label="capital" v-model="form_data.capital" />
      </div>
      <div>
        <BaseInput label="country" v-model="form_data.country" />
      </div>
      <div>
        <BaseInput label="name" v-model="form_data.name" />
      </div>
      <div>
        <BaseInput
          label="population"
          type="number"
          v-model="form_data.population"
        />
      </div>
      <div>
        <BaseInput label="region" v-model="form_data.region" />
      </div>
      <div>
        <BaseInput label="state" v-model="form_data.state" />
      </div>
    </form>

    <button @click="setDate">set data</button>

    <div>
      <h1>City Query</h1>
      <base-input label="City Name" v-model="city_name" />
      <p>Query: {{ city_data }}</p>
      <button @click="queryCity">query</button>
    </div>

    <div>
      <button @click="setVariableData">setVariable</button>
    </div>
  </div>
</template>

<script>
// import BaseRadio from '../components/form/BaseRadio'
import BaseInput from '../components/form/BaseInput'
// import BaseSelect from '../components/form/BaseSelect'
import BaseCheckbox from '../components/form/BaseCheckbox'
import firestore from '../firebase'
import firebase from 'firebase/compat'
import { reactive, ref } from 'vue'
export default {
  components: { BaseCheckbox, BaseInput },
  setup() {
    const form_data = reactive({
      capital: false,
      country: '',
      name: '',
      population: 1000,
      region: '',
      state: '',
    })
    const city_name = ref('')
    const city_data = ref('')

    const setDate = async () => {
      console.log(form_data.valueOf())
      await firestore
        .collection('cities')
        .doc('cities')
        .set({ country: 'USA' }, { merge: true })
    }

    const queryCity = async () => {
      // const doc = await firestore
      //   .doc('cities/' + city_name.value + '/test')
      //   .get()

      const cityRef = firestore.collection('cities')
      const doc = await cityRef.where('name', '>=', 'San Francisco')
      console.log(doc)
      if (doc.exists) {
        console.log(doc.data())
        city_data.value = doc.data().name
      } else {
        city_data.value = 'not result!'
      }
    }

    const setVariableData = async () => {
      var docData = {
        stringExample: 'Hello world!',
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: firebase.firestore.Timestamp.fromDate(
          new Date('December 10, 1815')
        ),
        arrayExample: [5, true, 'hello'],
        nullExample: null,
        objectExample: {
          a: 5,
          b: {
            nested: 'foo',
          },
        },
      }
      console.log('docData 看時間格式', docData)
      console.log('time', firebase.firestore.Timestamp.fromDate(new Date()))
      console.log(firebase.firestore)
      // const dataRef = firestore.collection('data')
      // await dataRef.doc('one').set(docData)
    }

    return {
      form_data,
      setDate,
      city_name,
      queryCity,
      city_data,
      setVariableData,
    }
  },
}
</script>

<style lang="scss" scoped></style>
