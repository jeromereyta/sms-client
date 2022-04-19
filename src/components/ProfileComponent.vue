<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Vertical</h5>
        <div class="field">
          <label for="name1">Name</label>
          <InputText id="name1" type="text" />
        </div>
        <div class="field">
          <label for="email1">Email</label>
          <InputText id="email1" type="text" />
        </div>
        <div class="field">
          <label for="age1">Age</label>
          <InputText id="age1" type="text" />
        </div>
      </div>

      <div class="card p-fluid">
        <h5>Russel Barbie</h5>
        <div class="formgrid grid">
          <div class="field col">
            <label for="name2">Name</label>
            <InputText id="name2" type="text" />
          </div>
          <div class="field col">
            <label for="email2">Email</label>
            <InputText id="email2" type="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Horizontal</h5>
        <div class="flex justify-content-center">
          <Image src="images/galleria/galleria11.jpg" alt="Image" width="250" preview />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import UserService from "../service/UserService";

export default {
  name: "ProfileComponent",
  setup() {
    const user = ref('');

    onMounted(async () => {
      // const {data} = await axios.get("http://localhost/api/v1/users/me")
      //
      // user.value = data;
    });

    return {
      user
    }
  },
  created() {
    this.userService = new UserService();
  },
  mounted() {
    this.userService.getCurrentUserDetails().then(response => {
      response.data
    })
  },
  data() {
    return {
    }
  }
}
</script>
