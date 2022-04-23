<template>
  <div class="flex flex-col h-full bg-yellow-300 text-black fixed w-1/6">
    <div class="flex justify-center mt-2 mb-2">
      <div class="w-5/6">
      <div class="my-2 pr-2 flex justify-center items-center">
          <h1 class="sm:text-2xl lg:text-4xl font-bold">KAKOA</h1>
        </div>
        <hr />
        <div class="flex justify-center items-center mt-2">
          <ul class="flex flex-col justify-center w-5/6">
            <li
              class="mb-2 px-4 py-2 text-black flex flex-row hover:text-black hover:bg-gray-300 hover:font-bold  rounded-lg"
            >
              <span class="">
                <i class="material-icons text-xl">home</i>
              </span>
              <a href="#" class="mt-1">
                <span class="ml-2">Home</span>
              </a>
            </li>
            <li
              class="mb-2 px-4 py-2 text-black flex flex-row hover:text-black hover:bg-gray-300 hover:font-bold  rounded-lg"
            >
              <span>
                <i class="material-icons text-xl">playlist_play</i>
              </span>
              <a href="#" class="mt-1">
                <span class="ml-2">Playlist</span>
              </a>
            </li>
            <li
              class="mb-2 px-4 py-2 text-black flex flex-row hover:text-black hover:bg-gray-300 hover:font-bold  rounded-lg"
            >
              <span>
                <i class="material-icons text-xl">favorite</i>
              </span>
              <a href="#" class="mt-1">
                <span class="ml-2">Favorite</span>
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div class="mt-3 ml-3 flex flex-col">
          <div class="flex justify-start">
            <p>Now Playing</p>
          </div>
          <div>
            <div
              class="flex justify-center items-center mt-3 rounded-full relative"
            >
              <img
                src="../assets/ImgTmp1.png"
                class="rounded-full animate-spin"
                width="150px"
              />
              <p class="w-8 h-8 bg-white rounded-full absolute"></p>
            </div>
            <p class="text-sm font-bold mt-3">
              TVアニメ「その着せ替え人形は恋をする」
            </p>
            <p class="text-xs mt-5">My Dress-Up Darling</p>
          </div>
        </div>
        Music Player
        <div></div>

        <div class="mt-3 ml-3 flex flex-col">
          <div class="flex justify-start">
            <p>Next play</p>
          </div>
          <div class="flex flex-col justify-start">
            <p
              class="flex justify-start text-xs mt-2 p-1 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
            >
              1.ロクデナシ  / Rokudenashi
            </p>
            <p
              class="flex justify-start text-xs mt-2 p-1 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
            >
              2.BLACKPINK - '불장난 
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
