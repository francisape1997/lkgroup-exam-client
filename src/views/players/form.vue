<template>
<div class="ml-5 mr-10">

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ isCreatePage ? 'Create': 'Edit' }} Player
          </h3>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

                <!-- First Name -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    v-model="form.first_name"
                    type="text"
                    name="first-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <!-- Second Name -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="second-name" class="block text-sm font-medium text-gray-700">Second Name</label>
                  <input
                    v-model="form.second_name"
                    type="text"
                    name="second-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <!-- Last Name -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    v-model="form.last_name"
                    type="text"
                    name="last-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <!-- Date of Birth -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="date-of-birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    v-model="form.date_of_birth"
                    type="date"
                    name="date-of-birth"
                    min="1997-01-01" max="2030-12-31"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <!-- Height -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="height" class="block text-sm font-medium text-gray-700">Height ({{ metrics?.height }})</label>
                  <input
                    v-model="form.height"
                    type="number"
                    name="height"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <!-- Weight -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="weight" class="block text-sm font-medium text-gray-700">Weight ({{ metrics?.weight }})</label>
                  <input
                    v-model="form.weight"
                    type="number"
                    name="weight"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                :disabled="isLoading"
                :class="{ 'opacity-25 cursor-not-allowed': isLoading }"
                @click="$router.push('/players')"
                type="submit"
                class="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
              </button>

              <button
                @click="isCreatePage ? savePlayer() : updatePlayer()"
                :disabled="!isFormValid"
                :class="{ 'opacity-25 cursor-not-allowed': !isFormValid }"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {{ isCreatePage ? 'Save' : 'Update' }}
                  
                  <Spinner class="ml-3" v-if="isLoading"/>
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>

// Vue
import { ref, computed } from 'vue';

// Route
import { useRoute, useRouter } from 'vue-router';

// Http
import { http } from '../../services/http.js';

// Components
import Spinner from '../../components/spinner/index.vue';

// Lodash
import { cloneDeep } from 'lodash';

// Moment
import moment from 'moment';

export default {
    name: 'PlayerForm',

    components: {
        Spinner,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();

        const isLoading = ref(false);

        const metrics = ref(null);

        const form = ref({
            first_name: null,
            second_name: null,
            last_name: null,
            date_of_birth: null,
            height: null,
            weight: null,
        });

        const fetchPlayer = async () => {
            const response = await http.get(`player/${route.params.id}`);

            if (response.status === 200) {
                setPlayerForm(response.data);

                metrics.value = response.data.metrics;
            }
        };

        const setPlayerForm = (player) => {
            form.value.first_name = player.first_name;
            form.value.second_name = player.second_name;
            form.value.last_name = player.last_name;
            form.value.date_of_birth = moment(player.date_of_birth).format('YYYY-MM-DD');
            form.value.height = player.height;
            form.value.weight = player.weight;
        };

        const isCreatePage = computed(() => route.meta.page === 'create' ? true : false);

        const createPlayer = async () =>
        {
            const response = await http.get('player/create');

            if (response.status === 200) {
                metrics.value = response.data.metrics;
            }
        }

        // If the page is edit. Fetch the player info.
        if (!isCreatePage.value) {
            fetchPlayer();
        } else {
            createPlayer();
        }

        const isFormValid = computed(() => {
            const invalidValues = ['', null];

            const formValue = cloneDeep(form.value);

            delete formValue.second_name;

            for (const item of Object.values(formValue)) {
                if (invalidValues.includes(item)) {
                    return false;
                }
            }

            return true;
        });

        const savePlayer = async () => {
            isLoading.value = true;
            
            const response = await http.post('player', form.value);

            if (response.status === 200) {
                router.push('/players');
            }

            isLoading.value = false;
        };

        const updatePlayer = async () => {
            isLoading.value = true;

            const response = await http.put(`player/${route.params.id}`, form.value);

            if (response.status === 200) {
                router.push('/players');
            }

            isLoading.value = false;
        };

        return {
            form,
            isFormValid,
            isCreatePage,
            isLoading,
            metrics,

            savePlayer,
            updatePlayer,
        };
    },
};
</script>
