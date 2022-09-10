<template>
  <div class="ml-75 h-screen" >
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <!-- Account Profile chagne password -->
          <div class="w-1200 mt-3">
            <div class="font-sansation-light text-2xl">Account</div>
            <div class="flex flex-row items-start">
              <div class="rounded-lg overflow-hidden" style="width:262px;">
                <img src="../assets/yourname.png" style="width:262px ; height: 175px; object-fit: cover;"/>  
              </div>
              <div class="font-sansation-light text-sm mx-10">
                <div class="">
                  <p class="  text-xs text-gray-500 font-bold tracking-wide ">profile</p>
                </div>
                <div class="mx-4 space-y-2 my-3">
                  <div class="flex flex-row space-x-3">
                    <p class=" w-20">Alias</p>
                    <p class=" w-81  pl-3">LiOzAsDus</p>
                  </div>
                  <div class="flex flex-row space-x-3">
                    <p class=" w-20">Email</p>
                    <p class=" w-81 pl-3">poonpipat.exp@mail.kmutt.ac.th</p>
                  </div>
                  <div class="flex flex-row space-x-3">
                    <p class=" w-20">Description</p>
                    <p class="w-81  px-3 text-left break-all">LiOzAsDusdadadadadadadahadadadadaadadkhkhkhkhkhkhkhhkkhkhkhkhkhkhhh  </p>
                  </div>
                </div>
                <div class="flex flex-row space-x-5">
                  <div class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-black text-white text-center">edit profile</div>
                  <div class="cursor-pointer text-sm w-36 h-6 flex items-center justify-center rounded-lg bg-black text-white text-center">chagne password</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Account Profile chagne password -->
          <!-- My song -->
          <div class="flex flex-row items-end w-1200 font-sansation-light justify-between">
            <div class="flex flex-row items-end">
              <div class="text-xl">My Song</div>
              <div class="text-sm font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">upload song</div>
            </div>
            <div class="text-sm">filter</div>
          </div>
          <div class="font-sansation-light px-10 py-7 bg-gray-50 rounded-lg">
              <table class="w-1120 text-center  ">
                <thead class="border-b-2 border-violetdark text-sm ">
                  <tr class="w-1120">
                    <th class="w-6 pb-1"></th>
                    <th class="w-10 pb-1">#</th>
                    <th class="text-left pl-3 pb-1 w-669">name</th>
                    <th class="w-54 pb-1 py-3">album</th>
                    <th class="w-32 pb-1">release</th>
                  </tr>
                </thead>
                <tbody class="text-sm ">
                  <tr class="w-1120 ">
                    <th v-show="!delPlayl" class="w-6 pb-1  " ></th>
                    <th v-show="delPlayl" class="w-6 pb-1 pt-2 h-9 cursor-pointer">
                      <!-- <span class="material-icons text-sm text-blackcoal">radio_button_unchecked</span> -->
                      <span class="material-icons  text-violetdark  ">check_circle</span>
                    </th>
                    <td class="w-10 py-3">1</td>
                    <td class="w-669 text-left pl-2 py-3 truncate ">$100asdasdsadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</td>
                    <td class="w-54 px-5 py-3 truncate">Januarydsfsfsdfsdfsfsfdsasdasdasdadadaasdsadas</td>
                    <td class="w-32 py-3 ">14-08-2000</td>
                  </tr>

                </tbody>
              </table>
          </div>
          <!-- My song -->
                    <!-- History -->
          <div class="flex flex-row items-end w-1200 font-sansation-light">
            <div class="flex flex-row items-end">
              <div class="text-xl">History</div>
              <div class="text-sm font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">clear history</div>
            </div>
          </div>
          <div class="font-sansation-light px-10 py-7 bg-gray-50 rounded-lg">
              <table class="w-1120 text-center  ">
                <thead class="border-b-2 border-violetdark text-sm ">
                  <tr class="w-1120">
                    <th class="w-6 pb-1"></th>
                    <th class="w-10 pb-1">#</th>
                    <th class="text-left pl-3 pb-1 w-669">name</th>
                    <th class="w-54 pb-1 py-3">album</th>
                    <th class="w-32 pb-1">release</th>
                  </tr>
                </thead>
                <tbody class="text-sm ">
                  <tr class="w-1120 ">
                    <th v-show="!delPlayl" class="w-6 pb-1  " ></th>
                    <th v-show="delPlayl" class="w-6 pb-1 pt-2 h-9 cursor-pointer">
                      <!-- <span class="material-icons text-sm text-blackcoal">radio_button_unchecked</span> -->
                      <span class="material-icons  text-violetdark  ">check_circle</span>
                    </th>
                    <td class="w-10 py-3">1</td>
                    <td class="w-669 text-left pl-2 py-3 truncate ">$100asdasdsadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</td>
                    <td class="w-54 px-5 py-3 truncate">Januarydsfsfsdfsdfsfsfdsasdasdasdadadaasdsadas</td>
                    <td class="w-32 py-3 ">14-08-2000</td>
                  </tr>

                </tbody>
              </table>
          </div>
          <!-- History -->
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
export default {

}
</script>
<style>
    
</style>   