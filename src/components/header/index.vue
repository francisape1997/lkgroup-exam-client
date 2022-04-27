<template>
  <Popover class="relative bg-white">
    <div class="w-full mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Players</span>
            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </Popover>
</template>

<script>

// Http
import { http } from '../../services/http.js';

// Vue
import { ref } from 'vue';

// Router
import { useRouter } from 'vue-router';

// Components
import Spinner from '../../components/spinner/index.vue';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import {
  MenuIcon,
  XIcon,
} from '@heroicons/vue/outline';

export default {
    name: 'TopNav',

    components: {
        Popover,
        PopoverButton,
        PopoverGroup,
        PopoverPanel,
        MenuIcon,
        XIcon,
        Spinner,
    },

    setup() {

        const router = useRouter();

        const isLoading = ref(false);

        const setLoading = () => {
            isLoading.value = !isLoading.value;
        };

        return {

        };
    },
}
</script>
