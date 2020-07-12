<template>
  <div class="flex items-center justify-center min-h-screen mx-auto">

    <!-- card -->
    <div class="flex max-w-6xl overflow-hidden bg-white rounded-lg shadow-2xl">

      <!-- text -->
      <div class="flex flex-col w-full px-2 pt-8 pb-4 md:px-12">
        <div class="pb-6 text-2xl font-bold text-center">Join us.</div>
        <!-- form -->
          <div class="flex flex-col w-full pb-6">
            <label for="name" class="block mb-2 text-sm font-bold text-gray-700">Name</label>
            <input v-model="form.name" type="text" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="text" />
            <div v-if="errors.name" class="text-red-600"> {{errors.name[0]}}</div>
          </div>

          <div class="flex flex-col w-full pb-6">
            <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="email" autocomplete="email" />
            <div v-if="errors.email" class="text-red-600"> {{errors.email[0]}}</div>
          </div>
        
          <div class="flex flex-col w-full pb-6">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input v-model="form.password" type="password" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password" />
            <div v-if="errors.password" class="text-red-600"> {{errors.password[0]}}</div>
          </div>

          <div class="flex flex-col w-full pb-6">
            <label for="password_confirmation" class="block mb-2 text-sm font-bold text-gray-700">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password_confirmation" />
            <div v-if="errors.password_confirmation" class="text-red-600"> {{errors.password_confirmation[0]}}</div>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" @click.prevent="handleRegister" class="w-full mt-4 btn btn-black">Login</button>
          </div>
        <!-- form end -->

        <div class="pt-8 text-center">
          <router-link to="/login" class="cursor-pointer">Login</router-link>
        </div>

        <!-- <div class="pt-4 text-center">or</div>
        <button class="w-full mt-4 btn btn-black">Login with Facebook</button> -->

      </div>
      <!-- text end -->


    </div>
    <!-- card end -->

  </div>

  <!-- <div class="max-w-md pt-12 mx-auto">

    <div class="flex flex-wrap mb-6">
      <label for="name" class="block mb-2 text-sm font-bold text-gray-700">Name</label>
      <input v-model="form.name" type="text" class="w-full shadow-md form-input" name="name" autocomplete="name" autofocus />
      <span v-if="errors.name"> {{errors.name[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
      <input v-model="form.email" type="email" class="w-full shadow-md form-input" name="email" autocomplete="email"/>
      <span v-if="errors.email"> {{errors.email[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
      <input v-model="form.password" type="password" class="w-full shadow-md form-input" name="password"/>
      <span v-if="errors.password"> {{errors.password[0]}}</span>
    </div>

    <div class="flex flex-wrap mb-6">
      <label for="password_confimation" class="block mb-2 text-sm font-bold text-gray-700">Confirm password</label>
      <input v-model="form.password_confirmation" type="password" class="w-full shadow-md form-input" name="password_confirmation" />
      <span v-if="errors.password_confirmation"> {{errors.password_confirmation[0]}}</span>
    </div>

    <div class="flex flex-wrap">
      <button type="submit" @click.prevent="handleRegister" class="inline-block px-4 py-2 text-base font-bold leading-normal text-center text-gray-100 no-underline whitespace-no-wrap align-middle bg-blue-500 border rounded select-none hover:bg-blue-700">Register</button>
    </div>

  </div> -->
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