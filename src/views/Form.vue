<template>
  <div>
    <h1>Create an event</h1>

    <form>
      {{ event }}
      <BaseSelect
        label="Select a category"
        :items="categories"
        v-model="event.category"
      />
      <!--      <label>Select a category</label>-->
      <!--      <select v-model="event.category">-->
      <!--        <option-->
      <!--          v-for="option in categories"-->
      <!--          :value="option"-->
      <!--          :key="option"-->
      <!--          :selected="option === event.category"-->
      <!--        >-->
      <!--          {{ option }}-->
      <!--        </option>-->
      <!--      </select>-->
      <h3>Name & describe your event</h3>

      <BaseInput label="text" type="text" v-model="event.title" />

      <BaseInput label="Description" type="text" v-model="event.description" />

      <h3>Where is your event?</h3>

      <BaseInput label="Location" type="text" v-model="event.location" />

      <h3>Are pets allowed?</h3>
      <div>
        <BaseRadio label="Yes" v-model="event.pets" :value="1" name="pets" />
      </div>

      <div>
        <BaseRadio label="No" v-model="event.pets" :value="2" name="pets" />
      </div>

      <h3>Extras</h3>
      <div>
        <BaseCheckbox v-model="event.extras.catering" label="Catering" />
      </div>

      <div>
        <base-checkbox v-model="event.extras.music" label="Live music" />
      </div>

      <div>
        <h1>Firebase Data</h1>
        {{ firebase_data }}
      </div>
      <button class="button -fill-gradient" type="submit">Submit</button>
      <button @click="fetchData" type="button">get data</button>
      <button @click="setData" type="button">set data</button>
      <button @click="createData" type="button">create data</button>

      <div>
        <h1>City</h1>
        {{ cities }}

        <div>
          <base-input label="city" v-model="city_name" />
          <button @click="fetchCity" type="button">get city</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseRadio from '../components/form/BaseRadio'
import BaseInput from '../components/form/BaseInput'
import BaseSelect from '../components/form/BaseSelect'
import BaseCheckbox from '../components/form/BaseCheckbox'
import firestore from '../firebase'

export default {
  components: { BaseInput, BaseSelect, BaseCheckbox, BaseRadio },
  created() {
    this.docRef = firestore.collection('deep')
    this.firebaseSnapShot()
  },
  data() {
    return {
      cities: null,
      city_name: '',
      docRef: null,
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false,
        },
      },
      firebase_data: '',
    }
  },
  methods: {
    firebaseSnapShot() {
      this.docRef.doc('sandwichData').onSnapshot((doc) => {
        if (doc && doc.exists) {
          this.firebase_data = doc.data()
        }
      })
    },
    async fetchData() {
      const doc = await this.docRef.doc('sandwichData').get()
      this.firebase_data = doc.data()
      console.log(this.firebase_data)
    },
    async setData() {
      const ref = this.docRef.doc('sandwichData')
      await ref.set({
        name: 'andy',
        age: 29,
        randomNumber: Math.random().toString(16).slice(2),
      })
    },
    createData() {
      const citiesRef = firestore.collection('cities')
      citiesRef.doc('SF').set({
        name: 'San Francisco',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 860000,
        regions: ['west_coast', 'norcal'],
      })
      citiesRef.doc('LA').set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000,
        regions: ['west_coast', 'socal'],
      })
      citiesRef.doc('DC').set({
        name: 'Washington, D.C.',
        state: null,
        country: 'USA',
        capital: true,
        population: 680000,
        regions: ['east_coast'],
      })
      citiesRef.doc('TOK').set({
        name: 'Tokyo',
        state: null,
        country: 'Japan',
        capital: true,
        population: 9000000,
        regions: ['kanto', 'honshu'],
      })
      citiesRef.doc('BJ').set({
        name: 'Beijing',
        state: null,
        country: 'China',
        capital: true,
        population: 21500000,
        regions: ['jingjinji', 'hebei'],
      })
    },
    async fetchCity() {
      const citiesRef = firestore.collection('cities')
      const doc = await citiesRef.doc(this.city_name).get()
      if (doc.exists) {
        this.cities = doc.data()
      } else {
        this.cities = `查無此 ${doc.id} 結果`
      }
    },
  },
}
</script>
