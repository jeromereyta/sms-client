<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openResponsive" />
              <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
            </div>
          </template>

          <template v-slot:end>
<!--            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />-->
<!--            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />-->
          </template>
        </Toolbar>

        <DataTable :value="users" :paginator="true" class="p-datatable-gridlines" :rows="10" v-model:selection="selectedUsers" dataKey="id" :rowHover="true"
                   v-model:filters="filters1" filterDisplay="menu" :filters="filters1" responsiveLayout="scroll"
                   :globalFilterFields="['email','status','full_name','roles','id']" >

          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <h5 class="m-0">Manage Users</h5>
              <!--              <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()"/>-->
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%"/>
              </span>
            </div>
          </template>
          <template #empty>
            No customers found.
          </template>
          <template #loading>
            Loading customers data. Please wait.
          </template>
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column sortable="true" field="id" header="ID" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span class="p-column-title">ID</span>
              {{slotProps.data.id}}
            </template>
          </Column>
          <Column sortable="true" field="full_name" header="Name" :style="{width:'210px'}"></Column>
          <Column sortable="true" field="email" header="Email" :style="{width:'210px'}"></Column>
          <Column sortable="true" field="status" header="Status" :style="{width:'150px'}"></Column>
          <Column sortable="true" field="roles" header="Roles" :style="{width:'150px'}"></Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editUser(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteUser(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
        <ProgressBar v-if="loading1" mode="indeterminate" style="height: .5em" />

        <Dialog header="Create User" v-model:visible="displayResponsive" :breakpoints="{'960px': '85vw'}" :style="{width: '60vw'}">
          <div class="content-section implementation">
            <div class="card">
              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="first_name">First name</label>
                  <InputText id="first_name" type="text" v-model="userForm.first_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="middle_name">Middle name</label>
                  <InputText id="middle_name" type="text" v-model="userForm.middle_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="last_name">Last name</label>
                  <InputText id="last_name" type="text" v-model="userForm.last_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="email">Email</label>
                  <InputText id="email" type="text" v-model="userForm.email"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="password">Password</label>
                  <Password id="password" v-model="userForm.password" toggleMask></Password>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="password">Password Confirmation</label>
                  <Password id="password" v-model="userForm.password_confirmation" toggleMask></Password>
                </div>

                <div class="field col-12 md:col-3">
                  <label for="role">Role</label>
                  <Dropdown id="state" v-model="userForm.role" :options="roles" optionLabel="name" placeholder="Select Role"></Dropdown>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Create" icon="pi pi-check" @click="createUser"/>
          </template>
        </Dialog>

        <Dialog header="Edit User" v-model:visible="editUserModal" :breakpoints="{'960px': '85vw'}" :style="{width: '60vw'}">
          <div class="content-section implementation">
            <div class="card">
              <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-4">
                  <label for="first_name">First name</label>
                  <InputText id="first_name" type="text" v-model="userForm.first_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="middle_name">Middle name</label>
                  <InputText id="middle_name" type="text" v-model="userForm.middle_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="last_name">Last name</label>
                  <InputText id="last_name" type="text" v-model="userForm.last_name"/>
                </div>

                <div class="field col-12 md:col-4">
                  <label for="email">Email</label>
                  <InputText id="email" type="text" v-model="userForm.email"/>
                </div>

                <div class="field col-12 md:col-3">
                  <label for="role">Role</label>
                  <Dropdown id="state" v-model="userForm.role" :options="roles" optionLabel="name" placeholder="Select Role"></Dropdown>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Update" icon="pi pi-check" @click="updateUser"/>
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="user">Are you sure you want to delete the selected users?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsersDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="user">Are you sure you want to delete <b>{{user.full_name}}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUserDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {FilterMatchMode, FilterOperator} from 'primevue/api';
import UserService from "../../service/UserService";
import RoleService from "../../service/RoleService";
import {useToast} from "primevue/usetoast";
export default {
  setup() {
    const toast = useToast();

    const showSuccess = () => {
      toast.add({severity:'success', summary: 'Success Creating User', life: 2000});
    }

    const editSuccess = () => {
      toast.add({severity:'success', summary: 'Successfully Update User', life: 2000});
    }
    const displayResponsive = ref(false);
    const editUserModal = ref(false);

    return { displayResponsive, editUserModal, editSuccess, showSuccess}
  },
  data() {
    return {
      deleteUserDialog: false,
      deleteUsersDialog: false,
      userForm: {
        first_name: '',
        middle_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
        role: null
      },
      display: false,
      users: null,
      user: {},
      roles: null,
      filters1: null,
      expandedRows: [],
      loading1: false,
      selectedUsers: null,
    }
  },
  userService: null,
  roleService: null,
  created() {
    this.userService = new UserService();
    this.roleService = new RoleService();
    this.initFilters1();
  },
  mounted() {
    this.loading1 = true;
    this.userService.getAdminUsers().then(response => {
      this.loading1 = false;
      this.users = response.data.map(user => {
        user.full_name = user.first_name + ' ' + user.middle_name + ' ' + user.last_name
        user.status = user.status.charAt(0).toUpperCase() + user.status.slice(1);

        let roles = '';
        user.roles = user.roles.forEach(role => {
          if (roles === '') {
            roles = role.name;
          } else {
            roles = roles + ', ' + role.name;
          }
          user.role_id = role.id;
        })

        user.roles = roles;

        return user;
      });
    })
    this.roleService.getRoles().then(response => {
      this.loading1 = false;
      this.roles = response.data.map(role => {
        return {
          name: role.name,
          id: role.id,
        };
      });
    })
  },
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    confirmDeleteUser(user) {
      this.user = user;
      this.deleteUserDialog = true;
    },
    confirmDeleteSelected() {
      this.deleteUsersDialog = true;
    },
    closeResponsive() {
      this.displayResponsive = false;
      this.editUserModal = false;
      this.userForm = {};
    },
    createUser () {
      this.userForm.role_id = this.userForm.role.id;

      this.userService.createAdminUser(this.userForm).then(response => {
        let user = response.data;
        let roles = '';

        user.roles.forEach(role => {
          if (roles === '') {
            roles = role.name;
          } else {
            roles = roles + ', ' + role.name;
          }
          user.role_id = role.id
        })

        user.roles = roles;
        user.full_name = user.first_name + ' ' + user.middle_name + ' ' + user.last_name
        user.status = user.status.charAt(0).toUpperCase() + user.status.slice(1);

        this.users.push(user)
        this.showSuccess();
        this.closeResponsive();

        this.userForm = {
          first_name: '',
          middle_name: '',
          last_name: '',
          password: '',
          password_confirmation: '',
          role: null
        };
      });
    },
    updateUser () {
      this.userForm.role_id = this.userForm.role.id;

      this.userService.updateAdminUser(this.userForm).then(response => {
        let user = response.data;
        let roles = '';

        user.roles.forEach(role => {
          if (roles === '') {
            roles = role.name;
          } else {
            roles = roles + ', ' + role.name;
          }
          user.role_id = role.id
        })

        user.roles = roles;
        user.full_name = user.first_name + ' ' + user.middle_name + ' ' + user.last_name
        user.status = user.status.charAt(0).toUpperCase() + user.status.slice(1);

        const userIndex = this.users.findIndex((userRow) => userRow.id === user.id)

        this.users[userIndex] = user;
        this.editSuccess();
        this.closeResponsive();

        this.userForm = {
          first_name: '',
          middle_name: '',
          last_name: '',
          password: '',
          password_confirmation: '',
          role: null
        };
      });
    },
    deleteUser() {
      const options = {
        user_ids: [this.user.id]
      };

      this.userService.deleteAdminUsers(options).then(() => {
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.deleteUserDialog = false;
        this.product = {};
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      })
    },
    deleteSelectedUsers() {
      const options = {
        user_ids: this.selectedUsers.map((user) => {
          return user.id
        })
      };
      this.userService.deleteAdminUsers(options).then(() => {
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.deleteUsersDialog = false;
        this.selectedUsers = null;
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
      })
    },
    editUser(user) {
      this.editUserModal = true;
      this.userForm = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        password: '',
        password_confirmation: '',
        role: this.roles?.find((role) => role.id === user.role_id)
      };
    },
    initFilters1() {
      this.filters1 = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'full_name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'status': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'roles': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      }
    },
    openResponsive() {
      this.displayResponsive = true;
      this.userForm = {};
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
