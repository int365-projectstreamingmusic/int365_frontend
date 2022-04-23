<template>
  <div class=" w-screen text-gray-700 bg-gray-100 py-2 opacity-75 fixed z-10 hover:bg-slate-400 hover:opacity-100">
    <div class="flex flex-col flex-grow">
      <div class="flex justify-between items-center h-12 pr-5 pl-5">
        <div class="w-2/12 pr-2">
        </div>
        <div class="w-9/12 flex flex-row items-start ">
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="flex items-center justify-center h-8 w-8 px-4 ml-auto text-sm font-medium bg-white rounded-full hover:bg-white"
            >
              <i class="material-icons text-xl">home</i>
            </button>
          </div>
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="flex items-center justify-center h-8 w-8 px-4 ml-auto text-sm font-medium bg-white rounded-full hover:bg-white"
            >
              <i class="material-icons text-xl">chevron_left</i>
            </button>
          </div>
          <div
            class="flex  flex-col sm:flex-row m-2"
          >
            <button
              class="flex items-center justify-center h-8 w-8 px-4 ml-auto text-sm font-medium bg-white rounded-full hover:bg-white"
            >
              <i class="material-icons text-xl">chevron_right</i>
            </button>
          </div>
          <div
            class="flex  flex-col sm:flex-row m-2 w-full"
          >
            <input
              type="text"
              style="width: 368px"
              class="bg-white border-white rounded-full px-8 py-2 font-medium"
              placeholder="Search Case name "
              v-model="searchName"
            />
          </div>
        </div>
        <div class=" w-1/12 flex  flex-col sm:flex-row m-2">
        <p class="flex items-center justify-center h-10">loading...</p>
          <button
            class="flex items-center justify-center h-8 w-8 px-4 ml-auto text-sm font-medium bg-white rounded-full hover:bg-white"
          >
            <i class="material-icons text-xl">person</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//   import {
//     mapGetters,
//     mapActions
//   } from 'vuex'

//   export default {

//     props: ["fixedNav", ],
//     data() {
//       return {
//         dropdownOpen: false,
//         enableNaveBar: {
//           enableVisitor: false,
//           enableUser: false,
//           enableStaff: false,
//           enableAdmn: false
//         }
//       };
//     },
//     computed: {
//       ...mapGetters({
//         authenticated: 'authentication/authenticated',
//         user: 'authentication/user',
//         roleName: 'authentication/roleName'
//       })

//     },
//     watch: {
//       enableRoleNaveBar() {
//         if (localStorage.getItem.username == null) {
//           this.enableNaveBar.enableVisitor = true;
//         } else {
//           this.enableNaveBar.enableVisitor = false;
//         }
//       }
//     },
//     methods: {
//       ...mapActions({
//         signOutAction: 'authentication/singOut'
//       }),

//       signOut(){
//         this.signOutAction().then(() => {
//           this.$router.replace({
//             name:'Home'
//           })
//         })
//       }
//     }
//   };
//
</script>
