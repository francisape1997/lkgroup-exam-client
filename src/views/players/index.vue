<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Players</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
            @click="$router.push('/player/create')"
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                Add player
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

            <div v-if="selectedPlayers.length > 0">
              <button
                @click="deleteModalOpen = true"
                type="button"
                class="inline-flex ml-2 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                    Delete
                </button>
            </div>

            <table
                class="min-w-full table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">

                <tr>
                  <th
                    scope="col"
                    class="relative w-12 px-6 sm:w-16 sm:px-8">

                    <!-- Multi Select -->
                    <input
                        v-model="selectAllChecked"
                        :checked="selectedPlayers.length > 0"
                        @change="selectAll()"
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                    />

                  </th>
                  <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Full Name</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>

              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">

                <tr
                    v-for="player in players"
                    :key="player.email"
                >

                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">

                    <div
                        class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
                    </div>

                    <input
                        v-model="selectedPlayers"
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        :value="player.id"/>
                  </td>

                  <td class="whitespace-nowrap py-4 pr-3 text-sm font-medium">
                    {{ player.id }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ player.full_name }}
                  </td>

                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                    <button
                        @click="$router.push(`/player/${player.id}/edit`)"
                        class="text-indigo-600 hover:text-indigo-900">
                        Edit
                    </button>

                  </td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

    <Modal
        :open="deleteModalOpen"
        @close="deleteModalOpen = false"
        @confirm="deletePlayers()"
        :loading="isLoading"/>

  </div>
</template>

<script>

// Vue
import { ref } from 'vue';

// Http
import { http } from '../../services/http.js';

// Components
import Modal from '../../components/modal/index.vue';

export default {
    name: 'Players',

    components: {
        Modal,
    },

    setup() {

        const isLoading = ref(false);

        const players = ref([]);

        const selectedPlayers = ref([]);

        const selectAllChecked = ref(false);

        const deleteModalOpen = ref(false);

        const fetchPlayers = async () => {
            const response = await http.get('player');

            if (response.status === 200) {
                players.value.push(...response.data.data);
            }
        };

        fetchPlayers();

        const selectAll = () => {

            if (selectAllChecked.value) {
                selectedPlayers.value = [];

                for (const player of players.value) {
                    selectedPlayers.value.push(player.id);
                }
            } else {
                selectedPlayers.value = [];
            }
        };

        const deletePlayers = () => {
            const deletedPlayers = [];

            isLoading.value = true;

            for (const playerId of selectedPlayers.value) {
                deletedPlayers.push(http.delete(`player/${playerId}`));
            }

            Promise.all(deletedPlayers)
                .finally(() => {

                    for (const playerId of selectedPlayers.value) {
                        const index = players.value.findIndex(item => item.id === playerId);
                        
                        players.value.splice(index, 1);
                    }

                    isLoading.value = false;
                    deleteModalOpen.value = false;
                })
                .catch((err) => {
                    console.error(err);
                    isLoading.value = false;
                    deleteModalOpen.value = false;
                });
        };

        return {
            players,
            selectedPlayers,
            selectAllChecked,
            deleteModalOpen,
            isLoading,

            selectAll,
            deletePlayers,
        };
    },
}
</script>
