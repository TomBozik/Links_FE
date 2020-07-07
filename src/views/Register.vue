<template>
  <div class="max-w-md mx-auto pt-12">

    <div class="flex flex-wrap mb-6">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input v-model="form.name" type="text" class="form-input w-full shadow-md" name="name" autocomplete="name" autofocus />
      <span v-if="errors.name"> {{errors.name[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input v-model="form.email" type="email" class="form-input w-full shadow-md" name="email" autocomplete="email"/>
      <span v-if="errors.email"> {{errors.email[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input v-model="form.password" type="password" class="form-input w-full shadow-md" name="password"/>
      <span v-if="errors.password"> {{errors.password[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="password_confimation" class="block text-gray-700 text-sm font-bold mb-2">Confirm password</label>
      <input v-model="form.password_confirmation" type="password" class="form-input w-full shadow-md" name="password_confirmation" />
      <span v-if="errors.password_confirmation"> {{errors.password_confirmation[0]}}</span>
    </div>

    <div class="flex flex-wrap">
      <button type="submit" @click.prevent="handleRegister" class="inline-block align-middle text-center select-none border font-bold whitespace-no-wrap py-2 px-4 rounded text-base leading-normal no-underline text-gray-100 bg-blue-500 hover:bg-blue-700">Register</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "Register",

  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: []
    }
  },

  methods: {
    handleRegister(){
      this.$store.dispatch('user/register', this.form)
        .then(() => {
          this.$router.push('/login');
        },
        error => {
          if(error.response.status === 422){
              this.errors = error.response.data.errors;
          }
        }
      );
    }
  }
}
</script>

<style>
</style>