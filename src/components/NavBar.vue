<template>
<!-- bg-gray-100  -->
  <div class="ml-75 text-gray-700 sticky top-0 z-50">
    <div class="flex justify-center">
      <div class="w-1200 flex flex-row justify-between">
        <div class="flex flex-row space-x-3">
          <div>
            <router-link to="/">
              <button>
                <div class=" icon-navbar-outside">
                  <span class="material-icons text-xl">home</span>
                </div>
              </button>
            </router-link>
          </div>
          <div>
            <button >
              <div class="icon-navbar-outside">
                <span class="material-icons text-2xl">chevron_left</span>
              </div>
            </button>
          </div> 
          <div>
            <button class="icon-navbar-outside">
              <div class="icon-navbar-outside">
                <span class="material-icons text-2xl">chevron_right</span>
              </div>
            </button>
          </div>
          <div class="cursor-pointer">
            <input type="text" class="bg-neutral-100 rounded-full h-8 font-sansation-light text-sm w-504 pl-6"
              placeholder="Search music name, album, artist ... "
              v-model="searchName"
            />
          </div> 
          <div>
            <button >
              <div class=" flex items-center bg-neutral-100 text-lg justify-center hover:font-sansation-regular hover:text-violetlight hover:bg-blackcoal transition duration-300 rounded-full w-36 h-8 ">
                <p class="font-sansation-light">Streaming</p>
              </div>
            </button>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-2 font-sansation-light text-base">
          <p class="cursor-pointer">Log in </p>
          <p>| </p>
          <p class="cursor-pointer"> Register</p>
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center h-12 pr-5 pl-5">
        <div class="w-2/12 pr-2"></div>
        <div class="w-9/12 flex flex-row items-start">
          <div class="flex flex-col sm:flex-row m-2">
            <router-link to="/hometest">
              <button class="icon-navbar-outside hover:bg-white">
                <i class="material-icons text-xl">home</i>
              </button>
            </router-link>
          </div>
          <div class="flex flex-col sm:flex-row m-2">
            <button class="icon-navbar-outside hover:bg-white">
              <i class="material-icons text-xl">chevron_left</i>
            </button>
          </div>
          <div class="flex flex-col sm:flex-row m-2">
            <button class="icon-navbar-outside hover:bg-white">
              <i class="material-icons text-xl">chevron_right</i>
            </button>
          </div>
          <div class="flex flex-col sm:flex-row m-2 w-full">
            <input type="text" style="width: 368px" class="bg-white border-white rounded-full px-5 py-1 font-medium"
              placeholder="Search music name, album, artist ... "
              v-model="searchName"
            />
          </div>
        </div>
        <div class="w-1/12 flex flex-col sm:flex-row m-2">
          <p class="item-center h-10">loading...</p>
          <button class="icon-navbar-outside hover:bg-white">
            <i class="material-icons text-xl">person</i>
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
</script>
