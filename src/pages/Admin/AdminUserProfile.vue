<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Profile</h5>
        <div class="flex justify-content-left" style="margin-bottom: 20px;">
          <Image src="images/galleria/galleria11.jpg" alt="Image" width="350" preview />
<!--          <FileUpload name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000"/>-->
        </div>
        <Button icon="pi pi-user-edit" class="mb-2" @click="editUserModal=true"></Button>

        <div class="field">
          <label for="name1">First Name</label>
          <InputText id="name1" type="text" v-model="user.first_name"/>
        </div>
        <div class="field">
          <label for="name1">Middle Name</label>
          <InputText id="name1" type="text" v-model="user.middle_name"/>
        </div>
        <div class="field">
          <label for="name1">Last Name</label>
          <InputText id="name1" type="text" v-model="user.last_name"/>
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
    <Dialog header="Edit User" v-model:visible="editUserModal" :breakpoints="{'960px': '85vw'}" :style="{width: '60vw'}">
      <div class="content-section implementation">
        <div class="card">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-4">
              <label for="first_name">First name</label>
              <InputText id="first_name" type="text" v-model="user.first_name"/>
            </div>

            <div class="field col-12 md:col-4">
              <label for="middle_name">Middle name</label>
              <InputText id="middle_name" type="text" v-model="user.middle_name"/>
            </div>

            <div class="field col-12 md:col-4">
              <label for="last_name">Last name</label>
              <InputText id="last_name" type="text" v-model="user.last_name"/>
            </div>

            <div class="field col-12 md:col-4">
              <label for="email">Email</label>
              <InputText id="email" type="text" v-model="user.email"/>
            </div>

            <div class="field col-12 md:col-3">
              <label for="role">Role</label>
              <Dropdown id="state" v-model="user.role" :options="roles" optionLabel="name" placeholder="Select Role"></Dropdown>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
        <Button label="Update" icon="pi pi-check" @click="updateUser"/>
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "@/service/UserService";

export default {
  name: "AdminUserProfile",
  data() {
    return {
      editUserModal: false,
      user: {},
    }
  },
  created() {
    this.userService = new UserService();
    this.userService.getCurrentUserDetails().then(response => {
      this.user = response.data
      console.log(this.user)
    })
  },
  mounted() {

  },
}
</script>
