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

      <button class="button -fill-gradient" type="submit">Submit</button>
      <button @click="fetchData" type="button">get data</button>
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
  },
  data() {
    return {
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
    }
  },
  methods: {
    fetchData() {
      this.docRef
        .doc('sandwichData')
        .get()
        .then((doc) => {
          console.log(doc.data())
        })
    },
  },
}
</script>
