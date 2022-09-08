<template>
  <div class="ml-75 h-screen">
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <div class="w-1200 mt-3 space-y-5">
            <!-- head -->
            <div class="flex flex-row justify-between">
              <div class="flex flex-row space-x-3 font-sansation-light text-blackcoal items-end">
                <div class="cursor-pointer">All Reports</div>
                <div >|</div>
                <div class="font-sansation-bold text-2xl text-violetdark cursor-pointer">Comment</div>
                <div >|</div>
                <div class="cursor-pointer">License</div>
              </div>
              <div class="flex flex-row items-center font-sansation-light space-x-4">
                <!-- <div class="flex flex-row items-center cursor-pointer">
                  <div>Date</div>
                  <span class="material-icons text-xl">import_export</span>
                </div>
                <div class="flex flex-row items-center cursor-pointer text-violetdark ">
                  <div>Counted: min > max</div>
                  <span class="material-icons text-xl">import_export</span>
                </div>   -->
                <!-- รอเปลี่ยนเป็น v-for -->
                <select class="rounded-lg bg-neutral-100 w-48 h-6 text-center" >
                  <option value="" disabled selected class="hidden ">- Select your filter -</option>
                  <option >Counted: min > max</option>
                  <option >Counted: max > min</option>
                  <option >Latest</option>
                </select>                
              </div>
            </div>
            <!-- head -->
            <!-- body -->
            <div class="bg-neutral-100 rounded-lg font-sansation-light py-5 px-10 space-y-4">
              <div>
                <div class="flex flex-row justify-between">
                  <div>Owner : Bossza</div>
                  <div>Created : 14/08/2565</div>
                </div>
                <div>
                  Comment  :  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tincidunt cursus neque nascetur sit velit etiam rutrum. Amet, purus donec lectus semper molestie amet vitae scelerisque sit. Facilisi facilisis nisl lacus eu pharetra ultrices ipsum ipsum orci.
                </div>
                <div>Reported Count  : 133</div>
              </div>
              <div class="flex flex-row space-x-5 font-sansation-regular">
                <div class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-deletered text-white text-center">delete</div>
                <div class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-passgreen text-white text-center">pass</div>
              </div>
            </div>
            <!-- body -->
          </div>
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