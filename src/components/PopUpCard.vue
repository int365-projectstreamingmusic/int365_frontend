<template>
    <div class="fixed z-70 inset-0 overflow-y-auto ">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-neutral-50 bg-opacity-75 transition-opacity"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div
                class="border-2 border-gray-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div class="m-8">
                    <div class="flex justify-center items-center text-xl ">{{ message.header }}</div>
                    <div class="flex justify-center items-center my-6">{{ message.body }}</div>
                </div>
                <div class="flex flex-row space-x-3 justify-center items-center my-5">
                    <button @click="confirmCurrentModal"
                        v-if="this.message.button1 != '' && this.message.button1 != null"
                        class="w-36 h-12 cursor-pointer transition duration-200 rounded-md bg-green-400 text-white flex justify-center item-center font-sansation-bold">
                        {{ message.button1 }}
                    </button>
                    <button @click="closeCurrentModal" v-if="message.button2 != '' || message.button2 != null"
                        class="w-36 h-12 cursor-pointer transition duration-200 rounded-md bg-red-400 text-white flex justify-center item-center font-sansation-bold">
                        {{ message.button2 }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["close", "confirm"],
    props: ["message"],
    data() {
        return {
        };
    },
    methods: {
        closeCurrentModal() {
            this.$emit("close", true);
        },
        confirmCurrentModal() {
            this.$emit("confirm", true);
        },
    },
};
</script>
