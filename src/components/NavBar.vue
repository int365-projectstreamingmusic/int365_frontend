<template>
  <div class=" w-screen text-gray-700 bg-gray-100 py-1 opacity-75 fixed z-10 hover:bg-slate-200 hover:opacity-100">
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center h-12 pr-5 pl-5">
        <div class="w-2/12 pr-2">
        </div>
        <div class="w-9/12 flex flex-row items-start ">
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="icon-navbar-outside hover:bg-white"
            >
              <i class="material-icons text-xl">home</i>
            </button>
          </div>
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="icon-navbar-outside hover:bg-white"
            >
              <i class="material-icons text-xl">chevron_left</i>
            </button>
          </div>
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="icon-navbar-outside hover:bg-white"
            >
              <i class="material-icons text-xl">chevron_right</i>
            </button>
          </div>
          <div
            class="flex flex-col sm:flex-row m-2 w-full"
          >
            <input
              type="text"
              style="width: 368px"
              class="bg-white border-white rounded-full px-5 py-1 font-medium"
              placeholder="Search music name, album, artist ... "
              v-model="searchName"
            />
          </div>
        </div>
        <div class=" w-1/12 flex  flex-col sm:flex-row m-2">
        <p class="item-center h-10">loading...</p>
          <button
            class="icon-navbar-outside hover:bg-white"
          >
            <i class="material-icons text-xl">person</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
