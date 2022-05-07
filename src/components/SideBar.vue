<template>
  <div class="flex flex-col h-full bg-gray-200 text-black fixed w-1/6">
    <div class="align-item-center mt-2 mb-2">
      <div class="w-5/6">
        <div class="my-2 pr-2 item-center">
          <h1 class="sm:text-2xl lg:text-4xl font-bold">Test</h1>
        </div>
        <hr class="bg-gray-500 h-0.5" />
        <div class="item-center mt-2">
          <ul class="align-item-center flex-col w-5/6">
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">home</i>
              </span>
              <a href="#" class="mt-1">
                <span class="head-name-botton-bar">Home</span>
              </a>
            </li>
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">playlist_play</i>
              </span>
              <a href="#" class="mt-1">
                <span class="head-name-botton-bar">Playlist</span>
              </a>
            </li>
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">favorite</i>
              </span>
              <a href="#" class="item-center">
                <span class="head-name-botton-bar">Favorite</span>
              </a>
            </li>
          </ul>
        </div>
        <hr class="bg-gray-500 h-0.5" />
        <div class="mt-3 ml-3 flex flex-col">
          <div class="head-title-for-bar">
            <p>Now Playing</p>
          </div>
          <div>
            <div
              class="item-center my-3 rounded-full relative"
            >
              <img
                src="../assets/ImgTmp1.png"
                class="rounded-full animate-spin"
                width="100px"
              />
              <p class="w-5 h-5 bg-white rounded-full absolute"></p>
            </div>
            <div
              class="item-center flex-col mt-6 rounded-full relative"
            >
              <p class="head-name-music-bar">
                「その着せ替え人形は恋をする」その着せ替え人形は恋をする」
              </p>
              <p class="text-xs mt-3">My Dress-Up Darling</p>
            </div>
          </div>
        </div>

        <div class="item-center flex-col my-3">
          <div class="mt-1 relative w-full">
            <div
              ref="progress"
              class="h-1 bg-grey-dark cursor-pointer bg-gray-500 rounded-full"
            >
              <div
                class="flex w-full justify-end h-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full relative"
              ></div>
            </div>
            <div class="flex w-full justify-start h-1 rounded-full relative">
              <span
                id="progressButtonTimer"
                class="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 absolute pin-r pin-b -mt-2.5 rounded-full shadow"
              ></span>
            </div>
            <div class="flex flex-row w-full mt-1">
              <div
                class=" text-ss text-gray-500 w-full font-semibold"
              >
                <!-- <p>{{timer}}</p> -->
                <p>0.00</p>
              </div>
              <div class="text-ss text-right text-gray-500 w-full font-semibold">
                <!-- <p>{{timer}}</p> -->
                <p>4.36</p>
              </div>
          </div>
          </div>

          <div class="flex justify-between items-center w-full my-3">
            <div>
              <i class="material-icons icon-defult-inside">shuffle</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">fast_rewind</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">replay_10</i>
            </div>
            <div
              class="text-white w-10 h-10 item-center bg-gray-500 rounded-full shadow-lg"
            >
              <!-- <i v-if="" class="material-icons icon-defult-inside-play text-2xl"
                >play_arrow</i
              > -->
              <i class="material-icons icon-defult-inside-play text-2xl"
                >pause</i
              >
            </div>
            <div>
              <i class="material-icons icon-defult-inside">forward_10</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">fast_forward</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">all_inclusive</i>
            </div>
          </div>
          
        </div>

        <div class="mt-3 ml-3 flex flex-col">
          <div class="head-title-for-bar">
            <p>Next play</p>
          </div>

          <!-- when call api show with loop -->
          <div class="flex flex-col justify-start overflow-auto h-36 mb-5" >
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              1.ロクデナシ / Rokudenashi
            </p>
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              2.BLACKPINK - '불장난
            </p>
             <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              3.ロクデナシ / Rokudenashi
            </p>
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              4.BLACKPINK - '불장난
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
