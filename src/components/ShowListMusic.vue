<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-start items-center m-10">
      <p class="text-2xl font-bold">NEW ARRIVAL</p>
    </div>
    <div>
      <div class="w-10/12 mx-16 flex justify-center items-center flex-col">
        <div class="bg-yellow-300 rounded-xl m-1 shadow-lg" style="width: 100%">
          <div class="flex flex-row p-1">
            <div class="w-1/12">#</div>
            <div class="w-6/12">Name</div>
            <div class="w-3/12">Artist</div>
            <div class="w-2/12">Favorite</div>
          </div>
        </div>
        <div class="rounded-xl m-1 bg-white shadow-lg" style="width: 100%">
          <div class="flex flex-row p-1">
            <div class="w-1/12">1</div>
            <div class="w-6/12">
              好きだから。（feat.れん）/ 『ユイカ』【MV】
            </div>
            <div class="w-3/12">『ユイカ』</div>
            <div class="w-2/12 mt-1">
              <div
                class="flex flex-col sm:flex-row w-full items-center justify-center"
              >
                <button
                  class="flex items-center justify-center text-sm font-medium rounded-full"
                >
                  <i
                    class="material-icons text-black hover:text-yellow-300"
                    style="font-size: 20px"
                    >favorite_border</i
                  >
                </button>
              </div>
            </div>
          </div>
          </div>
           <div class="rounded-xl m-1 bg-white shadow-lg" style="width: 100%">
          <div class="flex flex-row p-1">
            <div class="w-1/12">2</div>
            <div class="w-6/12">
             See You Again ft. Charlie Puth [Official Video]
            </div>
            <div class="w-3/12">Wiz Khalifa</div>
            <div class="w-2/12 mt-1">
              <div
                class="flex flex-col sm:flex-row w-full items-center justify-center"
              >
                <button
                  class="flex items-center justify-center text-sm font-medium rounded-full"
                >
                  <i
                    class="material-icons text-yellow-300 hover:text-black"
                    style="font-size: 20px"
                    >favorite</i
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayedPosts: [
        { first: "John", last: "Doe" },
        { first: "John", last: "Doe" },
        { first: "John", last: "Doe" },
        { first: "John", last: "Doe" },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style></style>
