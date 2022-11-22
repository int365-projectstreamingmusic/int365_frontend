<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">

    <div class="flex flex-col w-full">

      <div class="flex justify-center h-full">
        <div v-if="this.finishPopup"
          class="fixed flex justify-center items-center h-full w-full bg-neutral-50 bg-opacity-75 transition-opacity">
          <div class="flex justify-center">
            <div class="loader animate-prixClipFix"></div>
          </div>
        </div>
        <div>
          <div class="2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 space-y-5">
            <!-- head -->
            <div class="flex sm:flex-row flex-col justify-between space-y-3">
              <div class="flex flex-row space-x-3 font-sansation-light text-blackcoal items-end">
                <!-- <div class="cursor-pointer">All Reports</div>
                <div >|</div> -->
                <div @click="getReportComment()"
                  :class="reportComment ? 'font-sansation-bold md:text-2xl text-lg text-violetdark' : 'md:text-base text-sm'"
                  class=" cursor-pointer">Report Comment</div>
                <div>|</div>
                <div @click="getReportLicense()"
                  :class="reportLicense ? 'font-sansation-bold md:text-2xl text-lg text-violetdark' : 'md:text-base text-sm'"
                  class="cursor-pointer">Report License</div>
              </div>
            </div>
            <!-- head -->
            <!-- body -->


            <div v-if="reportComment">
              <loading v-if="reportCommentList == '' && !notfoundComment"></loading>
              <div v-for="(info, index) in reportCommentList" :key="index"
                class="bg-neutral-50  rounded-lg font-sansation-light my-3 py-5 sm:px-10 px-5 space-y-4 md:text-base text-sm">
                <div>
                  <div class="flex flex-row justify-between">
                    <div v-if="info.commentPlaylist != null">Owner : {{ info.commentPlaylist.user.username }}</div>
                    <div v-if="info.commentTrack != null">Owner : {{ info.commentTrack.user.username }}</div>
                    <div>Created : {{ info.recentDate.substr(0, 10) }}</div>
                  </div>
                  <div v-if="info.commentPlaylist != null">Comment : {{ info.commentPlaylist.comment }}</div>
                  <div v-if="info.commentTrack != null">Comment : {{ info.commentTrack.comment }}</div>
                  <div>Reported Count : {{ info.numberOfReport }}</div>
                </div>
                <div class="flex flex-row justify-end  md:space-x-5 space-x-2 font-sansation-regular ">
                  <div @click="showPopupConfirm('delete')"
                    class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-deletered text-white text-center">
                    delete</div>
                  <div @click="showPopupConfirm('pass')"
                    class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-passgreen text-white text-center">
                    pass</div>
                </div>
                <popupCard v-if="showClicked" :message="this.message" @close="closeClicked()"
                  @confirm="routerClicked(info)"></popupCard>
              </div>
              <div v-if="notfoundComment" class="flex justify-center items-center font-sansation-light my-3 text-base">
                Now this feature with a problem. The team is working to fix it.
              </div>
              <paginate :totalItems="totalComment" :sizePage="totalPageComment" :itemsPerPage="5" :maxPagesShow="4"
                @pageNum="resPageNumComment"></paginate>
            </div>
            <div v-if="reportLicense">
              <loading v-if="reportTrackList == '' && !notfoundTrack"></loading>
              <div v-for="(info, index) in reportTrackList" :key="index"
                class="bg-neutral-50  rounded-lg font-sansation-light my-3 py-5 sm:px-10 px-5 space-y-4 md:text-base text-sm">
                <div class="flex md:flex-row flex-col md:space-x-5 space-x-0 md:space-y-0 space-y-5">
                  <div class="space-y-5 flex flex-col ">
                    <img :src="url + 'api/streaming/image/' + info.track.trackThumbnail"
                      style="width: 262px; height: 175px; object-fit: cover" />
                    <div @click="acceptData(info.track)"
                      class="cursor-pointer text-sm w-32 h-6 flex items-center justify-center rounded-lg bg-violetdark text-white text-center">
                      play music</div>
                  </div>
                  <div class="w-full">
                    <div class="flex md:flex-row flex-col justify-between">
                      <div>Name Music : {{ info.track.trackName }}</div>
                      <div>Created : {{ info.recentDate.substr(0, 10) }}</div>
                    </div>
                    <div>Owner Music : {{ info.track.owner.username }}</div>
                    <div v-for="(report, index) in info.reports" :key="index" >
                      Copyright Infringement Details : {{ report.reportText }}
                    </div>
                    <div>Reported Count : {{ info.numberOfReport }}</div>
                  </div>
                </div>
                <div class="flex flex-row justify-end md:space-x-5 space-x-2  font-sansation-regular ">
                  <div @click="showPopupConfirm('delete')"
                    class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-deletered text-white text-center">
                    delete</div>
                  <div @click="showPopupConfirm('pass')"
                    class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-passgreen text-white text-center">
                    pass</div>
                </div>
                <div v-if="notfoundTrack" class="flex justify-center items-center font-sansation-light my-3 text-base">
                  Now this feature with a problem. The team is working to fix it.
                </div>
                <popupCard v-if="showClicked" :message="this.message" @close="closeClicked()"
                  @confirm="routerClicked(info)">
                </popupCard>
              </div>
              <paginate :totalItems="totalTrack" :sizePage="totalPageTrack" :itemsPerPage="5" :maxPagesShow="5"
                @pageNum="resPageNumTrack"></paginate>
            </div>
            <!-- body -->
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Managereport } from "../store/managereport.js";
import Paginate from "../components/Paginate.vue";
import Loading from "../components/Loading.vue"
import PopupCard from '../components/PopUpCard.vue';
import axios from "axios";

export default {
  components: {
    Paginate,
    Loading,
    PopupCard,
    Managereport
  },
  emits: ['music'],
  data() {
    return {
      pic: require('../assets/948523.png'),
      showClicked: false,
      message: {
        header: '',
        body: '',
        status: '',
        button1: '',
        button2: '',
      },
      finishPopup: false,
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
    }
  },
  methods: {
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      getReportComment: 'managereport/getReportComment',
      getReportLicense: 'managereport/getReportLicense',
    }),
    resPageNumComment(e) {
      this.$store.dispatch('managereport/getReportComment', e - 1)
    },
    resPageNumTrack(e) {
      this.$store.dispatch('managereport/getReportLicense', e - 1)
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    closeClicked() {
      this.showClicked = false;
      this.routerClicked();
    },
    async routerClicked(data) {
      if (this.message.status === 'delete') {
        let dataComment = {
          commentId: '',
          commentType: '',
          reason: '',
        };
        let dataTrack = {
          trackId: '',
          reason: '',
        }
        if (data.commentTrack != null || data.commentPlaylist != null) {
          dataComment.commentType = data.type.id;
          if (data.commentTrack != null) {
            dataComment.commentId = data.commentTrack.id;
          } else {
            dataComment.commentId = data.commentPlaylist.id;
          }
          this.showClicked = false;
          this.finishPopup = true;
          await axios
            .delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/manager/comment?commentId=${dataComment.commentId}&commentType=${dataComment.commentType}&reason${dataComment.reason}`,
            )
            .then((response) => {
              this.finishPopup = false
              this.$router.go(this.$router.currentRoute);
            });
        } else {
          dataTrack.trackId = data.track.id;
          this.showClicked = false;
          this.finishPopup = true;
          await axios
            .delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/manager/track?trackId=${dataTrack.trackId}&reason=${dataTrack.reason}`,
            )
            .then((response) => {
              this.finishPopup = false
              this.$router.go(this.$router.currentRoute);
            });
        }
      } else {
        this.showClicked = false;
        this.finishPopup = true;
        await axios
          .put(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/manager/report/solve?id=${data.id}`,
          )
          .then((response) => {
            this.finishPopup = false
            this.$router.go(this.$router.currentRoute);
          });
      }

    },
    showPopupConfirm(condition) {
      if (condition === 'delete') {
        this.showClicked = true;
        this.message.header = "Are sure for delete ?"
        this.message.body = ""
        this.message.button1 = 'Confirm'
        this.message.button2 = 'Cancle'
        this.message.status = condition
      } else {
        this.showClicked = true;
        this.message.header = "Are sure for pass ?"
        this.message.body = ""
        this.message.button1 = 'Confirm'
        this.message.button2 = 'Cancle'
        this.message.status = condition
      }

    },
  },
  computed: {
    ...mapGetters({
      sideBarShow: 'homepage/sideBarShow',
      mobile: 'homepage/mobile',
      logo: 'homepage/logo',
      smView: 'homepage/smView',
      // comment report
      reportComment: 'managereport/reportComment',
      reportCommentList: 'managereport/reportCommentList',
      notfoundComment: 'managereport/notfoundComment',
      totalComment: 'managereport/totalComment',
      totalPageComment: 'managereport/totalPageComment',
      // track repost
      reportLicense: 'managereport/reportLicense',
      reportTrackList: 'managereport/reportTrackList',
      notfoundTrack: 'managereport/notfoundTrack',
      totalTrack: 'managereport/totalTrack',
      totalPageTrack: 'managereport/totalPageTrack',
    }),
    getContent() {
      this.$store.dispatch('managereport/getReportComment');
      this.$store.dispatch('managereport/getReportLicense');
    },
  },
  async created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
}
</script>
<style>

</style>  