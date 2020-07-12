<template>
  <div class="flex items-center justify-center w-full max-w-2xl min-h-screen px-2 mx-auto overflow-y-auto sm:w-1/2 ">

    <!-- card -->
    <div class="flex w-full bg-white rounded-lg shadow-md">

      <!-- text -->
      <div class="flex flex-col w-full px-2 pt-4 pb-4 md:px-12">
        <div class="pb-4 text-2xl font-bold text-center">Welcome.</div>
        <!-- form -->
          <div class="flex flex-col w-full pb-4">
            <label for="email" class="block mb-1 text-sm font-bold text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="email" autocomplete="email" />
            <div v-if="errors.email" class="text-red-600"> {{errors.email[0]}}</div>
          </div>
        
          <div class="flex flex-col w-full pb-4">
            <label for="password" class="block mb-1 text-sm font-bold text-gray-700">Password</label>
            <input v-model="form.password" type="password" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password" />
            <div v-if="errors.password" class="text-red-600"> {{errors.password[0]}}</div>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" @click="handleLogin" class="w-full mt-4 btn btn-black">Login</button>
          </div>
        <!-- form end -->

        <div class="pt-4 text-center">
          <router-link to="/register" class="cursor-pointer"> Create Account</router-link>
        </div>

        <!-- <div class="pt-4 text-center">or</div>
        <button class="w-full mt-4 btn btn-black">Login with Facebook</button> -->

      </div>
      <!-- text end -->


    </div>
    <!-- card end -->

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      form:{
        email: '',
        password: '',
        device_name: 'browser',
      },
      errors: []
    }
  },
  methods: {
    handleLogin(){
      this.$store.dispatch('user/login', this.form)
        .then(() => {
          this.$router.push('/dashboard');
        },
        error => {
          if(error.response.status === 422){
            this.errors = error.response.data.errors;
          }
        }
      );
    } 
  },
}
</script>

<style>
</style>